import React, { useEffect, useState } from "react";
import { supabase } from '../api/supabaseClient';
import AdminTable from "../admin/AdminTable";
import toast from "react-hot-toast";

export default function Admin() {
    const [posts, setPosts] = useState([]);
    const [postFormData, setPostFormData] = useState({
        title: '',
        imageUrl: '',
        subtitle: '',
        content: '',
        id: ''
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        const { data, error } = await supabase.from("posts").select();
        if (error) toast.error("Error al cargar posts: " + error.message);
        else setPosts(data);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setPostFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = supabase.auth.user();
        const { id, ...postData } = postFormData;

        // Asegurar que el post_owner_id está siendo enviado con los datos del formulario
        postData.post_owner_id = user.id;

        const method = id ? 'update' : 'insert';
        const query = supabase.from('posts')[method](postData).match({ id });

        const response = id ? await query : await query.single(); // Use single() for insert to retrieve only one added item

        if (response.error) {
            toast.error("Error al guardar el post: " + response.error.message);
        } else {
            const message = id ? 'actualizado' : 'creado';
            toast.success(`Post ${message} exitosamente`);
            fetchPosts();
            setPostFormData({ title: '', imageUrl: '', subtitle: '', content: '', id: '' }); // Resetear el formulario
        }
    };

    const handleEdit = (post) => {
        setPostFormData(post);
    };

    const handleDelete = async (id) => {
        const { error } = await supabase.from('posts').delete().match({ id });
        if (error) toast.error("Error al eliminar el post: " + error.message);
        else {
            setPosts(posts.filter(item => item.id !== id));
            toast.success("Post eliminado exitosamente");
        }
    };

    // Inline CSS Styles
    const styles = {
        container: {
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            margin: '20px',
            width: '80%',
            maxWidth: '500px'
        },
        input: {
            marginBottom: '10px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc'
        },
        button: {
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px'
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    style={styles.input}
                    name="title"
                    placeholder="Título"
                    value={postFormData.title}
                    onChange={handleChange}
                    required
                />
                <input
                    style={styles.input}
                    name="imageUrl"
                    placeholder="URL de la imagen"
                    value={postFormData.imageUrl}
                    onChange={handleChange}
                    required
                />
                <input
                    style={styles.input}
                    name="subtitle"
                    placeholder="Subtítulo"
                    value={postFormData.subtitle}
                    onChange={handleChange}
                    required
                />
                <textarea
                    style={{ ...styles.input, height: '100px' }}
                    name="content"
                    placeholder="Contenido"
                    value={postFormData.content}
                    onChange={handleChange}
                    required
                />
                <button style={styles.button} type="submit">Guardar Post</button>
            </form>
            <AdminTable posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
}

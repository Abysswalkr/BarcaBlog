import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { supabase } from '../api/supabaseClient'; 
import Navbar from '../pages/Navbar';



export default function CombinedComponent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      let { data: posts, error } = await supabase.from('posts').select('*');
      if (error) throw error;
      setPosts(posts);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  }

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleCreateNewPost = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localDate = new Date(today.getTime() - (offset * 60 * 1000));
    const dateToUse = localDate.toISOString().slice(0, 10);
    
    setSelectedPost({ title: '', description: '', imageUrl: '', date: dateToUse });
    setIsEditMode(false);
    setIsModalOpen(true);
  };
  
  const handleUpdatePost = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase
        .from('posts')
        .update({ ...selectedPost })
        .match({ id: selectedPost.id });
      if (error) throw error;
      fetchPosts(); // Reload the posts after update
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error('Error updating post:', error.message);
    }
  };

  const handleCreatePost = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({ ...selectedPost });
      if (error) throw error;
      fetchPosts(); // Reload the posts after creation
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error('Error creating post:', error.message);
    }
  };

  const handleDeletePost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .delete()
        .match({ id: selectedPost.id });
      if (error) throw error;
      fetchPosts(); // Reload the posts after delete
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedPost((prev) => ({ ...prev, [name]: value }));
  };




    return (
      <div className="bg-white">
        <Navbar />
         <main>
          <div className="bg-white py-24 sm:py-32">
          <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Posts FC Barcelona</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Noticias de ultima hora. 
            </p>
            <button
  type="button"
  onClick={() => setIsModalOpen(true)} // Reuse the existing modal open state or create a new one if needed
  className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
>
  Add Post
</button>

          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
  <article key={post.id} className="flex flex-col" onClick={() => handleOpenModal(post)}>
      <div className="relative w-full">
        {post.imageUrl ? (
          <img
          src={post.imageUrl || 'https://via.placeholder.com/150'}
          alt={post.title || "No Title"}
          className="w-full rounded-lg"
          />
        ) : (
          <div className="aspect-[16/9] w-full rounded-2xl bg-gray-100 sm:aspect-[2/1] lg:aspect-[3/2] flex items-center justify-center">
            <span>No Image Available</span>
          </div>
        )}
      </div>
      <div className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          {post.date ? (
            <time dateTime={post.date} className="text-gray-500">
              {new Date(post.date).toLocaleDateString()}
            </time>
          ) : (
            <span className="text-gray-500">No Date Provided</span>
          )}
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
            {post.title || "Untitled Post"}
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            {post.description || "No description available."}
          </p>
        </div>
      </div>
    </article>
  ))}
          </div>
          
        </div>
      </div>
          </div>
          <Transition.Root show={isModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <form onSubmit={isEditMode ? handleUpdatePost : handleCreatePost}>
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        {isEditMode ? 'Edit Post' : 'Create New Post'}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {isEditMode ? 'Update the post details below.' : 'Fill in the details for your new post.'}
                        </p>
                      </div>
                      <div className="mt-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                          type="text"
                          name="title"
                          id="title"
                          value={selectedPost?.title}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                          name="description"
                          id="description"
                          rows={3}
                          value={selectedPost?.description}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                          type="text"
                          name="imageUrl"
                          id="image"
                          value={selectedPost?.imageUrl}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="mt-5 sm:mt-6 space-x-3">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          {isEditMode ? 'Save' : 'Add Post'}
                        </button>
                        {isEditMode && (
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            onClick={handleDeletePost}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </main>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { supabase } from '../api/supabaseClient';
import Navbar from '../pages/Navbar';

const News = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      let { data: posts, error } = await supabase.from('posts').select('*');
      if (error) throw error;
      setPosts(posts);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };

  return (
    <div className="bg-white">
      <Navbar />
      <div className="py-24 sm:py-32 mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">FC Barcelona News</h2>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="rounded-lg shadow-lg p-4 bg-white">
              <img
                src={post.imageUrl || 'https://via.placeholder.com/150'}
                alt={post.title || "No Title"}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">{post.title || "Untitled Post"}</h3>
                <p className="text-sm text-gray-600 mt-2">{post.description || "No description available."}</p>
                <time dateTime={post.date} className="text-xs text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </time>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;

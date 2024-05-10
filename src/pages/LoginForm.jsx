import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      email: '',
      password: ''
  });

    async function signInWithPass(event) {
        event.preventDefault();

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
              email: formData.email,
              password: formData.password
          });

            if (error) throw error;

            if (!data) throw new Error('Error signing in');

            supabase.auth.setSession({
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token,
            });
            navigate('/admin');

        } catch (error) {
            toast.error(error?.message ?? 'Error signing in');
        }
    }

    function handleChange(event) {
      setFormData((prevFormData) => {
          return {
              ...prevFormData,
              [event.target.name]: event.target.value
          };
      });
  }

    return (
        <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-xl font-semibold text-center">Sign in to your account</h1>
                <form onSubmit={signInWithPass} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <input type="email" name="email" id="email" required onChange={handleChange} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" name="password" id="password" required onChange={handleChange} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign in
                    </button>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Don't have an account? <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500"> Register </a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;

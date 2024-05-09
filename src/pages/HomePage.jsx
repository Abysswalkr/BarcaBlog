import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { supabase } from '../api/supabaseClient';


const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];

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
    setSelectedPost({ title: '', description: '', imageUrl: '', date: new Date().toISOString().slice(0, 10) });
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
        {/* Aquí comienza el primer componente */}
        <header className="absolute inset-x-0 top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </nav>
          <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        
          {/* Contenido del diálogo para el menú móvil */}
        </header>
        <main>
          <div className="relative isolate">
            <svg
              className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                  width={200}
                  height={200}
                  x="50%"
                  y={-1}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M.5 200V.5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                <path
                  d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                  strokeWidth={0}
                />
              </svg>
              <rect width="100%" height="100%" strokeWidth={0} fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
            </svg>
            <div
              className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
              aria-hidden="true"
            >
              <div
                className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                style={{
                  clipPath:
                    'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
                }}
              />
            </div>
            <div className="overflow-hidden">
              <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
                <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                  <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                      We’re changing the way people connect.
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                      Cupidatat minim id magna ipsum sint dolor qui. Sunt sit in quis cupidatat mollit aute velit. Et
                      labore commodo nulla aliqua proident mollit ullamco exercitation tempor. Sint aliqua anim nulla sunt
                      mollit id pariatur in voluptate cillum.
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                      <a
                        href="#"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Agregar
                      </a>
                      <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Live demo <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                  <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                    <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                          alt=""
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                      </div>
                    </div>
                    <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                          alt=""
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                      </div>
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
                          alt=""
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                      </div>
                    </div>
                    <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80"
                          alt=""
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                      </div>
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                          alt=""
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                        />
                        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white py-24 sm:py-32">
          <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn how to grow your business with our expert advice.
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
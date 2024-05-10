import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { supabase } from '../api/supabaseClient'; 

const navigation = [
  { name: 'Historia', to: '/history' },
  { name: 'Noticias', to: '/news' },
  { name: 'Imágenes', to: '/NewsSlider' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
    supabase.auth.onAuthStateChange((_event, session) => {
      checkUser(session);
    });
  }, []);

  const checkUser = async (session = supabase.auth.session()) => {
    setUser(session?.user || null);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://walpaper.es/wallpaper/2015/05/Football-Logo-Wallpaper-Barcelona.jpg"
              alt="FC Barcelona Logo"
            />
          </Link>
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
            <Link key={item.name} to={item.to} className="text-sm font-semibold leading-6 text-gray-900">
              {item.name}
            </Link>
          ))}
          {user && (
            <Link to="/admin" className="text-sm font-semibold leading-6 text-gray-900">
              Admin
            </Link>
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <button onClick={() => supabase.auth.signOut()} className="text-sm font-semibold leading-6 text-gray-900">
              Log out
            </button>
          ) : (
            <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
              Log in →
            </Link>
          )}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <Dialog.Panel className="fixed inset-0 z-50 w-full bg-white p-6 overflow-y-auto">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="FC Barcelona Logo"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="block py-2 px-3 text-base font-semibold text-gray-900 rounded-lg hover:bg-gray-50"
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/admin" className="block py-2 px-3 text-base font-semibold text-gray-900 rounded-lg hover:bg-gray-50">
                  Admin
                </Link>
                <button onClick={() => supabase.auth.signOut()} className="block py-2 px-3 text-base font-semibold text-gray-900 rounded-lg hover:bg-gray-50">
                  Log out
                </button>
              </>
            ) : (
              <Link to="/login" className="block py-2 px-3 text-base font-semibold text-gray-900 rounded-lg hover:bg-gray-50">
                Log in
              </Link>
            )}
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}


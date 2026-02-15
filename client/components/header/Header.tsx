'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Shirt, LogOut, Settings, User, Plus } from 'lucide-react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const navigation = [
  { name: 'Look analyze', href: '/analyze' },
  { name: 'My Wardrobe', href: '/wardrobe' },
  { name: 'Create Look', href: '/create' },
  { name: 'Pricing', href: '/pricing' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleLogout = () => {
    Cookies.remove('access_token');
    // refresh_token is HttpOnly, so we rely on the server or just redirect
    // For now, let's just redirect and let middleware/api-client handle it
    router.push('/auth');
  };

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full h-16">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-2xl border-b border-white/5" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#A855F7]/40 to-transparent" />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-2xl border-b border-white/5" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#A855F7]/40 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary/20 p-1.5 rounded-xl group-hover:bg-primary/30 transition-colors">
                <Shirt className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground hidden sm:block">Fitly</span>
            </Link>
          </div>

          {/* Navigation Tabs - Desktop */}
          <nav className="hidden md:flex space-x-1 bg-white/5 p-1 rounded-xl border border-white/5">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={classNames(
                    'relative px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-300 group',
                    isActive ? 'text-white' : 'text-stone-400 hover:text-foreground hover:bg-white/5'
                  )}
                >
                  <span className={classNames(
                    'relative z-10 transition-colors duration-300',
                    isActive ? 'text-white' : 'text-stone-400 group-hover:text-stone-200'
                  )}>
                    {item.name}
                  </span>
                  
                  {isActive && (
                    <>
                      <div className="absolute inset-0 bg-white/[0.03] rounded-xl" />
                      <div className="absolute -bottom-[5px] inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#A855F7] to-transparent opacity-80" />
                    </>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
            <Link href="/add-clothes" className="p-2 bg-primary cursor-pointer text-white rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </Link>
            {/* Profile Dropdown */}
            <HeadlessMenu as="div" className="relative">
              <HeadlessMenu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-slate-900 transition-all p-0.5 border border-white/10 hover:border-primary/50">
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs ring-1 ring-white/20">
                  SU
                </div>
              </HeadlessMenu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <HeadlessMenu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-2xl shadow-2xl bg-slate-900/90 backdrop-blur-xl border border-white/10 ring-1 ring-black ring-opacity-5 focus:outline-none py-1 overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-xs text-slate-500 font-medium">Signed in as</p>
                    <p className="text-sm font-semibold text-white truncate">serhii@example.com</p>
                  </div>
                  
                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <Link
                        href="/profile"
                        className={classNames(
                          active ? 'bg-white/5 text-white' : 'text-slate-300',
                          'flex items-center px-4 py-2.5 text-sm transition-colors'
                        )}
                      >
                        <User className="mr-3 h-4 w-4 text-slate-400" />
                        Your Profile
                      </Link>
                    )}
                  </HeadlessMenu.Item>

                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <Link
                        href="/library"
                        className={classNames(
                          active ? 'bg-white/5 text-white' : 'text-slate-300',
                          'flex items-center px-4 py-2.5 text-sm transition-colors'
                        )}
                      >
                        <Shirt className="mr-3 h-4 w-4 text-slate-400" />
                        My Library
                      </Link>
                    )}
                  </HeadlessMenu.Item>
                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <Link
                        href="/settings"
                        className={classNames(
                          active ? 'bg-white/5 text-white' : 'text-slate-300',
                          'flex items-center px-4 py-2.5 text-sm transition-colors'
                        )}
                      >
                        <Settings className="mr-3 h-4 w-4 text-slate-400" />
                        Settings
                      </Link>
                    )}
                  </HeadlessMenu.Item>
                  <div className="border-t border-white/5 my-1" />
                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={classNames(
                          active ? 'bg-rose-500/10 text-rose-400' : 'text-slate-300',
                          'flex w-full items-center px-4 py-2.5 text-sm transition-colors'
                        )}
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        Sign out
                      </button>
                    )}
                  </HeadlessMenu.Item>
                </HeadlessMenu.Items>
              </Transition>
            </HeadlessMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Music2, Search, Plus, Bell, LogOut, Settings, User } from 'lucide-react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Cookies from 'js-cookie';

const navigation = [
  { name: 'Top', href: '/top' },
  { name: 'Explore', href: '/explore' },
  { name: 'My library', href: '/library' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleLogout = () => {
    Cookies.remove('access_token');
    // refresh_token is HttpOnly, so we rely on the server or just redirect
    // For now, let's just redirect and let middleware/api-client handle it
    router.push('/auth');
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-xl border-b border-white/5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary/20 p-1.5 rounded-xl group-hover:bg-primary/30 transition-colors">
                <Music2 className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white hidden sm:block">Chordly</span>
            </Link>
          </div>

          {/* Navigation Tabs - Desktop */}
          <nav className="hidden md:flex space-x-1 bg-slate-800/40 p-1 rounded-xl border border-white/5">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    'px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Search, Actions & Profile */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
            
            {/* Search Bar */}
            <div className={classNames(
              "relative transition-all duration-300 ease-in-out hidden sm:block",
              isSearchFocused ? "flex-1 max-w-md" : "w-40"
            )}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className={classNames(
                  "h-4 w-4 transition-colors",
                  isSearchFocused ? "text-primary" : "text-slate-500"
                )} />
              </div>
              <input
                type="text"
                placeholder="Search songs..."
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="block w-full pl-9 pr-4 py-2 bg-slate-800/50 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all"
              />
            </div>

            <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors sm:hidden">
              <Search className="w-5 h-5" />
            </button>

            <button className="p-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </button>

            <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-slate-900" />
            </button>

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
                        <Music2 className="mr-3 h-4 w-4 text-slate-400" />
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

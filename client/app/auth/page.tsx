'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Mail, Lock, Loader2, Shirt, Eye, EyeOff } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { authApi, AuthCredentials } from '@/api/auth';
import { AxiosError } from 'axios';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AuthPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [formData, setFormData] = useState<AuthCredentials>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginMutation = useMutation({
    mutationFn: (data: AuthCredentials) => authApi.signin(data),
    onSuccess: () => {
      router.push('/');
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: AuthCredentials) => authApi.signup(data),
    onSuccess: () => {
      router.push('/');
    },
  });

  const handleAuth = (type: 'signin' | 'signup') => {
    if (type === 'signin') {
      loginMutation.mutate(formData);
    } else {
      registerMutation.mutate(formData);
    }
  };

  const isLoading = loginMutation.isPending || registerMutation.isPending;
  const error = (loginMutation.error as AxiosError<{message: string}>)?.response?.data?.message || 
                (registerMutation.error as AxiosError<{message: string}>)?.response?.data?.message || 
                (loginMutation.error || registerMutation.error ? 'An unexpected error occurred' : null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 font-sans selection:bg-primary/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 flex items-center justify-center gap-3">
            <Shirt className="w-10 h-10 text-primary animate-pulse" />
            Fitly
          </h1>
          <p className="text-slate-400 font-medium">Curate your perfect outfit</p>
        </div>

        <div className="bg-card backdrop-blur-xl border border-border p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Animated border line at top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

          <TabGroup>
            <TabList className="flex p-1.5 space-x-1 bg-slate-800/50 rounded-2xl mb-8 border border-white/5">
              {['Login', 'Register'].map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      'w-full py-3 text-sm font-semibold leading-5 rounded-xl transition-all duration-200 outline-none',
                      selected
                        ? 'bg-primary text-white shadow-lg shadow-primary/25 ring-1 ring-white/10'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </TabList>

            <TabPanels>
              <TabPanel className="focus:outline-none">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleAuth('signin'); }} 
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Email Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-indigo-500/40 transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full pl-11 pr-12 py-3.5 bg-slate-800/50 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-indigo-500/40 transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-sm font-medium flex items-center animate-shake">
                      <span className="mr-2">⚠️</span> {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-slate-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>
              </TabPanel>

              <TabPanel className="focus:outline-none">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleAuth('signup'); }} 
                  className="space-y-5"
                >
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Email Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-800/50 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-indigo-500/40 transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        required
                        minLength={6}
                        value={formData.password}
                        onChange={handleChange}
                        className="block w-full pl-11 pr-12 py-3.5 bg-slate-800/50 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-indigo-500/40 transition-all"
                        placeholder="Min 6 characters"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-sm font-medium flex items-center">
                      <span className="mr-2">⚠️</span> {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-slate-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </form>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          By continuing, you agree to Fitly&apos;s{' '}
          <a href="#" className="font-semibold text-slate-400 hover:text-indigo-400 transition-colors">Terms of Service</a> and{' '}
          <a href="#" className="font-semibold text-slate-400 hover:text-indigo-400 transition-colors">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // Set authentication cookie (temporary implementation)
    document.cookie = 'auth-token=dummy-token; path=/; max-age=86400'; // 24 hours
    
    // Redirect to home page
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Login</h1>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2.5 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
}

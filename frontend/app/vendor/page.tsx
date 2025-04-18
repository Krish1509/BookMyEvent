'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

export default function VendorLoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const name = urlParams.get('name');
    
    if (token && name) {
      // Store auth info
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      // Use replace instead of push to prevent back-button issues
      router.replace('/vendor/register');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Vendor Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please sign in to continue as a vendor
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <button
            onClick={() => login()}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <Image
                src="/google-icon.svg"
                alt="Google Icon"
                width={20}
                height={20}
                className="h-5 w-5"
              />
            </span>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
} 
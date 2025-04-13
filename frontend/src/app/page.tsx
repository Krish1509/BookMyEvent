'use client';

import { useAuth } from './context/AuthContext';

export default function HomePage() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">BookMyEvent</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to BookMyEvent</h2>
          <p className="text-gray-600">
            You are now logged in. Start exploring and booking events!
          </p>
        </div>
      </div>
    </div>
  );
} 
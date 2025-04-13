// frontend/app/page.tsx (for App Router projects)
"use client"; // required if using useEffect or useState

import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';

export default function HomePage() {
  const { logout, userName } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">BookMyEvent</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, {userName || 'User'}</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome to BookMyEvent</h2>
            <p className="text-gray-600">
              You are now logged in. Start exploring and booking events!
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

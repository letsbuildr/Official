"use client";

import Link from "next/link";

interface AdminHeaderProps {
  admin: {
    name: string;
    email: string;
    role: string;
  };
}

export default function AdminHeader({ admin }: AdminHeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 gap-4">
          
          {/* Left Section */}
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Platform management and analytics control center.
            </p>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            
            {/* Admin Badge */}
            <div className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
              Admin Access
            </div>

            {/* Dashboard Link */}
            <Link 
              href="/dashboard"
              className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="User Dashboard"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Link>

            {/* User Section */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{admin.name}</p>
                <p className="text-xs text-gray-500">{admin.email}</p>
              </div>

              {/* Avatar */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-linear-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-medium">
                {admin.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                }
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
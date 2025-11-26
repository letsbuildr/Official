"use client";

import { useState } from "react";
import { Shield, Users, Settings, BarChart3 } from "lucide-react";

interface AdminPermissionsProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "super_admin";
  permissions: string[];
}

export default function AdminPermissions({ children, requiredPermission }: AdminPermissionsProps) {
  // Mock admin user - in real app, this would come from auth context
  const [currentAdmin] = useState<AdminUser>({
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    permissions: [
      "user_management",
      "service_management", 
      "schedule_management",
      "analytics_access",
      "pricing_adjustment",
      "system_settings"
    ]
  });

  const [showAccessDenied, setShowAccessDenied] = useState(false);

  const hasPermission = (permission: string): boolean => {
    return currentAdmin.permissions.includes(permission);
  };

  // Check if user has required permission
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Access Denied</h3>
            <p className="text-sm text-gray-500 mb-4">
              You don&apos;t have the required permission to access this section.
            </p>
            <div className="text-xs text-gray-400">
              Required: <code className="bg-gray-100 px-2 py-1 rounded">{requiredPermission}</code>
            </div>
            <div className="mt-6">
              <button
                onClick={() => window.history.back()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
      
      {/* Admin Permission Helper (visible in development) */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-sm">
            <div className="text-xs font-medium text-gray-900 mb-2">Admin Permissions</div>
            <div className="space-y-1">
              {currentAdmin.permissions.map((permission) => (
                <div
                  key={permission}
                  className={`text-xs px-2 py-1 rounded ${
                    requiredPermission === permission
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {permission}
                  {requiredPermission === permission && (
                    <span className="ml-1 text-green-600">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Admin Navigation Component for easy integration
export function AdminNavigation({ currentPath }: { currentPath: string }) {
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

  const adminRoutes = [
    { path: "/admin", label: "Admin Dashboard", icon: Shield },
    { path: "/admin/users", label: "User Management", icon: Users },
    { path: "/admin/services", label: "Service Management", icon: Settings },
    { path: "/admin/analytics", label: "Analytics", icon: BarChart3 }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
      >
        <Shield className="w-4 h-4 mr-2" />
        Admin
        <svg
          className={`ml-2 h-4 w-4 transition-transform ${isAdminMenuOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isAdminMenuOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="py-2">
            {adminRoutes.map((route) => (
              <a
                key={route.path}
                href={route.path}
                className={`flex items-center px-4 py-2 text-sm hover:bg-gray-50 ${
                  currentPath === route.path
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
                    : "text-gray-700"
                }`}
              >
                <route.icon className="w-4 h-4 mr-3" />
                {route.label}
              </a>
            ))}
            <hr className="my-2" />
            <div className="px-4 py-2 text-xs text-gray-500">
              Admin Access Required
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Role Badge Component
export function RoleBadge({ role }: { role: "admin" | "freelancer" | "user" }) {
  const getRoleConfig = (role: string) => {
    switch (role) {
      case "admin":
        return { color: "bg-red-100 text-red-800", label: "Admin" };
      case "freelancer":
        return { color: "bg-purple-100 text-purple-800", label: "Freelancer" };
      default:
        return { color: "bg-blue-100 text-blue-800", label: "User" };
    }
  };

  const config = getRoleConfig(role);

  return (
    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>
      {config.label}
    </span>
  );
}
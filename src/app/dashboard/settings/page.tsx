"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "../components/DashboardHeader";
import PasswordChangeForm from "./components/PasswordChangeForm";
import SecurityRequirements from "./components/SecurityRequirements";

export default function SettingsPage() {
  const [user] = useState({
    name: "Oge Obubu",
    email: "ogeobubu@gmail.com",
    joinDate: "2025-11-14",
  });

  // Session timeout state
  const [sessionTimeout, setSessionTimeout] = useState<NodeJS.Timeout | null>(null);
  const [timeUntilTimeout, setTimeUntilTimeout] = useState(0);

  // Session timeout settings (30 minutes)
  const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

  // Reset session timeout on user activity
  const resetSessionTimeout = () => {
    if (sessionTimeout) {
      clearTimeout(sessionTimeout);
    }
    
    const newTimeout = setTimeout(() => {
      // Handle session timeout - redirect to sign-in or show modal
      alert("Your session has expired. Please sign in again.");
      window.location.href = "/sign-in";
    }, SESSION_TIMEOUT_MS);
    
    setSessionTimeout(newTimeout);
    setTimeUntilTimeout(SESSION_TIMEOUT_MS);
  };

  // Update countdown display
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeUntilTimeout(prev => {
        if (prev <= 1000) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [sessionTimeout]);

  // Set up session timeout on mount and user activity tracking
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    const resetOnActivity = () => {
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
      }
      
      const newTimeout = setTimeout(() => {
        // Handle session timeout - redirect to sign-in or show modal
        alert("Your session has expired. Please sign in again.");
        window.location.href = "/sign-in";
      }, SESSION_TIMEOUT_MS);
      
      setSessionTimeout(newTimeout);
      setTimeUntilTimeout(SESSION_TIMEOUT_MS);
    };

    // Set initial timeout
    resetOnActivity();

    events.forEach(event => {
      document.addEventListener(event, resetOnActivity, true);
    });

    return () => {
      if (sessionTimeout) {
        clearTimeout(sessionTimeout);
      }
      events.forEach(event => {
        document.removeEventListener(event, resetOnActivity, true);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-600">
            Manage your account preferences and security settings.
          </p>
        </div>

        {/* Session Timeout Warning */}
        {timeUntilTimeout < 5 * 60 * 1000 && timeUntilTimeout > 0 && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-yellow-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-yellow-800">
                  Session expires soon
                </h3>
                <p className="text-sm text-yellow-700">
                  Your session will expire in {Math.floor(timeUntilTimeout / 60000)}:{Math.floor((timeUntilTimeout % 60000) / 1000).toString().padStart(2, '0')} minutes. 
                  <button 
                    onClick={resetSessionTimeout}
                    className="ml-1 underline hover:no-underline"
                  >
                    Extend session
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Password Change Section */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
              <p className="text-sm text-gray-600 mt-1">
                Update your password to keep your account secure.
              </p>
            </div>
            <div className="p-6">
              <PasswordChangeForm />
            </div>
          </div>

          {/* Security Requirements */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Password Requirements</h3>
              <p className="text-sm text-gray-600 mt-1">
                Follow these guidelines to create a strong, secure password.
              </p>
            </div>
            <div className="p-6">
              <SecurityRequirements />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
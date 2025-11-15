"use client";

import { TrendingUp, CreditCard, User, Settings } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <button className="p-4 bg-white rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors text-left">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
          <TrendingUp className="w-5 h-5 text-blue-600" />
        </div>
        <h4 className="font-medium text-gray-900 mb-1">View Projects</h4>
        <p className="text-sm text-gray-600">Check your active projects</p>
      </button>

      <button className="p-4 bg-white rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors text-left">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
          <CreditCard className="w-5 h-5 text-green-600" />
        </div>
        <h4 className="font-medium text-gray-900 mb-1">Make Payment</h4>
        <p className="text-sm text-gray-600">Pay for ongoing projects</p>
      </button>

      <button className="p-4 bg-white rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors text-left">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
          <User className="w-5 h-5 text-purple-600" />
        </div>
        <h4 className="font-medium text-gray-900 mb-1">Update Profile</h4>
        <p className="text-sm text-gray-600">Manage your account info</p>
      </button>

      <button className="p-4 bg-white rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors text-left">
        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
          <Settings className="w-5 h-5 text-yellow-600" />
        </div>
        <h4 className="font-medium text-gray-900 mb-1">Settings</h4>
        <p className="text-sm text-gray-600">Configure preferences</p>
      </button>
    </div>
  );
}
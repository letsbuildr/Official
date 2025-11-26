"use client";

import { useState } from "react";
import { BarChart3, Users, Settings, Calendar, TrendingUp, DollarSign } from "lucide-react";
import AdminHeader from "./components/AdminHeader";
import AdminOverview from "./components/AdminOverview";
import UserManagement from "./components/UserManagement";
import ServiceManagement from "./components/ServiceManagement";
import ScheduleManagement from "./components/ScheduleManagement";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import PricingAdjustment from "./components/PricingAdjustment";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const [admin] = useState({
    name: "Admin User",
    email: "admin@example.com",
    role: "admin"
  });

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "User Management", icon: Users },
    { id: "services", label: "Service Management", icon: Settings },
    { id: "schedule", label: "Schedule Management", icon: Calendar },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "pricing", label: "Pricing", icon: DollarSign }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader admin={admin} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === "overview" && <AdminOverview />}
          {activeTab === "users" && <UserManagement />}
          {activeTab === "services" && <ServiceManagement />}
          {activeTab === "schedule" && <ScheduleManagement />}
          {activeTab === "analytics" && <AnalyticsDashboard />}
          {activeTab === "pricing" && <PricingAdjustment />}
        </div>
      </div>
    </div>
  );
}
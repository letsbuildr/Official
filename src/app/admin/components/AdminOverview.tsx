"use client";

import { useState } from "react";
import { Users, Calendar, DollarSign, CheckCircle, Star, Settings } from "lucide-react";

export default function AdminOverview() {
  const [stats] = useState({
    totalUsers: 1247,
    totalServices: 24,
    totalConsultations: 342,
    totalRevenue: 2750000,
    activeUsers: 423,
    completedConsultations: 287,
    pendingConsultations: 55,
    newUsersThisMonth: 89
  });

  const recentActivities = [
    {
      id: 1,
      type: "user_registered",
      message: "New user John Doe registered",
      time: "2 hours ago",
      icon: Users
    },
    {
      id: 2,
      type: "consultation_booked",
      message: "New consultation booked for Web Development",
      time: "4 hours ago",
      icon: Calendar
    },
    {
      id: 3,
      type: "service_purchased",
      message: "Data Analysis service purchased by Jane Smith",
      time: "6 hours ago",
      icon: DollarSign
    },
    {
      id: 4,
      type: "consultation_completed",
      message: "Consultation completed with Mike Johnson",
      time: "8 hours ago",
      icon: CheckCircle
    },
    {
      id: 5,
      type: "user_upgraded",
      message: "User upgraded to Freelancer role",
      time: "1 day ago",
      icon: Star
    }
  ];

  const topServices = [
    { name: "Web Development", sales: 45, revenue: 1575000 },
    { name: "Data Analysis", sales: 32, revenue: 800000 },
    { name: "Automation Setup", sales: 28, revenue: 560000 },
    { name: "UI/UX Design", sales: 19, revenue: 380000 },
    { name: "Mobile App Development", sales: 15, revenue: 750000 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Platform Overview</h2>
        <p className="text-gray-600 mt-1">
          Monitor your platform&apos;s performance and key metrics
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-green-600">+{stats.newUsersThisMonth} this month</p>
            </div>
          </div>
        </div>

        {/* Total Services */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Services</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalServices}</p>
              <p className="text-sm text-blue-600">{stats.activeUsers} active users</p>
            </div>
          </div>
        </div>

        {/* Total Consultations */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Consultations</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalConsultations}</p>
              <p className="text-sm text-orange-600">{stats.pendingConsultations} pending</p>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">₦{stats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600">{stats.completedConsultations} completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          </div>
          <div className="p-6">
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivities.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== recentActivities.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                            <activity.icon className="w-4 h-4 text-gray-600" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-900">{activity.message}</p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Top Services */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Services</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-500">{service.sales} sales</p>
                    </div>
                    <div className="mt-2">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(service.sales / 45) * 100}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Revenue: ₦{service.revenue.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
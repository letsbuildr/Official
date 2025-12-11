"use client";

import { Users, Calendar, DollarSign, CheckCircle, Star, Settings, CreditCard, Clock } from "lucide-react";
import { useAdminOverview } from "../../../lib/api/hooks";

export default function AdminOverview() {
  const { data: overviewData, isLoading, error } = useAdminOverview();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="flex items-center">
                <div className="p-3 bg-gray-200 rounded-lg w-12 h-12"></div>
                <div className="ml-4 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-red-800">Error Loading Overview</h3>
          <p className="text-red-600 mt-1">
            {error instanceof Error ? error.message : 'Failed to load admin overview data'}
          </p>
        </div>
      </div>
    );
  }

  if (!overviewData?.data) {
    return (
      <div className="space-y-8">
        <div className="text-center py-8">
          <p className="text-gray-500">No overview data available</p>
        </div>
      </div>
    );
  }

  const { stats, activityLog, topServices } = overviewData.data;

  // Helper function to get activity icon and message
  const getActivityInfo = (type: string, user: string) => {
    switch (type) {
      case 'payment-completed':
        return {
          icon: CheckCircle,
          message: `${user} completed a payment`,
          color: 'text-green-600'
        };
      case 'payment-pending':
        return {
          icon: Clock,
          message: `${user} has a pending payment`,
          color: 'text-orange-600'
        };
      case 'consultation-booked':
        return {
          icon: Calendar,
          message: `${user} booked a consultation`,
          color: 'text-blue-600'
        };
      default:
        return {
          icon: Users,
          message: `${user} performed ${type}`,
          color: 'text-gray-600'
        };
    }
  };

  // Helper function to format time ago
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Platform Overview</h2>
        <p className="text-gray-600 mt-1">
          Monitor your platform's performance and key metrics
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
              <p className="text-sm text-blue-600">{stats.activeServiceUsers} active users</p>
            </div>
          </div>
        </div>

        {/* Scheduled Consultations */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Consultations</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.scheduledConsultations}</p>
              <p className="text-sm text-orange-600">scheduled</p>
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
              <p className="text-sm text-green-600">lifetime</p>
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
                {activityLog.slice(0, 10).map((activity, activityIdx) => {
                  const activityInfo = getActivityInfo(activity.type, activity.user);
                  const IconComponent = activityInfo.icon;
                  
                  return (
                    <li key={activityIdx}>
                      <div className="relative pb-8">
                        {activityIdx !== Math.min(activityLog.length - 1, 9) ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                              <IconComponent className={`w-4 h-4 ${activityInfo.color}`} />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-900">{activityInfo.message}</p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              {getTimeAgo(activity.createdAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
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
              {topServices.length > 0 ? (
                topServices.map((service, index) => {
                  const maxSales = Math.max(...topServices.map(s => s.sales));
                  const percentage = (service.sales / maxSales) * 100;
                  
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">Service {service._id._id.slice(-6)}</p>
                          <p className="text-sm text-gray-500">{service.sales} sales</p>
                        </div>
                        <div className="mt-2">
                          <div className="bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Revenue: ₦{service.revenue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-center py-4">No service data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
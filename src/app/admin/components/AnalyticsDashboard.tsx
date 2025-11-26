"use client";

import { useState } from "react";

export default function AnalyticsDashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30days");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock analytics data
  const [analytics] = useState({
    revenue: {
      total: 2750000,
      growth: 12.5,
      monthlyData: [
        { month: "Jun", revenue: 450000 },
        { month: "Jul", revenue: 520000 },
        { month: "Aug", revenue: 480000 },
        { month: "Sep", revenue: 650000 },
        { month: "Oct", revenue: 720000 },
        { month: "Nov", revenue: 830000 }
      ]
    },
    users: {
      total: 1247,
      new: 89,
      active: 423,
      growth: 8.2,
      segmentation: [
        { segment: "Web Development", users: 456, percentage: 36.6 },
        { segment: "Data Analysis", users: 298, percentage: 23.9 },
        { segment: "Automation", users: 234, percentage: 18.8 },
        { segment: "UI/UX Design", users: 187, percentage: 15.0 },
        { segment: "Mobile Development", users: 72, percentage: 5.7 }
      ]
    },
    services: {
      total: 24,
      active: 18,
      topPerformers: [
        { name: "Web Development", sales: 45, revenue: 1575000, rating: 4.8 },
        { name: "Data Analysis", sales: 32, revenue: 800000, rating: 4.6 },
        { name: "Automation Setup", sales: 28, revenue: 560000, rating: 4.7 },
        { name: "UI/UX Design", sales: 19, revenue: 380000, rating: 4.9 },
        { name: "Mobile App Dev", sales: 15, revenue: 750000, rating: 4.5 }
      ],
      paymentPlans: {
        "Full Payment": 68,
        "50/50 Split": 22,
        "Monthly": 10
      }
    },
    consultations: {
      total: 342,
      completed: 287,
      cancelled: 32,
      pending: 23,
      successRate: 83.9,
      mostBookedDays: [
        { day: "Monday", bookings: 78 },
        { day: "Wednesday", bookings: 65 },
        { day: "Friday", bookings: 58 },
        { day: "Tuesday", bookings: 52 },
        { day: "Thursday", bookings: 47 }
      ]
    },
    freelancer: {
      total: 23,
      topPerformers: [
        { name: "Alex Thompson", projects: 15, avgDelivery: 4.2, rating: 4.9 },
        { name: "Maria Garcia", projects: 12, avgDelivery: 3.8, rating: 4.8 },
        { name: "David Kim", projects: 10, avgDelivery: 5.1, rating: 4.7 },
        { name: "Sarah Johnson", projects: 9, avgDelivery: 4.5, rating: 4.9 }
      ]
    }
  });

  const timeRanges = [
    { value: "7days", label: "Last 7 days" },
    { value: "30days", label: "Last 30 days" },
    { value: "90days", label: "Last 3 months" },
    { value: "1year", label: "Last year" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics & Data Insights</h2>
          <p className="text-gray-600 mt-1">
            Comprehensive platform analytics and performance metrics
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">₦{analytics.revenue.total.toLocaleString()}</p>
              <p className="text-sm text-green-600">+{analytics.revenue.growth}% this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{analytics.users.total.toLocaleString()}</p>
              <p className="text-sm text-blue-600">+{analytics.users.new} new this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Services</p>
              <p className="text-2xl font-semibold text-gray-900">{analytics.services.total}</p>
              <p className="text-sm text-purple-600">{analytics.services.active} active services</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V9m-6-4h.01M16 16h.01" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Consultations</p>
              <p className="text-2xl font-semibold text-gray-900">{analytics.consultations.total}</p>
              <p className="text-sm text-yellow-600">{analytics.consultations.successRate}% success rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            <div className="text-sm text-green-600">+{analytics.revenue.growth}%</div>
          </div>
          <div className="h-64 flex items-end space-x-2">
            {analytics.revenue.monthlyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="bg-blue-500 w-full rounded-t"
                  style={{ height: `${(data.revenue / 900000) * 200}px` }}
                />
                <div className="text-xs text-gray-500 mt-2">{data.month}</div>
                <div className="text-xs font-medium">₦{data.revenue / 1000}k</div>
              </div>
            ))}
          </div>
        </div>

        {/* User Segmentation */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Segmentation by Service Interest</h3>
          <div className="space-y-4">
            {analytics.users.segmentation.map((segment, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">{segment.segment}</span>
                  <span className="font-medium">{segment.users} users ({segment.percentage}%)</span>
                </div>
                <div className="mt-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${segment.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Services */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Services</h3>
          <div className="space-y-4">
            {analytics.services.topPerformers.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{service.name}</h4>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-600">{service.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>{service.sales} sales</span>
                    <span>₦{service.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Booked Days */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Popular Consultation Days</h3>
          <div className="space-y-3">
            {analytics.consultations.mostBookedDays.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-900">{day.day}</span>
                </div>
                <span className="text-sm text-gray-600">{day.bookings} bookings</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Plan Preferences */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Plan Preferences</h3>
          <div className="space-y-4">
            {Object.entries(analytics.services.paymentPlans).map(([plan, percentage], index) => (
              <div key={index}>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">{plan}</span>
                  <span className="font-medium">{percentage}%</span>
                </div>
                <div className="mt-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Freelancers */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Freelancer Performance</h3>
          <div className="space-y-4">
            {analytics.freelancer.topPerformers.map((freelancer, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{freelancer.name}</h4>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-gray-600">{freelancer.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{freelancer.projects} projects</span>
                  <span>Avg delivery: {freelancer.avgDelivery} days</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
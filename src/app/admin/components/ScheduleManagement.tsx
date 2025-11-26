"use client";

import { useState } from "react";

interface UnavailableDate {
  id: number;
  date: string;
  reason: string;
  type: "holiday" | "maintenance" | "personal" | "other";
}

interface Consultation {
  id: number;
  clientName: string;
  clientEmail: string;
  service: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
  duration: number;
}

export default function ScheduleManagement() {
  const [currentTab, setCurrentTab] = useState("unavailable");
  const [showAddDateModal, setShowAddDateModal] = useState(false);
  const [consultationDuration, setConsultationDuration] = useState(30);
  const [showDurationModal, setShowDurationModal] = useState(false);

  const [unavailableDates] = useState<UnavailableDate[]>([
    {
      id: 1,
      date: "2024-12-25",
      reason: "Christmas Holiday",
      type: "holiday"
    },
    {
      id: 2,
      date: "2024-12-26",
      reason: "Boxing Day",
      type: "holiday"
    },
    {
      id: 3,
      date: "2024-11-30",
      reason: "Team Retreat",
      type: "other"
    },
    {
      id: 4,
      date: "2024-12-15",
      reason: "System Maintenance",
      type: "maintenance"
    }
  ]);

  const [consultations] = useState<Consultation[]>([
    {
      id: 1,
      clientName: "John Doe",
      clientEmail: "john@example.com",
      service: "Web Development",
      date: "2024-11-20",
      time: "10:00",
      status: "scheduled",
      duration: 30
    },
    {
      id: 2,
      clientName: "Jane Smith",
      clientEmail: "jane@example.com",
      service: "Data Analysis",
      date: "2024-11-18",
      time: "14:00",
      status: "completed",
      duration: 45
    },
    {
      id: 3,
      clientName: "Mike Johnson",
      clientEmail: "mike@example.com",
      service: "UI/UX Design",
      date: "2024-11-25",
      time: "11:00",
      status: "scheduled",
      duration: 30
    },
    {
      id: 4,
      clientName: "Sarah Wilson",
      clientEmail: "sarah@example.com",
      service: "Automation Setup",
      date: "2024-11-22",
      time: "15:30",
      status: "cancelled",
      duration: 60
    }
  ]);

  const handleAddUnavailableDate = () => {
    console.log("Adding unavailable date");
    setShowAddDateModal(false);
  };

  const handleDeleteUnavailableDate = (id: number) => {
    if (confirm("Are you sure you want to remove this unavailable date?")) {
      console.log(`Deleting unavailable date ${id}`);
    }
  };

  const handleCancelConsultation = (consultationId: number) => {
    if (confirm("Are you sure you want to cancel this consultation? The client will be notified automatically.")) {
      console.log(`Cancelling consultation ${consultationId}`);
    }
  };

  const handleUpdateDuration = () => {
    console.log(`Updating consultation duration to ${consultationDuration} minutes`);
    setShowDurationModal(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "holiday": return "bg-blue-100 text-blue-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      case "personal": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Schedule Management</h2>
        <p className="text-gray-600 mt-1">
          Manage consultation schedules, unavailable dates, and platform settings
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setCurrentTab("unavailable")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              currentTab === "unavailable"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Unavailable Dates
          </button>
          <button
            onClick={() => setCurrentTab("consultations")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              currentTab === "consultations"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Consultations
          </button>
          <button
            onClick={() => setCurrentTab("settings")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              currentTab === "settings"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Settings
          </button>
        </nav>
      </div>

      {/* Unavailable Dates Tab */}
      {currentTab === "unavailable" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Platform Unavailable Dates</h3>
            <button
              onClick={() => setShowAddDateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Add Unavailable Date
            </button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {unavailableDates.map((date) => (
                    <tr key={date.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(date.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {date.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(date.type)}`}>
                          {date.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteUnavailableDate(date.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Consultations Tab */}
      {currentTab === "consultations" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">All Consultations</h3>
            <div className="text-sm text-gray-500">
              Total: {consultations.length} consultations
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {consultations.map((consultation) => (
                    <tr key={consultation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{consultation.clientName}</div>
                          <div className="text-sm text-gray-500">{consultation.clientEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {consultation.service}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{new Date(consultation.date).toLocaleDateString()}</div>
                        <div className="text-gray-500">{consultation.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {consultation.duration} min
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(consultation.status)}`}>
                          {consultation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {consultation.status === "scheduled" && (
                          <button
                            onClick={() => handleCancelConsultation(consultation.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {currentTab === "settings" && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Consultation Settings</h3>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-6">
              {/* Consultation Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Consultation Duration
                </label>
                <div className="flex items-center space-x-4">
                  <select
                    value={consultationDuration}
                    onChange={(e) => setConsultationDuration(Number(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>60 minutes</option>
                    <option value={90}>90 minutes</option>
                  </select>
                  <button
                    onClick={() => setShowDurationModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Update Duration
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  This will affect all future consultations. Current consultations won't be affected.
                </p>
              </div>

              {/* Auto-cancellation Rules */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">Auto-cancellation Rules</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">No-show auto-cancellation</p>
                      <p className="text-sm text-gray-500">Automatically cancel consultations if client doesn't join within 15 minutes</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">24-hour cancellation notice</p>
                      <p className="text-sm text-gray-500">Clients must provide 24-hour notice for cancellations</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Unavailable Date Modal */}
      {showAddDateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Unavailable Date</h3>
              <button
                onClick={() => setShowAddDateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason
                </label>
                <input
                  type="text"
                  placeholder="e.g., Christmas Holiday, Team Retreat"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="holiday">Holiday</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="personal">Personal</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddDateModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleAddUnavailableDate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Date
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Duration Update Modal */}
      {showDurationModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Update Consultation Duration</h3>
              <button
                onClick={() => setShowDurationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <svg className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Warning</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      This will update the default consultation duration for all new bookings. Existing consultations won't be affected.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Default Duration (minutes)
                </label>
                <select
                  value={consultationDuration}
                  onChange={(e) => setConsultationDuration(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                  <option value={90}>90 minutes</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowDurationModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleUpdateDuration}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Update Duration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
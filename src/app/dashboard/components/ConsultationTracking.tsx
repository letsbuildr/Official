"use client";

import { Calendar, Clock, User, Briefcase } from "lucide-react";

interface Consultation {
  id: number;
  service: string;
  consultationDate: string;
  consultationTime: string;
  status: "scheduled" | "completed" | "cancelled";
  fullName: string;
  email: string;
  message: string;
}

interface ConsultationTrackingProps {
  consultations?: Consultation[];
}

export default function ConsultationTracking({ 
  consultations = [
    {
      id: 1,
      service: "Web Development",
      consultationDate: "2024-11-20",
      consultationTime: "10:00 AM",
      status: "scheduled",
      fullName: "John Doe",
      email: "john@example.com",
      message: "Interested in building a modern e-commerce platform"
    },
    {
      id: 2,
      service: "Data Analysis",
      consultationDate: "2024-11-18",
      consultationTime: "02:00 PM", 
      status: "completed",
      fullName: "Jane Smith",
      email: "jane@example.com",
      message: "Need help with business analytics dashboard"
    }
  ]
}: ConsultationTrackingProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Clock className="w-4 h-4" />;
      case "completed":
        return <Calendar className="w-4 h-4" />;
      case "cancelled":
        return <Calendar className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-3">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-[#0077B6]" />
          Consultation Tracking
        </h2>
        <span className="text-sm text-gray-500">
          {consultations.length} consultation{consultations.length !== 1 ? 's' : ''}
        </span>
      </div>

      {consultations.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Consultations Yet</h3>
          <p className="text-gray-600 mb-4">
            You haven&apos;t booked any consultations. Book a consultation to get expert advice on your projects.
          </p>
          <a
            href="/consultation"
            className="inline-flex items-center px-4 py-2 bg-[#0077B6] text-white rounded-lg hover:bg-[#005F91] transition-colors"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Consultation
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {consultations.map((consultation) => (
            <div
              key={consultation.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 text-[#0077B6] mr-2" />
                  <h3 className="font-medium text-gray-900">
                    Service: {consultation.service}
                  </h3>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(consultation.status)}`}>
                  {getStatusIcon(consultation.status)}
                  <span className="ml-1 capitalize">{consultation.status}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{formatDate(consultation.consultationDate)}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{consultation.consultationTime}</span>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-3">
                <User className="w-4 h-4 mr-2" />
                <span>{consultation.fullName} ({consultation.email})</span>
              </div>

              {consultation.message && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Message:</span> {consultation.message}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {consultations.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <a
            href="/consultation"
            className="text-[#0077B6] hover:text-[#005F91] font-medium text-sm flex items-center"
          >
            <Calendar className="w-4 h-4 mr-1" />
            Book New Consultation
          </a>
        </div>
      )}
    </div>
  );
}
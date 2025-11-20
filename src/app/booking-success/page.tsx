"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Calendar, Clock, Mail, Home, ArrowLeft, Download } from "lucide-react";

interface BookingData {
  fullName: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}

export default function BookingSuccessPage() {
  const router = useRouter();
  
  // Initialize state from localStorage directly
  const getBookingData = (): BookingData | null => {
    try {
      const verifiedBooking = localStorage.getItem("verifiedBooking");
      if (verifiedBooking) {
        const data = JSON.parse(verifiedBooking);
        // Clear the verified booking data after loading
        localStorage.removeItem("verifiedBooking");
        return data;
      }
      return null;
    } catch {
      return null;
    }
  };

  const [bookingData, setBookingData] = useState<BookingData | null>(getBookingData());

  useEffect(() => {
    // If no booking data, redirect to consultation
    if (!bookingData) {
      router.push("/consultation");
    }
  }, [bookingData, router]);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleBookAnother = () => {
    router.push("/consultation");
  };

  const handleDownloadConfirmation = () => {
    // In a real app, this would generate and download a PDF confirmation
    alert("Confirmation download would be generated here (PDF format)");
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9FAFB] to-[#E6F0FA] px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0077B6] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(bookingData.preferredDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9FAFB] to-[#E6F0FA] px-4 py-8">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-8 border border-gray-100">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-[#0B1E36] mb-4">
            Booking Successful!
          </h2>
          <p className="text-gray-600 text-lg">
            Your consultation has been confirmed. We&apos;re excited to work with you!
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-[#0B1E36] mb-4 text-lg flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Booking Confirmation
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Client Information */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Client Information</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-gray-600">Email:</span>
                  <span className="ml-2 font-medium">{bookingData.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <span className="w-4 h-4 text-gray-500 mr-2">👤</span>
                  <span className="text-gray-600">Name:</span>
                  <span className="ml-2 font-medium">{bookingData.fullName}</span>
                </div>
              </div>
            </div>

            {/* Schedule Information */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Schedule</h4>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-gray-600">Date:</span>
                  <span className="ml-2 font-medium">{formattedDate}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-gray-600">Time:</span>
                  <span className="ml-2 font-medium">{bookingData.preferredTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          {bookingData.message && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Your Message</h4>
              <p className="text-sm text-gray-600 bg-white p-3 rounded-lg">
                {bookingData.message}
              </p>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-[#0B1E36] mb-4 flex items-center">
            <span className="w-5 h-5 mr-2">📧</span>
            What happens next?
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                1
              </div>
              <p className="text-sm text-blue-800">
                You&apos;ll receive a confirmation email with meeting details within 15 minutes
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                2
              </div>
              <p className="text-sm text-blue-800">
                Our team will review your consultation request and prepare accordingly
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                3
              </div>
              <p className="text-sm text-blue-800">
                We&apos;ll send you a calendar invite 24 hours before your appointment
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="flex-1 sm:flex-none px-6 py-3 bg-[#0077B6] text-white rounded-lg hover:bg-[#005F91] transition-all duration-300 transform hover:scale-105 flex items-center justify-center font-medium"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </button>
          
          <button
            onClick={handleBookAnother}
            className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center justify-center font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Book Another
          </button>
          
          <button
            onClick={handleDownloadConfirmation}
            className="flex-1 sm:flex-none px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center font-medium"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Confirmation
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Need to make changes? Contact us at{' '}
            <a href="mailto:support@example.com" className="text-[#0077B6] hover:underline">
              support@example.com
            </a>{' '}
            or call{' '}
            <a href="tel:+1234567890" className="text-[#0077B6] hover:underline">
              +1 (234) 567-890
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
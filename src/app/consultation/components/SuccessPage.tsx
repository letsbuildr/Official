import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { BookingFormData, CONSULTATION_TYPES } from "../types";

interface SuccessPageProps {
  formData: BookingFormData;
  onBookAnother: () => void;
}

export default function SuccessPage({ formData, onBookAnother }: SuccessPageProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#F9FAFB] to-[#E6F0FA] px-6 py-20">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-10 border border-gray-100 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-[#0B1E36] mb-4">
          Booking Confirmed!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for scheduling a consultation with us. We&apos;ve received your booking request and will send a confirmation email to <strong>{formData.email}</strong> shortly.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-[#0B1E36] mb-2">Booking Details:</h3>
          <p className="text-sm text-gray-600">
            <strong>Date:</strong> {new Date(formData.preferredDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Time:</strong> {formData.preferredTime}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Type:</strong> {CONSULTATION_TYPES.find(t => t.value === formData.consultationType)?.label}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-[#0077B6] text-white rounded-lg hover:bg-[#005F91] transition-all duration-300 transform hover:scale-105"
          >
            Go to Dashboard
          </Link>
          <button
            onClick={onBookAnother}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Book Another Consultation
          </button>
        </div>
      </div>
    </section>
  );
}
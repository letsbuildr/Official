"use client";

import { Save, User, Mail, MessageSquare, Calendar, Clock, LogIn } from "lucide-react";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormSection from "./FormSection";
import { BookingFormData, FormErrors, TIME_SLOTS } from "../types";

interface BookingFormProps {
  formData: BookingFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  availableTimeSlots: string[];
  isLoggedIn: boolean;
  userData?: {
    fullName: string;
    email: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onDateChange: (date: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSaveDraft: () => void;
  onClearDraft: () => void;
  getMinDate: () => string;
  onLoginClick: () => void;
}

export default function BookingForm({
  formData,
  errors,
  isSubmitting,
  availableTimeSlots,
  isLoggedIn,
  userData,
  onInputChange,
  onDateChange,
  onSubmit,
  onSaveDraft,
  onClearDraft,
  getMinDate,
  onLoginClick,
}: BookingFormProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    onInputChange(e);
    onDateChange(date);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
      <form onSubmit={onSubmit} className="space-y-8">
        {/* Login Suggestion */}
        {!isLoggedIn && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <LogIn className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-blue-900 font-medium">Have an account?</p>
                  <p className="text-blue-700 text-sm">Log in to auto-fill your information</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onLoginClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
              >
                Log In
              </button>
            </div>
          </div>
        )}

        {/* Contact Information */}
        <FormSection title="Contact Information" icon={<User className="w-5 h-5" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              id="fullName"
              name="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={onInputChange}
              error={errors.fullName}
              placeholder="John Doe"
              required
            />

            <FormInput
              id="email"
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={onInputChange}
              error={errors.email}
              placeholder="john@example.com"
              icon={<Mail className="w-4 h-4" />}
              required
            />
          </div>
        </FormSection>

        {/* Consultation Message */}
        <FormSection title="Message" icon={<MessageSquare className="w-5 h-5" />}>
          <FormTextarea
            id="message"
            name="message"
            label="Tell us about your consultation needs"
            value={formData.message}
            onChange={onInputChange}
            error={errors.message}
            placeholder="Please describe what you'd like to discuss during the consultation..."
            rows={4}
            showCharCount
            maxLength={500}
            required
          />
        </FormSection>

        {/* Schedule */}
        <FormSection title="Schedule" icon={<Calendar className="w-5 h-5" />}>
          <div className="space-y-4">
            <FormInput
              id="preferredDate"
              name="preferredDate"
              label="Preferred Date"
              type="date"
              value={formData.preferredDate}
              onChange={handleDateChange}
              error={errors.preferredDate}
              min={getMinDate()}
              required
            />

            {formData.preferredDate && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Time Slots
                    {availableTimeSlots.length === 0 && (
                      <span className="text-amber-600 text-xs ml-2">
                        (No available slots for this date)
                      </span>
                    )}
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={onInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.preferredTime ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  >
                    <option value="">Select a time slot</option>
                    {availableTimeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {errors.preferredTime && (
                    <p className="text-red-500 text-sm mt-1">{errors.preferredTime}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </FormSection>

        {/* Email Confirmation Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <Mail className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
            <div>
              <p className="text-green-900 font-medium">Email Confirmation</p>
              <p className="text-green-700 text-sm">
                You&apos;ll receive an email confirmation with your consultation details after booking.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting || !formData.preferredDate || !formData.preferredTime}
            className={`flex-1 px-6 py-3 bg-[#0077B6] text-white rounded-lg font-semibold hover:bg-[#005F91] transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
              isSubmitting || !formData.preferredDate || !formData.preferredTime 
                ? "opacity-75 cursor-not-allowed" 
                : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Booking...
              </>
            ) : (
              "Book Consultation"
            )}
          </button>

          <button
            type="button"
            onClick={onSaveDraft}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </button>

          <button
            type="button"
            onClick={onClearDraft}
            className="px-6 py-3 text-red-600 hover:text-red-700 font-medium transition"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}
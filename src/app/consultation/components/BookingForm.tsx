"use client";

import { Save } from "lucide-react";
import { User, Mail, Phone, MessageSquare, Calendar, Clock } from "lucide-react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import FormSection from "./FormSection";
import { BookingFormData, FormErrors, CONSULTATION_TYPES, BUDGET_RANGES, URGENCY_LEVELS, TIME_SLOTS } from "../types";

interface BookingFormProps {
  formData: BookingFormData;
  errors: FormErrors;
  isSubmitting: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSaveDraft: () => void;
  onClearDraft: () => void;
  getMinDate: () => string;
}

export default function BookingForm({
  formData,
  errors,
  isSubmitting,
  onInputChange,
  onSubmit,
  onSaveDraft,
  onClearDraft,
  getMinDate,
}: BookingFormProps) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
      <form onSubmit={onSubmit} className="space-y-8">
        {/* Contact Information */}
        <FormSection title="Contact Information" icon={<User className="w-5 h-5" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              id="firstName"
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={onInputChange}
              error={errors.firstName}
              placeholder="John"
              required
            />

            <FormInput
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={onInputChange}
              error={errors.lastName}
              placeholder="Doe"
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

            <FormInput
              id="phone"
              name="phone"
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={onInputChange}
              error={errors.phone}
              placeholder="+234 800 000 0000"
              icon={<Phone className="w-4 h-4" />}
              required
            />
          </div>
        </FormSection>

        {/* Consultation Details */}
        <FormSection title="Consultation Details" icon={<MessageSquare className="w-5 h-5" />}>
          <div className="space-y-4">
            <FormSelect
              id="consultationType"
              name="consultationType"
              label="Consultation Type"
              value={formData.consultationType}
              onChange={onInputChange}
              error={errors.consultationType}
              options={CONSULTATION_TYPES}
              placeholder="Select consultation type"
              required
            />

            <FormTextarea
              id="projectDescription"
              name="projectDescription"
              label="Project Description"
              value={formData.projectDescription}
              onChange={onInputChange}
              error={errors.projectDescription}
              placeholder="Please describe your project requirements, goals, and any specific features you need..."
              rows={4}
              showCharCount
              maxLength={500}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                id="budget"
                name="budget"
                label="Budget Range"
                value={formData.budget}
                onChange={onInputChange}
                error={errors.budget}
                options={BUDGET_RANGES}
                placeholder="Select budget range"
                required
              />

              <FormSelect
                id="urgency"
                name="urgency"
                label="Project Urgency"
                value={formData.urgency}
                onChange={onInputChange}
                error={errors.urgency}
                options={URGENCY_LEVELS}
                placeholder="Select urgency level"
                required
              />
            </div>
          </div>
        </FormSection>

        {/* Schedule */}
        <FormSection title="Preferred Schedule" icon={<Calendar className="w-5 h-5" />}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="preferredDate"
                name="preferredDate"
                label="Preferred Date"
                type="date"
                value={formData.preferredDate}
                onChange={onInputChange}
                error={errors.preferredDate}
                min={getMinDate()}
                required
              />

              <FormSelect
                id="preferredTime"
                name="preferredTime"
                label="Preferred Time"
                value={formData.preferredTime}
                onChange={onInputChange}
                error={errors.preferredTime}
                options={TIME_SLOTS.map(time => ({ value: time, label: time }))}
                placeholder="Select time slot"
                icon={<Clock className="w-4 h-4" />}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="alternateDate"
                name="alternateDate"
                label="Alternate Date (Optional)"
                type="date"
                value={formData.alternateDate}
                onChange={onInputChange}
                min={getMinDate()}
              />

              <FormSelect
                id="alternateTime"
                name="alternateTime"
                label="Alternate Time (Optional)"
                value={formData.alternateTime}
                onChange={onInputChange}
                options={TIME_SLOTS.map(time => ({ value: time, label: time }))}
                placeholder="Select time slot"
              />
            </div>
          </div>
        </FormSection>

        {/* Additional Notes */}
        <FormTextarea
          id="additionalNotes"
          name="additionalNotes"
          label="Additional Notes (Optional)"
          value={formData.additionalNotes}
          onChange={onInputChange}
          placeholder="Any additional information you'd like us to know..."
          rows={3}
        />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 px-6 py-3 bg-[#0077B6] text-white rounded-lg font-semibold hover:bg-[#005F91] transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
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
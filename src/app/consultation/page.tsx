"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle, Save, AlertCircle } from "lucide-react";
import Link from "next/link";

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consultationType: string;
  preferredDate: string;
  preferredTime: string;
  alternateDate: string;
  alternateTime: string;
  projectDescription: string;
  budget: string;
  urgency: string;
  additionalNotes: string;
}

interface FormErrors {
  [key: string]: string;
}

const CONSULTATION_TYPES = [
  { value: "web-development", label: "Web Development" },
  { value: "mobile-app", label: "Mobile App Development" },
  { value: "data-analysis", label: "Data Analysis" },
  { value: "automation", label: "Automation Services" },
  { value: "ui-ux-design", label: "UI/UX Design" },
  { value: "e-commerce", label: "E-commerce Solutions" },
  { value: "api-development", label: "API Development" },
  { value: "general-consultation", label: "General Consultation" },
];

const BUDGET_RANGES = [
  { value: "under-100k", label: "Under ₦100,000" },
  { value: "100k-250k", label: "₦100,000 - ₦250,000" },
  { value: "250k-500k", label: "₦250,000 - ₦500,000" },
  { value: "500k-1m", label: "₦500,000 - ₦1,000,000" },
  { value: "over-1m", label: "Over ₦1,000,000" },
  { value: "not-sure", label: "Not Sure Yet" },
];

const URGENCY_LEVELS = [
  { value: "immediate", label: "Immediate (Within 1 week)" },
  { value: "soon", label: "Soon (Within 2-4 weeks)" },
  { value: "flexible", label: "Flexible (1-3 months)" },
  { value: "planning", label: "Just Planning" },
];

const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

export default function ConsultationPage() {
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consultationType: "",
    preferredDate: "",
    preferredTime: "",
    alternateDate: "",
    alternateTime: "",
    projectDescription: "",
    budget: "",
    urgency: "",
    additionalNotes: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [draftSaved, setDraftSaved] = useState(false);
  const [showDraftNotification, setShowDraftNotification] = useState(false);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("consultationDraft");
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
        setShowDraftNotification(true);
        setTimeout(() => setShowDraftNotification(false), 5000);
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }
  }, []);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (Object.values(formData).some((value) => value !== "")) {
        saveDraft();
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [formData]);

  const saveDraft = () => {
    localStorage.setItem("consultationDraft", JSON.stringify(formData));
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  const clearDraft = () => {
    localStorage.removeItem("consultationDraft");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      consultationType: "",
      preferredDate: "",
      preferredTime: "",
      alternateDate: "",
      alternateTime: "",
      projectDescription: "",
      budget: "",
      urgency: "",
      additionalNotes: "",
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.consultationType) {
      newErrors.consultationType = "Please select a consultation type";
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = "Please select a preferred date";
    } else {
      const selectedDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.preferredDate = "Please select a future date";
      }
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = "Please select a preferred time";
    }

    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = "Please describe your project";
    } else if (formData.projectDescription.trim().length < 20) {
      newErrors.projectDescription = "Please provide more details (at least 20 characters)";
    }

    if (!formData.budget) {
      newErrors.budget = "Please select a budget range";
    }

    if (!formData.urgency) {
      newErrors.urgency = "Please select urgency level";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      clearDraft();
    } catch (error) {
      console.error("Booking error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  if (submitStatus === "success") {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9FAFB] to-[#E6F0FA] px-6 py-20">
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
              onClick={() => {
                setSubmitStatus("idle");
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  consultationType: "",
                  preferredDate: "",
                  preferredTime: "",
                  alternateDate: "",
                  alternateTime: "",
                  projectDescription: "",
                  budget: "",
                  urgency: "",
                  additionalNotes: "",
                });
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Book Another Consultation
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9FAFB] to-[#E6F0FA] px-6 py-20">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1E36] mb-4">
            Book a Consultation
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Schedule a free consultation with our expert team. No account required - just fill out the form below and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {/* Draft Notification */}
        {showDraftNotification && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-800 text-sm">We found a saved draft. Your previous information has been restored.</span>
            </div>
            <button
              onClick={clearDraft}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Clear Draft
            </button>
          </div>
        )}

        {/* Draft Saved Notification */}
        {draftSaved && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center z-50">
            <Save className="w-4 h-4 mr-2" />
            Draft saved
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-semibold text-[#0B1E36] mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-[#0077B6]" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1 block">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-gray-900 ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1 block">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-gray-900 ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-gray-900 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 block">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-gray-900 ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="+234 800 000 0000"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Consultation Details */}
            <div>
              <h3 className="text-xl font-semibold text-[#0B1E36] mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-[#0077B6]" />
                Consultation Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="consultationType" className="text-sm font-medium text-gray-700 mb-1 block">
                    Consultation Type *
                  </label>
                  <select
                    id="consultationType"
                    name="consultationType"
                    value={formData.consultationType}
                    onChange={handleInputChange}
                    className={`w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-gray-900 ${
                      errors.consultationType ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select consultation type</option>
                    {CONSULTATION_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.consultationType && (
                    <p className="mt-1 text-sm text-red-600">{errors.consultationType}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="projectDescription" className="text-sm font-medium text-gray-700 mb-1 block">
                    Project Description *
                  </label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-gray-900 ${
                      errors.projectDescription ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Please describe your project requirements, goals, and any specific features you need..."
                  />
                  {errors.projectDescription && (
                    <p className="mt-1 text-sm text-red-600">{errors.projectDescription}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.projectDescription.length}/500 characters
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="budget" className="text-sm font-medium text-gray-700 mb-1 block">
                      Budget Range *
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className={`w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-gray-900 ${
                        errors.budget ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select budget range</option>
                      {BUDGET_RANGES.map((range) => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                    {errors.budget && (
                      <p className="mt-1 text-sm text-red-600">{errors.budget}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="urgency" className="text-sm font-medium text-gray-700 mb-1 block">
                      Project Urgency *
                    </label>
                    <select
                      id="urgency"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className={`w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-gray-900 ${
                        errors.urgency ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select urgency level</option>
                      {URGENCY_LEVELS.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                    {errors.urgency && (
                      <p className="mt-1 text-sm text-red-600">{errors.urgency}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h3 className="text-xl font-semibold text-[#0B1E36] mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-[#0077B6]" />
                Preferred Schedule
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="preferredDate" className="text-sm font-medium text-gray-700 mb-1 block">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      min={getMinDate()}
                      className={`w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-gray-900 ${
                        errors.preferredDate ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.preferredDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.preferredDate}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="preferredTime" className="text-sm font-medium text-gray-700 mb-1 block">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Preferred Time *
                    </label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className={`w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-gray-900 ${
                        errors.preferredTime ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select time slot</option>
                      {TIME_SLOTS.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                    {errors.preferredTime && (
                      <p className="mt-1 text-sm text-red-600">{errors.preferredTime}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="alternateDate" className="text-sm font-medium text-gray-700 mb-1 block">
                      Alternate Date (Optional)
                    </label>
                    <input
                      type="date"
                      id="alternateDate"
                      name="alternateDate"
                      value={formData.alternateDate}
                      onChange={handleInputChange}
                      min={getMinDate()}
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-gray-900"
                    />
                  </div>

                  <div>
                    <label htmlFor="alternateTime" className="text-sm font-medium text-gray-700 mb-1 block">
                      Alternate Time (Optional)
                    </label>
                    <select
                      id="alternateTime"
                      name="alternateTime"
                      value={formData.alternateTime}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-gray-900"
                    >
                      <option value="">Select time slot</option>
                      {TIME_SLOTS.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label htmlFor="additionalNotes" className="text-sm font-medium text-gray-700 mb-1 block">
                Additional Notes (Optional)
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                rows={3}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-gray-900"
                placeholder="Any additional information you'd like us to know..."
              />
            </div>

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
                onClick={saveDraft}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </button>

              <button
                type="button"
                onClick={clearDraft}
                className="px-6 py-3 text-red-600 hover:text-red-700 font-medium transition"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-white shadow-lg rounded-xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-[#0B1E36] mb-4 text-center">What to Expect</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-[#0077B6] text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 font-semibold">
                1
              </div>
              <div>
                <h4 className="font-medium text-[#0B1E36]">Confirmation Email</h4>
                <p className="text-sm text-gray-600">You&apos;ll receive a confirmation email within 24 hours</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-[#0077B6] text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 font-semibold">
                2
              </div>
              <div>
                <h4 className="font-medium text-[#0B1E36]">Meeting Link</h4>
                <p className="text-sm text-gray-600">We&apos;ll send you a video call link before the meeting</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-[#0077B6] text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 font-semibold">
                3
              </div>
              <div>
                <h4 className="font-medium text-[#0B1E36]">Free Consultation</h4>
                <p className="text-sm text-gray-600">30-minute consultation at no cost to you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
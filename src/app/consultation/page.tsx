"use client";

import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { AVAILABLE_SERVICES } from "./types";

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
    preferredDate: "",
    preferredTime: "",
    service: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [draftSaved, setDraftSaved] = useState(false);
  const [showDraftNotification, setShowDraftNotification] = useState(false);
  
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{ fullName: string; email: string } | null>(null);
  
  // Time slots state
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("consultationDraft");
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData({
          fullName: parsedDraft.fullName || "",
          email: parsedDraft.email || "",
          message: parsedDraft.message || "",
          preferredDate: parsedDraft.preferredDate || "",
          preferredTime: parsedDraft.preferredTime || "",
          service: parsedDraft.service || "",
        });
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

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const saveDraft = () => {
    localStorage.setItem("consultationDraft", JSON.stringify(formData));
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  const clearDraft = () => {
    localStorage.removeItem("consultationDraft");
    setFormData({
      fullName: "",
      email: "",
      message: "",
      preferredDate: "",
      preferredTime: "",
      service: "",
    });
    setShowDraftNotification(false);
    setAvailableTimeSlots([]);
  };

  const checkAuthStatus = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
      const mockUserData = {
        fullName: "John Doe",
        email: "john@example.com"
      };
      setUserData(mockUserData);
      
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || mockUserData.fullName,
        email: prev.email || mockUserData.email
      }));
    }
  };

  const handleLoginClick = () => {
   
    window.location.href = "/sign-in";
  };

  const fetchAvailableTimeSlots = async (date: string) => {
    if (!date) {
      setAvailableTimeSlots([]);
      return;
    }

    setLoadingTimeSlots(true);
    try {
   
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const allTimeSlots = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"];
      const mockBookedSlots = ["10:00 AM", "02:00 PM"];
      const available = allTimeSlots.filter(slot => !mockBookedSlots.includes(slot));
      
      setAvailableTimeSlots(available);
    } catch (error) {
      console.error("Error fetching time slots:", error);
      setAvailableTimeSlots([]);
    } finally {
      setLoadingTimeSlots(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value || "" }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setFormData((prev) => ({ ...prev, preferredDate: date, preferredTime: "" }));
    
    // Fetch available time slots for the new date
    fetchAvailableTimeSlots(date);
    
    // Clear date error
    if (errors.preferredDate) {
      setErrors((prev) => ({ ...prev, preferredDate: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please tell us about your consultation needs";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Please provide more details (at least 10 characters)";
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
      newErrors.preferredTime = "Please select a time slot";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service you're interested in";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Prepare booking data for OTP verification
      const bookingData = {
        ...formData,
        userId: isLoggedIn ? userData?.email : null, // Include user ID if logged in
        bookingDate: new Date().toISOString(),
      };

      // Save booking data for verification
      localStorage.setItem("pendingBooking", JSON.stringify(bookingData));
      
      // Clear the draft as we're moving to verification
      clearDraft();
      
      // Redirect to verification page
      window.location.href = "/verification";
    } catch (error) {
      console.error("Booking error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    // Ensure users cannot book for today
    today.setDate(today.getDate() + 1);
    return today.toISOString().split("T")[0];
  };

  const handleBookAnother = () => {
    setSubmitStatus("idle");
    clearDraft();
  };

  

  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#F9FAFB] to-[#E6F0FA] px-4 sm:px-6 py-8 sm:py-20">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1E36] mb-4">
            Book a Consultation
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Schedule a free consultation with our expert team. No account required - just fill out the form below and complete email verification to confirm your booking.
            You&apos;ll receive an OTP for secure verification.
          </p>
        </div>

        {/* Draft Notification */}
        {showDraftNotification && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-blue-800 text-sm sm:text-base">We found a saved draft. Continue where you left off?</p>
              <button
                onClick={clearDraft}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium self-start sm:self-auto"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Draft Saved Toast */}
        {draftSaved && (
          <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-auto bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            <div className="text-center sm:text-left">Draft saved successfully!</div>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-8 border border-gray-100">
          {/* Login Suggestion */}
          {!isLoggedIn && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2 sm:mr-3 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <div>
                    <p className="text-blue-900 font-medium text-sm sm:text-base">Have an account?</p>
                    <p className="text-blue-700 text-xs sm:text-sm">Log in to auto-fill your information</p>
                  </div>
                </div>
                <button
                  onClick={handleLoginClick}
                  className="self-start sm:self-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                >
                  Log In
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#0B1E36] mb-3 sm:mb-4 flex items-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full border px-3 py-3 sm:px-4 sm:py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-base ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="John Doe"
                    required
                  />
                  {errors.fullName && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full border px-3 py-3 sm:px-4 sm:py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-base ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="john@example.com"
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#0B1E36] mb-3 sm:mb-4 flex items-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Service Selection
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  What service are you interested in? *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className={`w-full border px-3 py-3 sm:px-4 sm:py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-base ${
                    errors.service ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                >
                  <option value="">Select a service</option>
                  {AVAILABLE_SERVICES.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.description}
                    </option>
                  ))}
                </select>
                {errors.service && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.service}</p>}
              </div>
            </div>

            {/* Message */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#0B1E36] mb-3 sm:mb-4 flex items-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Message
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tell us about your consultation needs *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full border px-3 py-3 sm:px-4 sm:py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-base ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Please describe what you'd like to discuss during the consultation..."
                  maxLength={500}
                  required
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message ? (
                    <p className="text-red-500 text-xs sm:text-sm">{errors.message}</p>
                  ) : (
                    <p className="text-gray-400 text-xs sm:text-sm">At least 10 characters</p>
                  )}
                  <p className="text-xs text-gray-500">{formData.message.length}/500</p>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#0B1E36] mb-3 sm:mb-4 flex items-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleDateChange}
                    min={getMinDate()}
                    className={`w-full border px-3 py-3 sm:px-4 sm:py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-base ${
                      errors.preferredDate ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.preferredDate && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.preferredDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Available Time Slots *
                  </label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className={`w-full border px-3 py-3 sm:px-4 sm:py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-base ${
                      errors.preferredTime ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                    disabled={!formData.preferredDate || loadingTimeSlots}
                  >
                    <option value="">
                      {!formData.preferredDate ? "Select a date first" :
                       loadingTimeSlots ? "Loading..." : "Select a time slot"}
                    </option>
                    {availableTimeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {errors.preferredTime && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.preferredTime}</p>}
                </div>
              </div>
            </div>

            {/* OTP Verification Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <p className="text-blue-900 font-medium">Email Verification Required</p>
                  <p className="text-blue-700 text-sm">
                    After submitting, you&apos;ll receive a 6-digit OTP for verification. This ensures secure booking confirmation.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !formData.preferredDate || !formData.preferredTime || !formData.service}
                className={`w-full px-6 py-4 bg-[#0077B6] text-white rounded-lg font-semibold hover:bg-[#005F91] transition-all duration-300 transform hover:scale-105 flex items-center justify-center text-base ${
                  isSubmitting || !formData.preferredDate || !formData.preferredTime || !formData.service
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

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={saveDraft}
                  className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Save Draft
                </button>

                <button
                  type="button"
                  onClick={clearDraft}
                  className="flex-1 sm:flex-none px-6 py-3 text-red-600 hover:text-red-700 font-medium transition text-sm sm:text-base"
                >
                  Clear Form
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Loading indicator for time slots */}
        {loadingTimeSlots && (
          <div className="mt-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-blue-700 text-sm">Loading available time slots...</span>
            </div>
          </div>
        )}

        {/* What to Expect Section */}
        <div className="mt-6 sm:mt-8 bg-white shadow-lg rounded-2xl p-4 sm:p-8 border border-gray-100">
          <h3 className="text-lg sm:text-xl font-bold text-[#0B1E36] mb-4">What to Expect</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-[#0B1E36] mb-2">30-Minute Session</h4>
              <p className="text-sm text-gray-600">A comprehensive consultation to understand your needs</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-[#0B1E36] mb-2">Expert Advice</h4>
              <p className="text-sm text-gray-600">Get professional insights and recommendations</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-[#0B1E36] mb-2">Quick Start</h4>
              <p className="text-sm text-gray-600">Get started on your project immediately</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
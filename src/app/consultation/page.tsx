"use client";

import { useState, useEffect } from "react";
import BookingForm from "./components/BookingForm";
import SuccessPage from "./components/SuccessPage";
import DraftNotification from "./components/DraftNotification";
import DraftSavedToast from "./components/DraftSavedToast";
import WhatToExpect from "./components/WhatToExpect";
import { BookingFormData, FormErrors } from "./types";

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
    setShowDraftNotification(false);
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

  const handleBookAnother = () => {
    setSubmitStatus("idle");
    clearDraft();
  };

  if (submitStatus === "success") {
    return <SuccessPage formData={formData} onBookAnother={handleBookAnother} />;
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#F9FAFB] to-[#E6F0FA] px-6 py-20">
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
        {showDraftNotification && <DraftNotification onClearDraft={clearDraft} />}

        {/* Draft Saved Toast */}
        {draftSaved && <DraftSavedToast />}

        {/* Main Form */}
        <BookingForm
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onSaveDraft={saveDraft}
          onClearDraft={clearDraft}
          getMinDate={getMinDate}
        />

        {/* Info Section */}
        <WhatToExpect />
      </div>
    </section>
  );
}
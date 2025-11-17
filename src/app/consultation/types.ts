export interface BookingFormData {
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

export interface FormErrors {
  [key: string]: string;
}

export const CONSULTATION_TYPES = [
  { value: "web-development", label: "Web Development" },
  { value: "mobile-app", label: "Mobile App Development" },
  { value: "data-analysis", label: "Data Analysis" },
  { value: "automation", label: "Automation Services" },
  { value: "ui-ux-design", label: "UI/UX Design" },
  { value: "e-commerce", label: "E-commerce Solutions" },
  { value: "api-development", label: "API Development" },
  { value: "general-consultation", label: "General Consultation" },
];

export const BUDGET_RANGES = [
  { value: "under-100k", label: "Under ₦100,000" },
  { value: "100k-250k", label: "₦100,000 - ₦250,000" },
  { value: "250k-500k", label: "₦250,000 - ₦500,000" },
  { value: "500k-1m", label: "₦500,000 - ₦1,000,000" },
  { value: "over-1m", label: "Over ₦1,000,000" },
  { value: "not-sure", label: "Not Sure Yet" },
];

export const URGENCY_LEVELS = [
  { value: "immediate", label: "Immediate (Within 1 week)" },
  { value: "soon", label: "Soon (Within 2-4 weeks)" },
  { value: "flexible", label: "Flexible (1-3 months)" },
  { value: "planning", label: "Just Planning" },
];

export const TIME_SLOTS = [
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
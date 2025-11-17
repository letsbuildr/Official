export interface BookingFormData {
  fullName: string;
  email: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
}

export interface FormErrors {
  [key: string]: string;
}

// Time slots for consultation (8am to 3pm, excluding 12pm)
export const TIME_SLOTS = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
];
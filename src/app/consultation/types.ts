export interface BookingFormData {
  fullName: string;
  email: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
  service: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
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

// Available services for consultation
export const AVAILABLE_SERVICES: Service[] = [
  {
    id: "web-development",
    name: "Web Development",
    description: "Website design, development, and deployment",
    category: "Development"
  },
  {
    id: "automation-services",
    name: "Automation Services",
    description: "Business process automation and integration",
    category: "Automation"
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    description: "Business analytics and data insights",
    category: "Analytics"
  },
  {
    id: "mobile-development",
    name: "Mobile App Development",
    description: "iOS and Android application development",
    category: "Development"
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Design",
    description: "User interface and user experience design",
    category: "Design"
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    description: "SEO, social media, and online marketing strategy",
    category: "Marketing"
  },
  {
    id: "general-consultation",
    name: "General Consultation",
    description: "General tech consultation and project planning",
    category: "Consultation"
  }
];
import React from "react";

interface FormSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export default function FormSection({ title, icon, children }: FormSectionProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-[#0B1E36] mb-4 flex items-center">
        <span className="mr-2 text-[#0077B6]">{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}
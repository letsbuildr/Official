import React from "react";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
  min?: string;
}

export default function FormInput({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
  icon,
  min,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1 block">
        {icon && <span className="inline-block mr-1">{icon}</span>}
        {label} {required && "*"}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        className={`w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-gray-900 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
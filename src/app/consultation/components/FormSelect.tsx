import React from "react";

interface FormSelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
  icon?: React.ReactNode;
}

export default function FormSelect({
  id,
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  options,
  placeholder = "Select an option",
  icon,
}: FormSelectProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1 block">
        {icon && <span className="inline-block mr-1">{icon}</span>}
        {label} {required && "*"}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-gray-900 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
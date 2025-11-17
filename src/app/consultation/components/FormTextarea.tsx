import React from "react";

interface FormTextareaProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  showCharCount?: boolean;
  maxLength?: number;
}

export default function FormTextarea({
  id,
  name,
  label,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  rows = 4,
  showCharCount = false,
  maxLength,
}: FormTextareaProps) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1 block">
        {label} {required && "*"}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        maxLength={maxLength}
        className={`w-full border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#0077B6] text-gray-900 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {showCharCount && maxLength && (
        <p className="mt-1 text-xs text-gray-500">
          {value.length}/{maxLength} characters
        </p>
      )}
    </div>
  );
}
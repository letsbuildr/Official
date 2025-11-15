"use client";

import { Receipt, User, CreditCard } from "lucide-react";

interface DetailSectionProps {
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  icon?: React.ReactNode;
  defaultIcon?: React.ReactNode;
}

export default function DetailSection({ 
  title, 
  children, 
  isExpanded, 
  onToggle, 
  icon,
  defaultIcon = <Receipt className="w-5 h-5" />
}: DetailSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon || defaultIcon}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-100 py-3">
          {children}
        </div>
      )}
    </div>
  );
}
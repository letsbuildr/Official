"use client";

import { useState } from "react";

interface DetailRowProps {
  label: string;
  value: string;
  copyable?: boolean;
  fullWidth?: boolean;
}

export default function DetailRow({ label, value, copyable, fullWidth }: DetailRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (copyable) {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`flex items-start gap-3 ${fullWidth ? 'flex-col sm:flex-row' : ''}`}>
      <div className="w-24 sm:w-32 text-sm text-gray-600 flex-shrink-0 mt-0.5">
        {label}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-900 break-words">{value}</p>
          {copyable && (
            <button
              onClick={handleCopy}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              aria-label={`Copy ${label}`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          )}
          {copied && (
            <span className="text-xs text-green-600">Copied!</span>
          )}
        </div>
      </div>
    </div>
  );
}
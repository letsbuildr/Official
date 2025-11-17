"use client";

import { ArrowLeft, AlertCircle } from "lucide-react";

interface TransactionNotFoundProps {
  onBack: () => void;
}

export default function TransactionNotFound({ onBack }: TransactionNotFoundProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Transaction Not Found</h2>
        <p className="text-gray-600 mb-6 max-w-sm">
          The transaction you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0077B6] text-white rounded-lg hover:bg-[#005F91] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
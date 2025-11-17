"use client";

import { Download, Share } from "lucide-react";

interface TransactionActionButtonsProps {
  onDownload: () => void;
  onShare: () => void;
}

export default function TransactionActionButtons({
  onDownload,
  onShare,
}: TransactionActionButtonsProps) {
  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-3">
      <button
        onClick={onDownload}
        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0077B6] text-white rounded-lg hover:bg-[#005F91] transition-colors"
      >
        <Download className="w-4 h-4" />
        Download Receipt
      </button>
      <button
        onClick={onShare}
        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Share className="w-4 h-4" />
        Share Details
      </button>
    </div>
  );
}
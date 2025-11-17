"use client";

import { ArrowLeft, Share, Download } from "lucide-react";
import Link from "next/link";

interface TransactionDetailHeaderProps {
  transactionId: string;
  date: string;
  onShare: () => void;
  onDownload: () => void;
}

export default function TransactionDetailHeader({
  transactionId,
  date,
  onShare,
  onDownload,
}: TransactionDetailHeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10 mt-13">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                Transaction #{transactionId}
              </h1>
              <p className="text-sm text-gray-600">{date}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onShare}
              className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Share transaction"
            >
              <Share className="w-5 h-5" />
            </button>
            <button
              onClick={onDownload}
              className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Download receipt"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
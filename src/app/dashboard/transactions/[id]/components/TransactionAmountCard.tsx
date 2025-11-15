"use client";

import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface TransactionAmountCardProps {
  amount: number;
  status: "completed" | "pending" | "failed";
  project: string;
}

export default function TransactionAmountCard({
  amount,
  status,
  project,
}: TransactionAmountCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'failed':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
      <div className="bg-linear-to-r from-[#0077B6] to-[#0B1E36] px-6 py-8 text-white text-center">
        <p className="text-blue-100 text-sm mb-2">Amount Paid</p>
        <p className="text-3xl sm:text-4xl font-bold mb-3">
          {formatCurrency(amount)}
        </p>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(status)} bg-white/10 border-white/20 text-white`}>
          {getStatusIcon(status)}
          <span className="capitalize">{status}</span>
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Project</span>
          <span className="font-medium text-gray-900">{project}</span>
        </div>
      </div>
    </div>
  );
}
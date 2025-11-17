"use client";

import { CreditCard, Clock, TrendingUp } from "lucide-react";

interface QuickStatsProps {
  totalSpent: number;
  pendingAmount: number;
  totalProjects: number;
}

export default function QuickStats({ totalSpent, pendingAmount, totalProjects }: QuickStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Card 1 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 
                      transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Spent</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{formatCurrency(totalSpent)}</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center animate-fadeIn">
            <CreditCard className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Across all completed projects</p>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 
                      transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Pending Payments</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{formatCurrency(pendingAmount)}</p>
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center animate-fadeIn">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Awaiting payment completion</p>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 
                      transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Projects</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{totalProjects}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center animate-fadeIn">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Projects in progress and completed</p>
      </div>
    </div>
  );
}

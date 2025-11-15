"use client";

import { User, Wallet, TrendingUp } from "lucide-react";

interface WelcomeSectionProps {
  user: {
    name: string;
    joinDate: string;
  };
  totalSpent: number;
  activeProjects: number;
}

export default function WelcomeSection({ user, totalSpent, activeProjects }: WelcomeSectionProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gradient-to-r from-[#0077B6] to-[#0B1E36] rounded-2xl p-6 sm:p-8 mb-8 text-white">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

        {/* LEFT SIDE */}
        <div className="w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Welcome, {user.name}!
          </h2>

          <p className="text-blue-100 text-sm sm:text-base md:text-lg mb-4">
            Member since {formatDate(user.joinDate)}. Let&apos;s check on your projects and payments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 text-xs sm:text-sm md:text-base">

            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Total Spent: {formatCurrency(totalSpent)}</span>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Active Projects: {activeProjects}</span>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE ICON – ONLY SHOW ON MD+ */}
        <div className="hidden md:flex">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <User className="w-10 h-10 md:w-16 md:h-16 text-white/80" />
          </div>
        </div>

      </div>
    </div>
  );
}

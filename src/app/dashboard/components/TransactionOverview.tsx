"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CreditCard,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  ChevronRight,
} from "lucide-react";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  project: string;
}

interface TransactionOverviewProps {
  transactions: Transaction[];
}

export default function TransactionOverview({ transactions }: TransactionOverviewProps) {
  const router = useRouter();

  // Get the 5 most recent transactions
  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [transactions]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getStatusIcon = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-3 h-3 text-green-500" />;
      case "pending":
        return <Clock className="w-3 h-3 text-yellow-500" />;
      case "failed":
        return <AlertCircle className="w-3 h-3 text-red-500" />;
      default:
        return <Clock className="w-3 h-3 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const handleViewTransaction = (transactionId: number) => {
    router.push(`/dashboard/transactions/${transactionId}`);
  };

  const handleViewAllTransactions = () => {
    router.push("/dashboard/transactions/all");
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Transactions
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            Your latest payment and project transactions
          </p>
        </div>

        <div className="p-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-base font-medium text-gray-900 mb-2">
              No transactions yet
            </h4>
            <p className="text-gray-600 text-sm mb-6">
              When you make payments for our services, they will appear here.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center px-4 py-2 bg-[#0077B6] text-white text-sm rounded-lg hover:bg-[#005F91] transition-colors"
            >
              Browse Our Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Transactions
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Your latest {Math.min(5, transactions.length)} of {transactions.length} payment and project transactions
            </p>
          </div>
          {transactions.length > 5 && (
            <button
              onClick={handleViewAllTransactions}
              className="flex items-center gap-2 text-[#0077B6] hover:text-[#005F91] transition-colors text-sm font-medium"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-gray-100">
        {recentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => handleViewTransaction(transaction.id)}
          >
            <div className="flex items-center justify-between">
              {/* Left */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm truncate">
                    {transaction.type}
                  </h4>
                  <p className="text-xs text-gray-600 truncate">{transaction.project}</p>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-[11px] text-gray-500">
                      {formatDate(transaction.date)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <p className="font-semibold text-gray-900 text-sm">
                    {formatCurrency(transaction.amount)}
                  </p>
                  
                  <div className="flex items-center gap-1">
                    {getStatusIcon(transaction.status)}
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium capitalize ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewTransaction(transaction.id);
                  }}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  aria-label={`View transaction ${transaction.id} details`}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      {transactions.length > 5 && (
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <button
            onClick={handleViewAllTransactions}
            className="w-full flex items-center justify-center gap-2 py-2 text-[#0077B6] hover:text-[#005F91] transition-colors text-sm font-medium"
          >
            <span>View All {transactions.length} Transactions</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Empty State for recent transactions */}
      {recentTransactions.length === 0 && transactions.length > 0 && (
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CreditCard className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600 text-sm">
            No recent transactions to display
          </p>
        </div>
      )}
    </div>
  );
}
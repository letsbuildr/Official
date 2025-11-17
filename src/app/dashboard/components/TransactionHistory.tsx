"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Search,
  Eye,
  Download,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Table,
  FileJson,
} from "lucide-react";
import { downloadAsJSON, downloadAsCSV, downloadAsPDF } from "../utils/transactionUtils";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  project: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [downloadMenuOpen, setDownloadMenuOpen] = useState<boolean>(false);
  const [selectedTransactionForDownload, setSelectedTransactionForDownload] = useState<Transaction | null>(null);

  const handleViewTransaction = useCallback((transactionId: number): void => {
    router.push(`/dashboard/transactions/${transactionId}`);
  }, [router]);

  const handleDownloadClick = useCallback((transaction: Transaction, event: React.MouseEvent): void => {
    event.stopPropagation();
    setSelectedTransactionForDownload(transaction);
    setDownloadMenuOpen(true);
  }, []);

  const handleDownloadJSON = useCallback((transaction: Transaction): void => {
    downloadAsJSON(transaction);
    setDownloadMenuOpen(false);
    setSelectedTransactionForDownload(null);
  }, []);

  const handleDownloadCSV = useCallback((transaction: Transaction): void => {
    downloadAsCSV(transaction);
    setDownloadMenuOpen(false);
    setSelectedTransactionForDownload(null);
  }, []);

  const handleDownloadPDF = useCallback((transaction: Transaction): void => {
    downloadAsPDF(transaction);
    setDownloadMenuOpen(false);
    setSelectedTransactionForDownload(null);
  }, []);

  const downloadAllAsCSV = useCallback((data: Transaction[]): void => {
    const headers = ['Transaction ID', 'Type', 'Amount (NGN)', 'Status', 'Date', 'Project'];
    const rows = data.map(transaction => [
      transaction.id,
      transaction.type,
      transaction.amount,
      transaction.status,
      new Date(transaction.date).toLocaleDateString(),
      transaction.project
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(field => `"${field}"`).join(','))
    ].join('\n');
    
    const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `all-transactions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const filterTransactions = useCallback((
    transactions: Transaction[],
    searchTerm: string,
    filterStatus: string
  ): Transaction[] => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return transactions.filter((transaction: Transaction): boolean => {
      const matchesSearchTerm =
        transaction.type.toLowerCase().includes(lowerCaseSearchTerm) ||
        transaction.project.toLowerCase().includes(lowerCaseSearchTerm);
      const matchesStatus =
        filterStatus === "all" || transaction.status === filterStatus;
      return matchesSearchTerm && matchesStatus;
    });
  }, []);

  const filteredTransactions = useMemo((): Transaction[] => {
    return filterTransactions(transactions, searchTerm, filterStatus);
  }, [transactions, searchTerm, filterStatus, filterTransactions]);

  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  }, []);

  const formatDate = useCallback((dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, []);

  const getStatusIcon = useCallback((status: Transaction["status"]): React.ReactElement => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500" />;
      case "failed":
        return <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />;
      default:
        return <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />;
    }
  }, []);

  const getStatusColor = useCallback((status: Transaction["status"]): string => {
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
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              Transaction History
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              View and manage all your payments and project transactions
            </p>
          </div>

          {/* Search + Filter + Bulk Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

            {/* Search */}
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full sm:w-auto pl-10 pr-4 py-2 text-sm sm:text-base text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter */}
            <select
              className="px-4 py-2 text-sm sm:text-base border border-gray-200 rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>

            {/* Bulk Actions */}
            {filteredTransactions.length > 0 && (
              <button
                onClick={() => downloadAllAsCSV(filteredTransactions)}
                className="px-4 py-2 text-sm bg-[#0077B6] text-white rounded-lg hover:bg-[#005F91] transition-colors flex items-center gap-2"
              >
                <Table className="w-4 h-4" />
                Export All CSV
              </button>
            )}

          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-6">
        {filteredTransactions.length === 0 ? (
          /* Empty State */
          <div className="text-center py-10">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
            </div>

            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
              {searchTerm || filterStatus !== "all"
                ? "No matching transactions"
                : "No transactions yet"}
            </h3>

            <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-xs mx-auto">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "When you make payments for our services, they will appear here."}
            </p>

            {!searchTerm && filterStatus === "all" && (
              <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-[#0077B6] text-white text-sm sm:text-base rounded-lg hover:bg-[#005F91] transition-colors">
                Browse Our Services
              </button>
            )}
          </div>
        ) : (
          /* Transaction List */
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                      {transaction.type}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">{transaction.project}</p>

                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-[10px] sm:text-xs text-gray-500">
                        {formatDate(transaction.date)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4 justify-between md:justify-end w-full md:w-auto">

                  <div className="text-right">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                      {formatCurrency(transaction.amount)}
                    </p>

                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {getStatusIcon(transaction.status)}
                      <span className="capitalize">{transaction.status}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleViewTransaction(transaction.id)}
                      className="p-2 sm:p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                      aria-label={`View transaction ${transaction.id} details`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <div className="relative">
                      <button 
                        onClick={(e) => handleDownloadClick(transaction, e)}
                        className="p-2 sm:p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                        aria-label={`Download transaction ${transaction.id}`}
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Download Menu Dropdown */}
      {downloadMenuOpen && selectedTransactionForDownload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setDownloadMenuOpen(false)}
          ></div>
          
          {/* Menu */}
          <div className="relative bg-white rounded-lg shadow-lg p-4 w-80 max-w-[calc(100vw-2rem)]">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">
              Download Transaction #{selectedTransactionForDownload.id}
            </h4>
            
            <div className="space-y-2">
              <button
                onClick={() => handleDownloadJSON(selectedTransactionForDownload)}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <FileJson className="w-4 h-4 text-blue-500" />
                <div>
                  <div className="font-medium">JSON File</div>
                  <div className="text-xs text-gray-500">Structured data format</div>
                </div>
              </button>
              
              <button
                onClick={() => handleDownloadCSV(selectedTransactionForDownload)}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <Table className="w-4 h-4 text-green-500" />
                <div>
                  <div className="font-medium">CSV File</div>
                  <div className="text-xs text-gray-500">Spreadsheet compatible</div>
                </div>
              </button>
              
              <button
                onClick={() => handleDownloadPDF(selectedTransactionForDownload)}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <FileText className="w-4 h-4 text-red-500" />
                <div>
                  <div className="font-medium">PDF Receipt</div>
                  <div className="text-xs text-gray-500">Formatted receipt document</div>
                </div>
              </button>
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-200">
              <button
                onClick={() => {
                  setDownloadMenuOpen(false);
                  setSelectedTransactionForDownload(null);
                }}
                className="w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Search,
  Eye,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Table,
  FileJson,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  CheckSquare,
  Square,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { downloadAsJSON, downloadAsCSV, downloadAsPDF } from "../../utils/transactionUtils";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  project: string;
}

interface DateRange {
  start: string;
  end: string;
}

export default function TransactionHistoryPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterProject, setFilterProject] = useState<string>("all");
  const [dateRange, setDateRange] = useState<DateRange>({ start: "", end: "" });
  const [selectedTransactions, setSelectedTransactions] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [sortField, setSortField] = useState<keyof Transaction>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState<boolean>(false);
  const [selectedTransactionForDownload, setSelectedTransactionForDownload] = useState<Transaction | null>(null);

  // Mock transaction data - in real app, this would come from props or API
  const [transactions] = useState<Transaction[]>([
    {
      id: 1,
      type: "Web Development Service",
      amount: 350000,
      status: "completed",
      date: "2024-11-10",
      project: "E-commerce Platform"
    },
    {
      id: 2,
      type: "Data Analysis Service", 
      amount: 150000,
      status: "pending",
      date: "2024-11-12",
      project: "Business Analytics"
    },
    {
      id: 3,
      type: "Automation Setup",
      amount: 200000,
      status: "completed", 
      date: "2024-11-08",
      project: "Social Media Automation"
    },
    {
      id: 4,
      type: "Mobile App Development",
      amount: 500000,
      status: "pending",
      date: "2024-11-15",
      project: "Fitness App"
    },
    {
      id: 5,
      type: "UI/UX Design",
      amount: 120000,
      status: "completed",
      date: "2024-11-05",
      project: "Banking App Redesign"
    },
    {
      id: 6,
      type: "E-commerce Setup",
      amount: 300000,
      status: "failed",
      date: "2024-11-03",
      project: "Bookstore Online"
    },
    {
      id: 7,
      type: "API Development",
      amount: 250000,
      status: "completed",
      date: "2024-11-07",
      project: "Payment Gateway"
    },
    {
      id: 8,
      type: "Consultation",
      amount: 80000,
      status: "pending",
      date: "2024-11-14",
      project: "Tech Strategy"
    }
  ]);

  const uniqueTypes = useMemo(() => 
    Array.from(new Set(transactions.map(t => t.type))), [transactions]);
  
  const uniqueProjects = useMemo(() => 
    Array.from(new Set(transactions.map(t => t.project))), [transactions]);

  // Filter and sort transactions first
  const filteredAndSortedTransactions = useMemo((): Transaction[] => {
    let filtered = transactions;

    // Search filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(transaction =>
        transaction.type.toLowerCase().includes(lowerCaseSearchTerm) ||
        transaction.project.toLowerCase().includes(lowerCaseSearchTerm) ||
        transaction.status.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(transaction => transaction.status === filterStatus);
    }

    // Type filter
    if (filterType !== "all") {
      filtered = filtered.filter(transaction => transaction.type === filterType);
    }

    // Project filter
    if (filterProject !== "all") {
      filtered = filtered.filter(transaction => transaction.project === filterProject);
    }

    // Date range filter
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "amount") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (sortField === "date") {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      } else {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [transactions, searchTerm, filterStatus, filterType, filterProject, dateRange, sortField, sortDirection]);

  const paginatedTransactions = useMemo((): Transaction[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedTransactions, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedTransactions.length / itemsPerPage);

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

  const handleSort = useCallback((field: keyof Transaction): void => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  }, [sortField, sortDirection]);

  const toggleTransactionSelection = useCallback((transactionId: number): void => {
    setSelectedTransactions(prev => 
      prev.includes(transactionId) 
        ? prev.filter(id => id !== transactionId)
        : [...prev, transactionId]
    );
  }, []);

  const toggleSelectAll = useCallback((): void => {
    if (selectedTransactions.length === paginatedTransactions.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(paginatedTransactions.map(t => t.id));
    }
  }, [selectedTransactions.length, paginatedTransactions]);

  const clearFilters = useCallback((): void => {
    setSearchTerm("");
    setFilterStatus("all");
    setFilterType("all");
    setFilterProject("all");
    setDateRange({ start: "", end: "" });
    setCurrentPage(1);
  }, []);

  const downloadFilteredAsCSV = useCallback((data: Transaction[]): void => {
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
    link.download = `filtered-transactions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const deleteSelectedTransactions = useCallback((): void => {
    // In real app, this would call an API
    console.log('Deleting transactions:', selectedTransactions);
    setSelectedTransactions([]);
  }, [selectedTransactions]);

  const markSelectedAsCompleted = useCallback((): void => {
    // In real app, this would call an API
    console.log('Marking as completed:', selectedTransactions);
    setSelectedTransactions([]);
  }, [selectedTransactions]);

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
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 mt-13">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="h-6 border-l border-gray-300"></div>
            <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-6">
            {/* Search and Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search transactions, projects, or status..."
                    className="w-full pl-10 pr-4 py-3 text-gray-900 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
                {(filterStatus !== "all" || filterType !== "all" || filterProject !== "all" || dateRange.start || dateRange.end) && (
                  <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">!</span>
                )}
              </button>

              {/* Bulk Actions */}
              {selectedTransactions.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => downloadFilteredAsCSV(transactions.filter(t => selectedTransactions.includes(t.id)))}
                    className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export Selected ({selectedTransactions.length})
                  </button>
                  <button
                    onClick={markSelectedAsCompleted}
                    className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark Completed
                  </button>
                  <button
                    onClick={deleteSelectedTransactions}
                    className="flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {/* Status Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="all">All Types</option>
                      {uniqueTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Project Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={filterProject}
                      onChange={(e) => setFilterProject(e.target.value)}
                    >
                      <option value="all">All Projects</option>
                      {uniqueProjects.map(project => (
                        <option key={project} value={project}>{project}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={dateRange.start}
                        onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      />
                      <input
                        type="date"
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={dateRange.end}
                        onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={clearFilters}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Clear all filters
                  </button>
                  <div className="text-sm text-gray-600">
                    {filteredAndSortedTransactions.length} of {transactions.length} transactions
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Transactions ({filteredAndSortedTransactions.length})
              </h2>
              <div className="flex items-center gap-4">
                {/* Items per page */}
                <select
                  className="px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={25}>25 per page</option>
                  <option value={50}>50 per page</option>
                </select>

                {/* Export filtered results */}
                {filteredAndSortedTransactions.length > 0 && (
                  <button
                    onClick={() => downloadFilteredAsCSV(filteredAndSortedTransactions)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export Results
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Transaction Table */}
          <div className="overflow-x-auto">
            {filteredAndSortedTransactions.length === 0 ? (
              /* Empty State */
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || filterStatus !== "all" || filterType !== "all" || filterProject !== "all" || dateRange.start || dateRange.end
                    ? "Try adjusting your search or filter criteria"
                    : "When you make payments for our services, they will appear here."}
                </p>
                {searchTerm || filterStatus !== "all" || filterType !== "all" || filterProject !== "all" || dateRange.start || dateRange.end ? (
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear all filters
                  </button>
                ) : null}
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <button
                        onClick={toggleSelectAll}
                        className="flex items-center gap-2 text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {selectedTransactions.length === paginatedTransactions.length && paginatedTransactions.length > 0 ? (
                          <CheckSquare className="w-4 h-4" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </th>
                    {[
                      { key: "type", label: "Type" },
                      { key: "project", label: "Project" },
                      { key: "amount", label: "Amount" },
                      { key: "status", label: "Status" },
                      { key: "date", label: "Date" }
                    ].map(({ key, label }) => (
                      <th key={key} className="px-6 py-3 text-left">
                        <button
                          onClick={() => handleSort(key as keyof Transaction)}
                          className="flex items-center gap-1 text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          <span>{label}</span>
                          {sortField === key && (
                            sortDirection === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
                          )}
                        </button>
                      </th>
                    ))}
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className={`hover:bg-gray-50 transition-colors ${
                        selectedTransactions.includes(transaction.id) ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleTransactionSelection(transaction.id)}
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          {selectedTransactions.includes(transaction.id) ? (
                            <CheckSquare className="w-4 h-4" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{transaction.type}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{transaction.project}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatCurrency(transaction.amount)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(transaction.status)}
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{formatDate(transaction.date)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewTransaction(transaction.id)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <div className="relative">
                            <button
                              onClick={(e) => handleDownloadClick(transaction, e)}
                              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                              title="Download"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedTransactions.length)} of {filteredAndSortedTransactions.length} results
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNumber;
                      if (totalPages <= 5) {
                        pageNumber = i + 1;
                      } else if (currentPage <= 3) {
                        pageNumber = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + i;
                      } else {
                        pageNumber = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                            currentPage === pageNumber
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Download Menu Dropdown */}
      {downloadMenuOpen && selectedTransactionForDownload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setDownloadMenuOpen(false)}
          ></div>
          
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
"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import TransactionDetailHeader from "./components/TransactionDetailHeader";
import TransactionAmountCard from "./components/TransactionAmountCard";
import DetailSection from "./components/DetailSection";
import DetailRow from "./components/DetailRow";
import EnhancedTransactionActionButtons from "./components/EnhancedTransactionActionButtons";
import LoadingSkeleton from "./components/LoadingSkeleton";
import TransactionNotFound from "./components/TransactionNotFound";
import { 
  Receipt, 
  User, 
  CreditCard, 
  ArrowLeft,
  Tag,
  Clock,
  Building,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  Share2
} from "lucide-react";
import { downloadAsPDF, shareViaLink } from "../../../dashboard/utils/transactionUtils";

// Enhanced Transaction interface with full metadata support
interface EnhancedTransactionDetails {
  id: number;
  type: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  project: string;
  
  // Enhanced categorization
  category: string;
  subcategory?: string;
  tags: string[];
  metadata?: Record<string, string | number | boolean | string[] | null>;
  
  // Project associations
  projectAssociation?: {
    id: string;
    name: string;
    description: string;
    client: string;
    timeline: {
      start: string;
      end: string;
      phase: string;
    };
    deliverables: string[];
  };
  
  // Enhanced merchant information
  merchant: {
    name: string;
    email: string;
    phone: string;
    address?: {
      street: string;
      city: string;
      state: string;
      country: string;
    };
    taxId?: string;
    website?: string;
  };
  
  // Enhanced payment method
  paymentMethod: {
    type: string;
    last4: string;
    brand: string;
    bankName?: string;
    country?: string;
  };
  
  // Receipt and documentation
  receiptRef: string;
  description: string;
  invoiceRef?: string;
  fees: number;
  netAmount: number;
  currency: string;
  
  // Enhanced transaction tracking
  history: {
    status: string;
    timestamp: string;
    description: string;
    user?: string;
  }[];
  
  // Related transactions
  relatedTransactions?: {
    id: number;
    type: string;
    amount: number;
    status: string;
    date: string;
  }[];
}

// Filter and search context for enhanced functionality
interface TransactionContext {
  searchTerm?: string;
  filterStatus?: string;
  filterCategory?: string;
  filterProject?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  sortField?: string;
  sortDirection?: "asc" | "desc";
  currentPage?: number;
  itemsPerPage?: number;
}

export default function TransactionDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [transaction, setTransaction] = useState<EnhancedTransactionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [context, setContext] = useState<TransactionContext | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    details: true,
    merchant: true,
    payment: true,
    project: false,
    history: false,
    related: false,
    receipt: false
  });

  const transactionId = params.id;

  // Enhanced mock data with full metadata
  const enhancedMockTransaction: EnhancedTransactionDetails = {
    id: Number(transactionId),
    type: "Web Development Service",
    amount: 350000,
    status: "completed",
    date: "2024-11-10T14:30:00Z",
    project: "E-commerce Platform",
    
    // Enhanced categorization
    category: "Development",
    subcategory: "Full-Stack Web Development",
    tags: ["ecommerce", "full-stack", "react", "nodejs", "mongodb", "payment-integration"],
    metadata: {
      priority: "high",
      complexity: "advanced",
      estimatedHours: 120,
      actualHours: 140,
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      version: "1.2.0",
      platform: "web"
    },
    
    // Project associations
    projectAssociation: {
      id: "PRJ-2024-001",
      name: "E-commerce Platform Development",
      description: "Full-stack e-commerce solution with payment processing, inventory management, and admin dashboard",
      client: "TechStart Solutions Ltd",
      timeline: {
        start: "2024-10-01",
        end: "2024-11-30",
        phase: "Completed"
      },
      deliverables: [
        "Frontend React Application",
        "Node.js Backend API",
        "MongoDB Database Schema",
        "Payment Integration (Stripe)",
        "Admin Dashboard",
        "User Authentication System",
        "Inventory Management",
        "Order Processing System"
      ]
    },
    
    // Enhanced merchant information
    merchant: {
      name: "Bomcel Digital Agency",
      email: "billing@bomcel.com",
      phone: "+234 (0) 707 009 4167",
      address: {
        street: "123 Digital Avenue, Tech District",
        city: "Lagos",
        state: "Lagos State",
        country: "Nigeria"
      },
      taxId: "NG-TAX-123456789",
      website: "https://bomcel.com"
    },
    
    // Enhanced payment method
    paymentMethod: {
      type: "Card",
      last4: "4242",
      brand: "Visa",
      bankName: "First Bank of Nigeria",
      country: "Nigeria"
    },
    
    // Receipt and documentation
    receiptRef: "RCP-BDC-2024-11-10-001",
    invoiceRef: "INV-2024-001",
    description: "Full-stack web development project including frontend, backend, and database integration for e-commerce platform",
    fees: 5000,
    netAmount: 345000,
    currency: "NGN",
    
    // Enhanced transaction tracking
    history: [
      {
        status: "initiated",
        timestamp: "2024-10-15T09:00:00Z",
        description: "Transaction initiated",
        user: "System"
      },
      {
        status: "pending",
        timestamp: "2024-10-15T09:05:00Z", 
        description: "Payment processing started",
        user: "System"
      },
      {
        status: "completed",
        timestamp: "2024-10-15T09:07:00Z",
        description: "Payment completed successfully",
        user: "System"
      },
      {
        status: "delivered",
        timestamp: "2024-11-10T14:30:00Z",
        description: "Project deliverables completed",
        user: "John Doe"
      }
    ],
    
    // Related transactions
    relatedTransactions: [
      {
        id: 2,
        type: "Consultation",
        amount: 50000,
        status: "completed",
        date: "2024-09-28T10:00:00Z"
      },
      {
        id: 3,
        type: "UI/UX Design",
        amount: 150000,
        status: "completed", 
        date: "2024-10-05T14:00:00Z"
      }
    ]
  };

  useEffect(() => {
    // Simulate API call to fetch transaction details with context
    const fetchTransaction = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Parse URL parameters for context
      const urlParams = new URLSearchParams(window.location.search);
      const contextFromUrl: TransactionContext = {
        searchTerm: urlParams.get('search') || undefined,
        filterStatus: urlParams.get('status') || undefined,
        filterCategory: urlParams.get('category') || undefined,
        filterProject: urlParams.get('project') || undefined,
        dateRange: urlParams.get('dateStart') && urlParams.get('dateEnd') ? {
          start: urlParams.get('dateStart')!,
          end: urlParams.get('dateEnd')!
        } : undefined,
        sortField: urlParams.get('sortField') || undefined,
        sortDirection: (urlParams.get('sortDirection') as "asc" | "desc") || undefined,
        currentPage: Number(urlParams.get('page')) || 1,
        itemsPerPage: Number(urlParams.get('limit')) || 10
      };
      
      setContext(contextFromUrl);
      setTransaction(enhancedMockTransaction);
      setLoading(false);
    };

    if (transactionId) {
      fetchTransaction();
    }
  }, [transactionId]);

  // Enhanced navigation helpers
  const navigationContext = useMemo(() => {
    if (!context) return null;
    
    return {
      backToList: `/dashboard/transactions/all${Object.entries(context)
        .filter(([_, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => {
          if (key === 'dateRange') {
            return `${encodeURIComponent('dateStart')}=${encodeURIComponent(value.start!)}&${encodeURIComponent('dateEnd')}=${encodeURIComponent(value.end!)}`;
          }
          return `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`;
        })
        .join('&') ? '?' + Object.entries(context)
        .filter(([_, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => {
          if (key === 'dateRange') {
            return `${encodeURIComponent('dateStart')}=${encodeURIComponent(value.start!)}&${encodeURIComponent('dateEnd')}=${encodeURIComponent(value.end!)}`;
          }
          return `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`;
        })
        .join('&') : ''}`,
      previousTransaction: `/dashboard/transactions/${Number(transactionId) - 1}`,
      nextTransaction: `/dashboard/transactions/${Number(transactionId) + 1}`
    };
  }, [context, transactionId]);

  const formatCurrency = (amount: number, currency = "NGN") => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      relative: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
      })
    };
  };

  const getStatusIcon = (status: string) => {
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
  };

  const getStatusColor = (status: string) => {
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

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleDownloadReceipt = () => {
    if (transaction) {
      const transactionForDownload = {
        id: transaction.id,
        project: transaction.project,
        type: transaction.type,
        amount: transaction.amount,
        status: transaction.status,
        date: transaction.date
      };
      downloadAsPDF(transactionForDownload);
    }
  };

  const handleShare = async () => {
    if (transaction) {
      const shareTransaction = {
        id: transaction.id,
        project: transaction.project,
        type: transaction.type,
        amount: transaction.amount,
        status: transaction.status,
        date: transaction.date
      };
      
      try {
        const usedNativeShare = await shareViaLink(shareTransaction);
        if (!usedNativeShare) {
          await navigator.clipboard.writeText(window.location.href);
        }
      } catch (error) {
        console.error('Share failed:', error);
        try {
          await navigator.clipboard.writeText(window.location.href);
        } catch (clipboardError) {
          console.error('Clipboard access failed:', clipboardError);
        }
      }
    }
  };

  const handleBackToList = () => {
    if (navigationContext?.backToList) {
      router.push(navigationContext.backToList);
    } else {
      router.push('/dashboard/transactions/all');
    }
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!transaction) {
    return <TransactionNotFound onBack={handleBackToList} />;
  }

  const { date, time, relative } = formatDateTime(transaction.date);

  return (
    <>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <TransactionDetailHeader
              transactionId={transaction.id.toString()}
              date={date}
              onShare={handleShare}
              onDownload={handleDownloadReceipt}
            />

            <TransactionAmountCard
              amount={transaction.amount}
              status={transaction.status}
              project={transaction.project}
            />

            <div className="space-y-4">
              {/* Enhanced Transaction Details Section */}
              <DetailSection
                title="Transaction Details"
                isExpanded={expandedSections.details}
                onToggle={() => toggleSection('details')}
                icon={<Receipt className="w-5 h-5" />}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailRow
                      label="Transaction ID"
                      value={`#${transaction.id}`}
                      copyable
                    />
                    <DetailRow
                      label="Status"
                      value={
                        <div className="flex items-center gap-2">
                          {getStatusIcon(transaction.status)}
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </div>
                      }
                    />
                  </div>
                  
                  <DetailRow
                    label="Transaction Type"
                    value={
                      <div>
                        <div className="font-medium">{transaction.type}</div>
                        <div className="text-sm text-gray-600">{transaction.category}</div>
                        {transaction.subcategory && (
                          <div className="text-sm text-gray-500">{transaction.subcategory}</div>
                        )}
                      </div>
                    }
                  />
                  
                  <DetailRow
                    label="Description"
                    value={transaction.description}
                    fullWidth
                  />

                  {/* Tags */}
                  {transaction.tags && transaction.tags.length > 0 && (
                    <DetailRow
                      label="Tags"
                      value={
                        <div className="flex flex-wrap gap-1">
                          {transaction.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      }
                      fullWidth
                    />
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DetailRow
                      label="Date"
                      value={date}
                    />
                    <DetailRow
                      label="Time"
                      value={time}
                    />
                    <DetailRow
                      label="Relative"
                      value={relative}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <DetailRow
                      label="Total Amount"
                      value={formatCurrency(transaction.amount, transaction.currency)}
                    />
                    <DetailRow
                      label="Fees"
                      value={formatCurrency(transaction.fees, transaction.currency)}
                    />
                    <DetailRow
                      label="Net Amount"
                      value={formatCurrency(transaction.netAmount, transaction.currency)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailRow
                      label="Receipt Reference"
                      value={transaction.receiptRef}
                      copyable
                    />
                    {transaction.invoiceRef && (
                      <DetailRow
                        label="Invoice Reference"
                        value={transaction.invoiceRef}
                        copyable
                      />
                    )}
                  </div>

                  {/* Metadata */}
                  {transaction.metadata && Object.keys(transaction.metadata).length > 0 && (
                    <DetailRow
                      label="Additional Metadata"
                      value={
                        <div className="space-y-2">
                          {Object.entries(transaction.metadata).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="font-medium text-gray-600 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                              </span>
                              <span className="text-gray-900">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      }
                      fullWidth
                    />
                  )}
                </div>
              </DetailSection>

              {/* Project Association Section */}
              {transaction.projectAssociation && (
                <DetailSection
                  title="Project Information"
                  isExpanded={expandedSections.project}
                  onToggle={() => toggleSection('project')}
                  icon={<Building className="w-5 h-5" />}
                >
                  <div className="space-y-4">
                    <DetailRow
                      label="Project Name"
                      value={transaction.projectAssociation.name}
                    />
                    <DetailRow
                      label="Client"
                      value={transaction.projectAssociation.client}
                    />
                    <DetailRow
                      label="Description"
                      value={transaction.projectAssociation.description}
                      fullWidth
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DetailRow
                        label="Project ID"
                        value={transaction.projectAssociation.id}
                        copyable
                      />
                      <DetailRow
                        label="Current Phase"
                        value={transaction.projectAssociation.timeline.phase}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DetailRow
                        label="Start Date"
                        value={formatDateTime(transaction.projectAssociation.timeline.start).date}
                      />
                      <DetailRow
                        label="End Date"
                        value={formatDateTime(transaction.projectAssociation.timeline.end).date}
                      />
                    </div>

                    {transaction.projectAssociation.deliverables && (
                      <DetailRow
                        label="Deliverables"
                        value={
                          <ul className="list-disc list-inside space-y-1">
                            {transaction.projectAssociation.deliverables.map((deliverable, index) => (
                              <li key={index} className="text-sm text-gray-700">{deliverable}</li>
                            ))}
                          </ul>
                        }
                        fullWidth
                      />
                    )}
                  </div>
                </DetailSection>
              )}

              {/* Enhanced Merchant Details Section */}
              <DetailSection
                title="Merchant Information"
                isExpanded={expandedSections.merchant}
                onToggle={() => toggleSection('merchant')}
                icon={<User className="w-5 h-5" />}
              >
                <div className="space-y-4">
                  <DetailRow
                    label="Merchant Name"
                    value={transaction.merchant.name}
                  />
                  <DetailRow
                    label="Email"
                    value={transaction.merchant.email}
                    copyable
                  />
                  <DetailRow
                    label="Phone"
                    value={transaction.merchant.phone}
                    copyable
                  />
                  
                  {transaction.merchant.address && (
                    <>
                      <DetailRow
                        label="Address"
                        value={
                          <div className="text-sm">
                            <div>{transaction.merchant.address.street}</div>
                            <div>{transaction.merchant.address.city}, {transaction.merchant.address.state}</div>
                            <div>{transaction.merchant.address.country}</div>
                          </div>
                        }
                        fullWidth
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DetailRow
                          label="City"
                          value={transaction.merchant.address.city}
                        />
                        <DetailRow
                          label="Country"
                          value={transaction.merchant.address.country}
                        />
                      </div>
                    </>
                  )}
                  
                  {transaction.merchant.taxId && (
                    <DetailRow
                      label="Tax ID"
                      value={transaction.merchant.taxId}
                      copyable
                    />
                  )}
                  
                  {transaction.merchant.website && (
                    <DetailRow
                      label="Website"
                      value={
                        <a 
                          href={transaction.merchant.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {transaction.merchant.website}
                        </a>
                      }
                    />
                  )}
                </div>
              </DetailSection>

              {/* Enhanced Payment Method Section */}
              <DetailSection
                title="Payment Method"
                isExpanded={expandedSections.payment}
                onToggle={() => toggleSection('payment')}
                icon={<CreditCard className="w-5 h-5" />}
              >
                <div className="space-y-4">
                  <DetailRow
                    label="Payment Type"
                    value={transaction.paymentMethod.type}
                  />
                  <DetailRow
                    label="Card Brand"
                    value={transaction.paymentMethod.brand}
                  />
                  <DetailRow
                    label="Card Number"
                    value={`**** **** **** ${transaction.paymentMethod.last4}`}
                    copyable
                  />
                  
                  {transaction.paymentMethod.bankName && (
                    <DetailRow
                      label="Bank Name"
                      value={transaction.paymentMethod.bankName}
                    />
                  )}
                  
                  {transaction.paymentMethod.country && (
                    <DetailRow
                      label="Country"
                      value={transaction.paymentMethod.country}
                    />
                  )}
                </div>
              </DetailSection>

              {/* Transaction History Section */}
              <DetailSection
                title="Transaction History"
                isExpanded={expandedSections.history}
                onToggle={() => toggleSection('history')}
                icon={<Clock className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  {transaction.history.map((event, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(event.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{event.description}</p>
                          <p className="text-xs text-gray-500">
                            {formatDateTime(event.timestamp).relative}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                          {event.user && (
                            <span className="text-xs text-gray-500">by {event.user}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </DetailSection>

              {/* Related Transactions Section */}
              {transaction.relatedTransactions && transaction.relatedTransactions.length > 0 && (
                <DetailSection
                  title="Related Transactions"
                  isExpanded={expandedSections.related}
                  onToggle={() => toggleSection('related')}
                  icon={<ArrowUpDown className="w-5 h-5" />}
                >
                  <div className="space-y-3">
                    {transaction.relatedTransactions.map((related) => (
                      <div key={related.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(related.status)}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{related.type}</p>
                            <p className="text-xs text-gray-500">#{related.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-gray-900">
                            {formatCurrency(related.amount, transaction.currency)}
                          </span>
                          <Link
                            href={`/dashboard/transactions/${related.id}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </DetailSection>
              )}

              {/* Receipt Section */}
              <DetailSection
                title="Receipt & Downloads"
                isExpanded={expandedSections.receipt}
                onToggle={() => toggleSection('receipt')}
                icon={<FileText className="w-5 h-5" />}
              >
                <div className="text-center py-6">
                  <div className="w-24 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Receipt className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Transaction receipt and documentation
                  </p>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={handleDownloadReceipt}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077B6] text-white rounded-lg hover:bg-[#005F91] transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download Receipt
                    </button>
                    <button
                      onClick={handleShare}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              </DetailSection>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-13">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={handleDownloadReceipt}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Receipt
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Transaction
                  </button>
                  <button
                    onClick={handleBackToList}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to List
                  </button>
                </div>
              </div>

              {/* Transaction Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Amount</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(transaction.amount, transaction.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Fees</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(transaction.fees, transaction.currency)}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-900">Net Amount</span>
                      <span className="text-sm font-bold text-gray-900">
                        {formatCurrency(transaction.netAmount, transaction.currency)}
                      </span>
                    </div>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(transaction.status)}
                        <span className={`text-sm font-medium capitalize ${getStatusColor(transaction.status).split(' ')[0]}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="mt-8">
          <EnhancedTransactionActionButtons
            transaction={{
              id: transaction.id,
              project: transaction.project,
              type: transaction.type,
              amount: transaction.amount,
              status: transaction.status,
              date: transaction.date
            }}
          />
        </div>
      </div>
    </>
  );
}
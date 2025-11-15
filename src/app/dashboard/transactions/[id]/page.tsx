"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import TransactionDetailHeader from "./components/TransactionDetailHeader";
import TransactionAmountCard from "./components/TransactionAmountCard";
import DetailSection from "./components/DetailSection";
import DetailRow from "./components/DetailRow";
import EnhancedTransactionActionButtons from "./components/EnhancedTransactionActionButtons";
import LoadingSkeleton from "./components/LoadingSkeleton";
import TransactionNotFound from "./components/TransactionNotFound";
import { Receipt, User, CreditCard } from "lucide-react";
import { downloadAsPDF, shareViaLink } from "../../../dashboard/utils/transactionUtils";

interface TransactionDetails {
  id: number;
  type: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  project: string;
  merchant: {
    name: string;
    email: string;
    phone: string;
  };
  paymentMethod: {
    type: string;
    last4: string;
    brand: string;
  };
  receiptRef: string;
  description: string;
  fees: number;
  netAmount: number;
}

export default function TransactionDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [transaction, setTransaction] = useState<TransactionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    details: true,
    merchant: true,
    payment: true,
    receipt: false
  });

  const transactionId = params.id;

  useEffect(() => {
    // Simulate API call to fetch transaction details
    const fetchTransaction = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
      
      // Mock transaction data
      const mockTransaction: TransactionDetails = {
        id: Number(transactionId),
        type: "Web Development Service",
        amount: 350000,
        status: "completed",
        date: "2024-11-10T14:30:00Z",
        project: "E-commerce Platform",
        merchant: {
          name: "Bomcel Digital Agency",
          email: "billing@bomcel.com",
          phone: "+234 (0) 707 009 4167"
        },
        paymentMethod: {
          type: "Card",
          last4: "4242",
          brand: "Visa"
        },
        receiptRef: "RCP-BDC-2024-11-10-001",
        description: "Full-stack web development project including frontend, backend, and database integration for e-commerce platform",
        fees: 5000,
        netAmount: 345000
      };
      
      setTransaction(mockTransaction);
      setLoading(false);
    };

    if (transactionId) {
      fetchTransaction();
    }
  }, [transactionId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
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
      })
    };
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
        // Fallback to copying to clipboard
        try {
          await navigator.clipboard.writeText(window.location.href);
        } catch (clipboardError) {
          console.error('Clipboard access failed:', clipboardError);
        }
      }
    }
  };

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!transaction) {
    return <TransactionNotFound onBack={handleBackToDashboard} />;
  }

  const { date, time } = formatDateTime(transaction.date);

  return (
    <>
      <TransactionDetailHeader
        transactionId={transaction.id.toString()}
        date={date}
        onShare={handleShare}
        onDownload={handleDownloadReceipt}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <TransactionAmountCard
          amount={transaction.amount}
          status={transaction.status}
          project={transaction.project}
        />

        <div className="space-y-4">
          {/* Transaction Details Section */}
          <DetailSection
            title="Transaction Details"
            isExpanded={expandedSections.details}
            onToggle={() => toggleSection('details')}
            icon={<Receipt className="w-5 h-5" />}
          >
            <div className="space-y-4">
              <DetailRow
                label="Transaction ID"
                value={`#${transaction.id}`}
                copyable
              />
              <DetailRow
                label="Transaction Type"
                value={transaction.type}
              />
              <DetailRow
                label="Description"
                value={transaction.description}
                fullWidth
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailRow
                  label="Date"
                  value={date}
                />
                <DetailRow
                  label="Time"
                  value={time}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailRow
                  label="Fees"
                  value={formatCurrency(transaction.fees)}
                />
                <DetailRow
                  label="Net Amount"
                  value={formatCurrency(transaction.netAmount)}
                />
              </div>
              <DetailRow
                label="Receipt Reference"
                value={transaction.receiptRef}
                copyable
              />
            </div>
          </DetailSection>

          {/* Merchant Details Section */}
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
            </div>
          </DetailSection>

          {/* Payment Method Section */}
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
            </div>
          </DetailSection>

          {/* Receipt Section */}
          <DetailSection
            title="Receipt"
            isExpanded={expandedSections.receipt}
            onToggle={() => toggleSection('receipt')}
          >
            <div className="text-center py-6">
              <div className="w-24 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Receipt className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Transaction receipt preview
              </p>
              <button
                onClick={handleDownloadReceipt}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077B6] text-white rounded-lg hover:bg-[#005F91] transition-colors"
              >
                <Receipt className="w-4 h-4" />
                Download Receipt
              </button>
            </div>
          </DetailSection>
        </div>

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
    </>
  );
}
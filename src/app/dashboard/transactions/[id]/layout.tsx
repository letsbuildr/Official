import "../../../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transaction Details - Dashboard",
  description: "View detailed information about your transaction",
};

export default function TransactionDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
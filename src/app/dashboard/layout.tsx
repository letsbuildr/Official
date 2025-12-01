import "../globals.css";
import { ProtectedRoute } from "../../components/ProtectedRoute";

export const metadata = {
  title: "Dashboard - My Landing Page",
  description: "User dashboard for managing projects and transactions",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        {children}
      </div>
    </ProtectedRoute>
  );
}
import "../globals.css";
import { ProtectedRoute } from "../../components/ProtectedRoute";

export const metadata = {
  title: "Admin Dashboard - My Landing Page",
  description: "Admin dashboard for platform management and analytics",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen">
        {children}
      </div>
    </ProtectedRoute>
  );
}
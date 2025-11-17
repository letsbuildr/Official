import "../globals.css";

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
    <div className="min-h-screen">
      {children}
    </div>
  );
}
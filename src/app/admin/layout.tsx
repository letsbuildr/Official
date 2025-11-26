import "../globals.css";

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
    <div className="min-h-screen">
      {children}
    </div>
  );
}
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
    <html lang="en">
      <body className="font-sans bg-[#F8FBFF] text-[#171717]">
        {children}
      </body>
    </html>
  );
}
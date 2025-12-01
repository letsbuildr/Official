"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "./components/DashboardHeader";
import WelcomeSection from "./components/WelcomeSection";
import QuickStats from "./components/QuickStats";
import TransactionOverview from "./components/TransactionOverview";
import QuickActions from "./components/QuickActions";
import ConsultationTracking from "./components/ConsultationTracking";
import { useUserDetails } from "../../lib/redux/hooks";
import { useAuthContext } from "../../lib/api/auth-context";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
  project: string;
}

interface Consultation {
  id: number;
  service: string;
  consultationDate: string;
  consultationTime: string;
  status: "scheduled" | "completed" | "cancelled";
  fullName: string;
  email: string;
  message: string;
}

export default function Dashboard() {
  const [user] = useState({
    name: "Unknown User",
    email: "unknown@gmail.com",
    joinDate: "2025-11-14",
    avatar: "/images/avatar.png"
  });

  const { user: reduxUser, loading, error, fetchUserDetails } = useUserDetails();

  const { user: authUser, isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated && authUser && !reduxUser && !loading) {
      const userId = authUser.id || authUser._id;
      if (userId) {
        console.log('Dashboard: Fetching user details for authenticated user:', userId);
        fetchUserDetails(userId);
      }
    }
  }, [isAuthenticated, authUser, reduxUser, loading, fetchUserDetails]);

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

  const [consultations] = useState<Consultation[]>([
   {
     id: 1,
     service: "Web Development",
     consultationDate: "2024-11-20",
     consultationTime: "10:00 AM",
     status: "scheduled",
     fullName: "John Doe",
     email: "john@example.com",
     message: "Interested in building a modern e-commerce platform"
   },
   {
     id: 2,
     service: "Data Analysis",
     consultationDate: "2024-11-18",
     consultationTime: "02:00 PM",
     status: "completed",
     fullName: "Jane Smith",
     email: "jane@example.com",
     message: "Need help with business analytics dashboard"
   }
 ]);

 // Calculate statistics
 const totalSpent = transactions
   .filter(t => t.status === 'completed')
   .reduce((sum, t) => sum + t.amount, 0);

 const pendingAmount = transactions
   .filter(t => t.status === 'pending')
   .reduce((sum, t) => sum + t.amount, 0);

 const activeProjects = transactions.filter(t => t.status === 'pending').length;

 return (
   <div className="min-h-screen bg-gray-50">
     <DashboardHeader user={authUser ? { name: authUser.name, email: authUser.email } : user} />
     
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <WelcomeSection
         user={{ name: user.name, joinDate: user.joinDate }}
         totalSpent={totalSpent}
         activeProjects={activeProjects}
       />
       
       <QuickStats
         totalSpent={totalSpent}
         pendingAmount={pendingAmount}
         totalProjects={transactions.length}
       />

       <ConsultationTracking consultations={consultations} />


       <TransactionOverview transactions={transactions} />


       <QuickActions />

     </div>
   </div>
 );
}
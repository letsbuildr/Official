"use client";
import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

function ResetPasswordPage() {
  return (
    <section className="h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Reset Password
        </h2>
        
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </section>
  );
}

export default ResetPasswordPage;

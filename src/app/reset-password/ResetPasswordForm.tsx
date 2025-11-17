"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <form onSubmit={handleReset} className="space-y-4">
      <div>
        <label className="text-sm font-medium block mb-1">
          New Password
        </label>
        <input
          type="password"
          required
          className="w-full px-4 py-2 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="w-full bg-[#0077B6] text-white py-2 rounded-lg">
        Reset Password
      </button>

      {message && (
        <p className="mt-4 text-center text-[#0077B6]">{message}</p>
      )}
    </form>
  );
}
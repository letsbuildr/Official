"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [isHydrated, setIsHydrated] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Handle hydration and token extraction
  useEffect(() => {
    setIsHydrated(true);
    const urlToken = searchParams?.get("token");
    setToken(urlToken);
  }, [searchParams]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long");
      return;
    }

    if (!token) {
      setMessage("Invalid or missing reset token");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setMessage("Password reset successfully! You can now sign in with your new password.");
        setPassword("");
        setConfirmPassword("");
      } else {
        setMessage(data.message || "An error occurred. Please try again.");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0077B6]"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleReset} className="space-y-4">
      <div>
        <label className="text-sm font-medium block mb-1">
          New Password
        </label>
        <input
          type="password"
          required
          minLength={8}
          className="w-full px-4 py-2 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          required
          minLength={8}
          className="w-full px-4 py-2 border rounded-lg"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <button
        className="w-full bg-[#0077B6] text-white py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? "Resetting..." : "Reset Password"}
      </button>

      {message && (
        <p className={`mt-4 text-center text-sm ${
          message.includes("successfully") ? "text-green-600" : "text-red-600"
        }`}>
          {message}
        </p>
      )}
    </form>
  );
}
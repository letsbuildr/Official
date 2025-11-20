"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Clock, RefreshCw, CheckCircle } from "lucide-react";

export default function VerificationPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60); // 60 seconds cooldown
  const [bookingData, setBookingData] = useState<{email: string; fullName: string; preferredDate: string; preferredTime: string; message?: string} | null>(null);

  // Load booking data from localStorage (simulating what was submitted from consultation form)
  useEffect(() => {
    const savedBooking = localStorage.getItem("pendingBooking");
    if (savedBooking) {
      setBookingData(JSON.parse(savedBooking));
    } else {
      // If no pending booking, redirect back to consultation
      router.push("/consultation");
    }
  }, [router]);

  // Timer for OTP expiry
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setError("OTP has expired. Please request a new one.");
    }
  }, [timeLeft]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendCooldown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single character

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    
    if (otpCode.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept "123456" as valid OTP
      if (otpCode === "123456") {
        // Clear pending booking and redirect to success
        localStorage.removeItem("pendingBooking");
        localStorage.setItem("verifiedBooking", JSON.stringify(bookingData));
        router.push("/booking-success");
      } else {
        setError("Invalid OTP. Please check your email and try again.");
        // Clear OTP inputs
        setOtp(["", "", "", "", "", ""]);
        document.getElementById("otp-0")?.focus();
      }
    } catch (error) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    setCanResend(false);
    setResendCooldown(60);
    setError("");

    try {
      // Simulate sending new OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTimeLeft(15 * 60); // Reset timer
      alert("New OTP sent to your email!");
    } catch (error) {
      setError("Failed to resend OTP. Please try again.");
      setCanResend(true);
    }
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9FAFB] to-[#E6F0FA] px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0077B6] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9FAFB] to-[#E6F0FA] px-4 py-8">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#0B1E36] mb-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600 text-sm">
            We&apos;ve sent a 6-digit OTP to <strong>{bookingData.email}</strong>
          </p>
        </div>

        {/* Timer */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center">
            <Clock className="w-5 h-5 text-amber-600 mr-2" />
            <span className="text-amber-800 font-medium">
              OTP expires in {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* OTP Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
            Enter the 6-digit verification code
          </label>
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-12 text-center text-xl font-semibold border rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-[#0077B6] ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                autoComplete="off"
              />
            ))}
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={isVerifying || otp.some(digit => !digit)}
          className={`w-full px-6 py-3 bg-[#0077B6] text-white rounded-lg font-semibold hover:bg-[#005F91] transition-all duration-300 transform hover:scale-105 flex items-center justify-center mb-4 ${
            isVerifying || otp.some(digit => !digit) 
              ? "opacity-75 cursor-not-allowed" 
              : ""
          }`}
        >
          {isVerifying ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Verify OTP
            </>
          )}
        </button>

        {/* Resend OTP */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-3">
            Didn&apos;t receive the code?
          </p>
          {canResend ? (
            <button
              onClick={handleResendOtp}
              className="text-[#0077B6] hover:text-[#005F91] font-medium text-sm flex items-center mx-auto transition"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Resend OTP
            </button>
          ) : (
            <p className="text-gray-500 text-sm">
              Resend available in {formatTime(resendCooldown)}
            </p>
          )}
        </div>

        {/* Rate Limiting Notice */}
        <div className="mt-6 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            For security, OTP requests are rate limited. Please wait before requesting a new code.
          </p>
        </div>

        {/* Demo Notice */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700 text-center">
            <strong>Demo:</strong> Use OTP code <strong>123456</strong> to verify
          </p>
        </div>
      </div>
    </section>
  );
}
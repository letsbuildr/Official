"use client";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData = { email, password };
    console.log("Submitting login data:", loginData);
  };

  return (
    <section className="h-full flex items-center justify-center bg-linear-to-br from-[#F9FAFB] to-[#E6F0FA] px-6 py-30">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 text-center border border-gray-100">
        <h2 className="text-2xl font-bold text-[#0B1E36] mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Login to continue to Bomcel Digital
        </p>

        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-gray-950 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] outline-none"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-gray-950 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] outline-none pr-10"
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* ✅ Forgot Password */}
          <div className="flex justify-end -mt-2 mb-2">
            <Link
              href="/forgot-password"
              className="text-sm text-[#0077B6] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0077B6] text-white font-semibold py-2 rounded-lg hover:bg-[#005F91] transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link href="/sign-up" className="text-[#0077B6] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}

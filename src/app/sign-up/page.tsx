"use client";
import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(
    null
  );

  // Mock existing data (simulate database)
  const existingUsers = ["samuel", "john_doe", "bomcel"];
  const existingEmails = ["samuel@example.com", "john@example.com"];

  const checkUsername = async (value: string) => {
    setCheckingUsername(true);
    await new Promise((res) => setTimeout(res, 600)); // simulate delay
    setIsUsernameAvailable(!existingUsers.includes(value.toLowerCase()));
    setCheckingUsername(false);
  };

  const checkEmail = async (value: string) => {
    setCheckingEmail(true);
    await new Promise((res) => setTimeout(res, 600)); // simulate delay
    setIsEmailAvailable(!existingEmails.includes(value.toLowerCase()));
    setCheckingEmail(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isUsernameAvailable) return setError("Username already taken!");
    if (!isEmailAvailable) return setError("Email already registered!");
    if (password !== confirm) return setError("Passwords do not match!");
    setError("");
    alert("✅ Account created successfully!");
  };

  return (
    <section className="h-full flex items-center justify-center bg-linear-to-br from-[#F9FAFB] to-[#E6F0FA] px-6 py-30">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8 text-center border border-gray-100">
        <h2 className="text-2xl font-bold text-[#0B1E36] mb-2">
          Create an Account 🚀
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Join Bomcel Digital to automate smarter and faster.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Full Name */}
          <div className="text-gray-950">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] outline-none"
              required
            />
          </div>

          {/* Username */}
          <div className="text-gray-950">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (e.target.value.length > 2) checkUsername(e.target.value);
              }}
              placeholder="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] outline-none"
              required
            />
            {checkingUsername && (
              <p className="text-sm text-gray-500 mt-1">
                Checking availability...
              </p>
            )}
            {isUsernameAvailable === false && (
              <p className="text-sm text-red-500 mt-1">
                Username already taken ❌
              </p>
            )}
            {isUsernameAvailable && (
              <p className="text-sm text-green-600 mt-1">
                Username available ✅
              </p>
            )}
          </div>

          {/* Email */}
          <div className="text-gray-950">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value.includes("@")) checkEmail(e.target.value);
              }}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] outline-none"
              required
            />
            {checkingEmail && (
              <p className="text-sm text-gray-500 mt-1">Checking email...</p>
            )}
            {isEmailAvailable === false && (
              <p className="text-sm text-red-500 mt-1">
                Email already in use ❌
              </p>
            )}
            {isEmailAvailable && (
              <p className="text-sm text-green-600 mt-1">Email available ✅</p>
            )}
          </div>

          {/* Password */}
          <div className="relative text-gray-950">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] outline-none pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-9 text-gray-500 hover:text-[#0077B6]"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative text-gray-950">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] outline-none pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-9 text-gray-500 hover:text-[#0077B6]"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#0077B6] text-white font-semibold py-2 rounded-lg hover:bg-[#005F91] transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-[#0077B6] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}

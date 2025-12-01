"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSignup } from "../../lib/api/hooks";
import { useAuthContext } from "../../lib/api/auth-context";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  
  const { signup } = useAuthContext();
  const signupMutation = useSignup();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (password !== passwordConfirm) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    try {
      await signup({
        name,
        username,
        email,
        password,
        passwordConfirm,
      });
      router.push("/dashboard");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Signup failed. Please try again.";
      setError(errorMessage);
    }
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="johndoe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] outline-none"
                        required
                      />
                    </div>
          
                    {/* Email */}
                    <div className="text-gray-950">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077B6] outline-none"
                        required
                      />
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
                        minLength={6}
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
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
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
                      disabled={signupMutation.isPending}
                      className="w-full bg-[#0077B6] text-white font-semibold py-2 rounded-lg hover:bg-[#005F91] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {signupMutation.isPending ? "Creating Account..." : "Create Account"}
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

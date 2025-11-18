"use client";

import { useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash, FaLock, FaCheck, FaTimes } from "react-icons/fa";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

interface FormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface FormStatus {
  type: "success" | "error" | "info" | null;
  message: string;
}

export default function PasswordChangeForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  // Password validation rules
  const validatePassword = (password: string) => {
    const rules = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const strength = Object.values(rules).filter(Boolean).length;
    return { rules, strength, isValid: strength >= 4 };
  };

  // Real-time validation for confirm password
  useEffect(() => {
    if (confirmPassword && newPassword) {
      const match = newPassword === confirmPassword;
      setPasswordsMatch(match);
      
      if (match) {
        setErrors(prev => ({ ...prev, confirmPassword: undefined }));
      } else if (confirmPassword.length > 0) {
        setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      }
    }
  }, [newPassword, confirmPassword]);

  // Validate new password in real-time
  const { rules: newPasswordRules } = validatePassword(newPassword);

  // Clear status messages after 5 seconds
  useEffect(() => {
    if (status.type) {
      const timer = setTimeout(() => {
        setStatus({ type: null, message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleInputChange = (
    value: string,
    field: "currentPassword" | "newPassword" | "confirmPassword",
    ref: React.RefObject<HTMLInputElement | null>
  ) => {
    // Update field value
    if (field === "currentPassword") setCurrentPassword(value);
    else if (field === "newPassword") setNewPassword(value);
    else setConfirmPassword(value);

    // Clear previous error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Clear status message
    if (status.type) {
      setStatus({ type: null, message: "" });
    }

    // Focus next field if password is valid (for accessibility)
    if (field === "currentPassword" && value.length > 0) {
      setTimeout(() => {
        newPasswordRef.current?.focus();
      }, 100);
    } else if (field === "newPassword" && value.length >= 8) {
      setTimeout(() => {
        confirmPasswordRef.current?.focus();
      }, 100);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Current password validation
    if (!currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    // New password validation
    if (!newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else {
      const passwordValidation = validatePassword(newPassword);
      if (!passwordValidation.isValid) {
        newErrors.newPassword = "Password does not meet security requirements";
      }
    }

    // Confirm password validation
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Check if new password is different from current
    if (currentPassword && newPassword && currentPassword === newPassword) {
      newErrors.newPassword = "New password must be different from current password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Focus first field with error
      if (errors.currentPassword) {
        currentPasswordRef.current?.focus();
      } else if (errors.newPassword) {
        newPasswordRef.current?.focus();
      } else if (errors.confirmPassword) {
        confirmPasswordRef.current?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "info", message: "Updating password..." });

    try {
      // Frontend-only password change simulation
      // This is for demonstration purposes - in production, this would connect to your backend API
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate successful password change (frontend validation already done)
      setStatus({
        type: "success",
        message: "Password updated successfully! You will be signed out for security.",
      });
      
      // Clear form
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
      
      // Sign out after 2 seconds
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 2000);
    } catch (error) {
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = currentPassword && newPassword && confirmPassword && 
    Object.keys(errors).length === 0 && passwordsMatch;

  return (
    <div className="max-w-2xl">
      {/* Status Messages */}
      {status.type && (
        <div
          className={`mb-6 p-4 rounded-lg border ${
            status.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : status.type === "error"
              ? "bg-red-50 border-red-200 text-red-800"
              : "bg-blue-50 border-blue-200 text-blue-800"
          }`}
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-center space-x-2">
            {status.type === "success" && (
              <FaCheck className="w-5 h-5 text-green-600" />
            )}
            {status.type === "error" && (
              <FaTimes className="w-5 h-5 text-red-600" />
            )}
            {status.type === "info" && (
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            )}
            <span className="text-sm font-medium">{status.message}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Current Password */}
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Current Password *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <input
              ref={currentPasswordRef}
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              name="currentPassword"
              value={currentPassword}
              onChange={(e) => handleInputChange(e.target.value, "currentPassword", currentPasswordRef)}
              className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-[#0077B6] outline-none transition-colors ${
                errors.currentPassword ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Enter your current password"
              required
              aria-describedby={errors.currentPassword ? "current-password-error" : undefined}
              aria-invalid={!!errors.currentPassword}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label={showCurrentPassword ? "Hide current password" : "Show current password"}
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.currentPassword && (
            <p
              id="current-password-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
              aria-live="polite"
            >
              {errors.currentPassword}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New Password *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <input
              ref={newPasswordRef}
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => handleInputChange(e.target.value, "newPassword", newPasswordRef)}
              className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-[#0077B6] outline-none transition-colors ${
                errors.newPassword ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
              placeholder="Enter your new password"
              required
              aria-describedby={errors.newPassword ? "new-password-error" : "password-strength"}
              aria-invalid={!!errors.newPassword}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label={showNewPassword ? "Hide new password" : "Show new password"}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          
          {/* Password Strength Indicator */}
          {newPassword && (
            <div id="password-strength" className="mt-3">
              <PasswordStrengthIndicator password={newPassword} />
            </div>
          )}
          
          {errors.newPassword && (
            <p
              id="new-password-error"
              className="mt-2 text-sm text-red-600"
              role="alert"
              aria-live="polite"
            >
              {errors.newPassword}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm New Password *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <input
              ref={confirmPasswordRef}
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => handleInputChange(e.target.value, "confirmPassword", confirmPasswordRef)}
              className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-[#0077B6] outline-none transition-colors ${
                errors.confirmPassword ? "border-red-300 bg-red-50" : passwordsMatch && confirmPassword ? "border-green-300 bg-green-50" : "border-gray-300"
              }`}
              placeholder="Confirm your new password"
              required
              aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
              aria-invalid={!!errors.confirmPassword}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {confirmPassword && passwordsMatch && !errors.confirmPassword && (
              <div className="absolute inset-y-0 right-8 flex items-center">
                <FaCheck className="h-4 w-4 text-green-500" aria-label="Passwords match" />
              </div>
            )}
          </div>
          {errors.confirmPassword && (
            <p
              id="confirm-password-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
              aria-live="polite"
            >
              {errors.confirmPassword}
            </p>
          )}
          {confirmPassword && passwordsMatch && !errors.confirmPassword && (
            <p className="mt-1 text-sm text-green-600" role="alert" aria-live="polite">
              Passwords match
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`flex-1 px-4 py-3 border border-transparent rounded-lg font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0077B6] transition-colors ${
              !isFormValid || isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#0077B6] hover:bg-[#005F91]"
            }`}
            aria-describedby="submit-button-description"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Updating...</span>
              </span>
            ) : (
              "Update Password"
            )}
          </button>
          <p id="submit-button-description" className="text-xs text-gray-500 text-center sm:text-left">
            You&apos;ll be signed out after password change for security
          </p>
        </div>
      </form>
    </div>
  );
}
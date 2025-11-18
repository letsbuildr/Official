"use client";

import { useMemo } from "react";

interface PasswordStrengthIndicatorProps {
  password: string;
}

type StrengthLevel = "weak" | "fair" | "good" | "strong";

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
  met: boolean;
}

export default function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  const { strength, level, requirements } = useMemo(() => {
    if (!password) {
      return {
        strength: 0,
        level: "weak" as StrengthLevel,
        requirements: [] as PasswordRequirement[]
      };
    }

    // Define password requirements
    const requirements: PasswordRequirement[] = [
      {
        label: "At least 8 characters",
        test: (pwd) => pwd.length >= 8,
        met: password.length >= 8
      },
      {
        label: "Contains uppercase letter",
        test: (pwd) => /[A-Z]/.test(pwd),
        met: /[A-Z]/.test(password)
      },
      {
        label: "Contains lowercase letter",
        test: (pwd) => /[a-z]/.test(pwd),
        met: /[a-z]/.test(password)
      },
      {
        label: "Contains number",
        test: (pwd) => /\d/.test(pwd),
        met: /\d/.test(password)
      },
      {
        label: "Contains special character",
        test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
        met: /[!@#$%^&*(),.?":{}|<>]/.test(password)
      }
    ];

    // Calculate strength score
    const metRequirements = requirements.filter(req => req.met).length;
    const lengthBonus = password.length >= 12 ? 1 : password.length >= 10 ? 0.5 : 0;
    const strength = (metRequirements / requirements.length) * 70 + lengthBonus * 30;

    // Determine strength level
    let level: StrengthLevel;
    if (strength >= 80) level = "strong";
    else if (strength >= 60) level = "good";
    else if (strength >= 40) level = "fair";
    else level = "weak";

    return { strength, level, requirements };
  }, [password]);

  const getStrengthColor = (level: StrengthLevel) => {
    switch (level) {
      case "strong": return "bg-green-500";
      case "good": return "bg-blue-500";
      case "fair": return "bg-yellow-500";
      case "weak": return "bg-red-500";
    }
  };

  const getStrengthText = (level: StrengthLevel) => {
    switch (level) {
      case "strong": return "Strong password";
      case "good": return "Good password";
      case "fair": return "Fair password";
      case "weak": return "Weak password";
    }
  };

  const getStrengthBarWidth = () => {
    return Math.min(strength, 100);
  };

  return (
    <div className="space-y-3">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Password Strength</span>
          <span className={`text-sm font-medium ${
            level === "strong" ? "text-green-600" :
            level === "good" ? "text-blue-600" :
            level === "fair" ? "text-yellow-600" : "text-red-600"
          }`}>
            {getStrengthText(level)}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(level)}`}
            style={{ width: `${getStrengthBarWidth()}%` }}
            role="progressbar"
            aria-valuenow={strength}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Password strength: ${getStrengthText(level)}`}
          />
        </div>
      </div>

      {/* Requirements List */}
      {password && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-600">Requirements:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
            {requirements.map((req, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 ${
                  req.met ? "text-green-600" : "text-gray-500"
                }`}
              >
                <svg
                  className={`w-3 h-3 ${
                    req.met ? "text-green-500" : "text-gray-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  {req.met ? (
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  )}
                </svg>
                <span className={req.met ? "font-medium" : ""}>{req.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
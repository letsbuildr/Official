"use client";

interface SecurityTip {
  icon: React.ReactNode;
  title: string;
  description: string;
  example?: string;
}

export default function SecurityRequirements() {
  const securityTips: SecurityTip[] = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: "Use a unique password",
      description: "Never reuse passwords from other accounts or websites.",
      example: "Create a password specifically for this platform"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Enable two-factor authentication",
      description: "Add an extra layer of security with 2FA when available.",
      example: "Use authenticator apps or SMS codes"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      title: "Regular password updates",
      description: "Change your password periodically to maintain security.",
      example: "Update every 3-6 months for maximum protection"
    }
  ];

  const passwordRequirements = [
    {
      title: "Minimum length",
      requirement: "8 characters",
      description: "Use at least 8 characters, but longer is better (12+ characters recommended)"
    },
    {
      title: "Character variety",
      requirement: "Mixed case, numbers, symbols",
      description: "Combine uppercase, lowercase, numbers, and special characters"
    },
    {
      title: "Avoid common patterns",
      requirement: "No dictionary words",
      description: "Avoid common words, phrases, or predictable patterns like '123456'"
    },
    {
      title: "No personal information",
      requirement: "No names, dates, or details",
      description: "Don't use names, birthdates, addresses, or other personal information"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Password Requirements */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Password Guidelines</h4>
        <div className="space-y-3">
          {passwordRequirements.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{item.title}</span>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {item.requirement}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Tips */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Security Best Practices</h4>
        <div className="space-y-4">
          {securityTips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                {tip.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-medium text-gray-900">{tip.title}</h5>
                <p className="text-xs text-gray-600 mt-1">{tip.description}</p>
                {tip.example && (
                  <p className="text-xs text-blue-600 mt-1 italic">{tip.example}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Examples */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Password Examples</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-red-800">Weak</span>
            </div>
            <p className="text-xs text-red-700 font-mono">password123</p>
            <p className="text-xs text-red-600 mt-1">Common word + number</p>
          </div>
          
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-green-800">Strong</span>
            </div>
            <p className="text-xs text-green-700 font-mono">Tr@vel2024!Book</p>
            <p className="text-xs text-green-600 mt-1">Mix of characters + symbols</p>
          </div>
        </div>
      </div>

      {/* Additional Help */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h5 className="text-sm font-medium text-blue-900">Need help remembering passwords?</h5>
            <p className="text-sm text-blue-800 mt-1">
              Consider using a reputable password manager to securely store and generate strong passwords.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
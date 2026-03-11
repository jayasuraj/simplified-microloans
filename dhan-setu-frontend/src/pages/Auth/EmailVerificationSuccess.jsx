// src/pages/Auth/EmailVerificationSuccess.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle, Wallet, Mail, ArrowRight } from "lucide-react";

/**
 * Success page shown after email verification
 * Auto-redirects to login after 5 seconds
 */
const EmailVerificationSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/login");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 flex items-center justify-center px-4 py-12">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />

      <div className="w-full max-w-2xl relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-12">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Wallet className="w-9 h-9 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
                  DhanSetu
                </h1>
                <p className="text-sm text-gray-500">Blockchain Microloans</p>
              </div>
            </div>
          </div>

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center animate-bounce">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center animate-ping">
                <Mail className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Email Verified Successfully! 🎉
            </h2>
            <p className="text-lg text-gray-600">
              Your email has been confirmed. Your account is now fully activated.
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <span className="text-lg">✨</span>
              What's Next?
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Log in with your credentials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Complete your profile setup</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Start requesting or providing microloans</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>Track your transactions on the blockchain</span>
              </li>
            </ul>
          </div>

          {/* Countdown */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600">
              Redirecting to login in{" "}
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold">
                {countdown}
              </span>{" "}
              seconds...
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/login"
              className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              Continue to Login
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/"
              className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors text-center"
            >
              Back to Home
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Need help?{" "}
              <a href="mailto:support@dhansetu.com" className="text-blue-600 font-semibold hover:underline">
                Contact Support
              </a>
            </p>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-gray-500">🔒 Secured by Ethereum Blockchain</p>
          <p className="text-sm text-gray-500">✅ RBI Compliant Platform</p>
          <p className="text-sm text-gray-500">🏆 Trusted by 10,000+ Users</p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationSuccess;

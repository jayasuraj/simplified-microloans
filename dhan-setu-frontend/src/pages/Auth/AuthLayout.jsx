// src/pages/Auth/AuthLayout.jsx

import React from "react";
import { Wallet } from "lucide-react";

/**
 * Shared layout component for authentication pages
 * Provides consistent styling and structure for Login, Register, etc.
 */
const AuthLayout = ({ 
  children, 
  title = "DhanSetu",
  subtitle = "Blockchain Microloans",
  leftContent,
  showLogo = true 
}) => {
  return (
    <div className="min-h-screen bg-[#05070d] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl" />

      <div className="w-full max-w-4xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content - Branding/Info */}
          {leftContent ? (
            <div className="hidden lg:block">
              {leftContent}
            </div>
          ) : (
            <div className="hidden lg:block space-y-6">
              {showLogo && (
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Wallet className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {title}
                    </h1>
                    <p className="text-sm text-slate-400">{subtitle}</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-white">
                  Empowering Street Vendors
                </h2>
                <p className="text-lg text-slate-400">
                  Access instant microloans powered by blockchain technology. 
                  Transparent, secure, and designed for your growth.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { icon: "🔒", title: "Secure", desc: "Bank-level encryption & blockchain" },
                  { icon: "⚡", title: "Fast", desc: "Instant approval and disbursement" },
                  { icon: "🔗", title: "Transparent", desc: "Track every transaction on-chain" },
                  { icon: "📱", title: "Easy", desc: "Simple mobile-first interface" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <p className="font-semibold text-slate-100">{item.title}</p>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Right Content - Form/Main Content */}
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

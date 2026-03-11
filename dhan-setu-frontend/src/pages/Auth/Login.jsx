// src/pages/Auth/Login.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Eye, EyeOff, Wallet, Loader, Shield, Zap, Lock,
  TrendingUp, ArrowRight, CheckCircle
} from "lucide-react";
import bgImage from "../../assets/images/home2.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("vendor");
  const [apiKey, setApiKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !role) {
      setError("Email, password and role are required.");
      return;
    }

    if (role === "lender" && !apiKey) {
      setError("API Key is required for lenders");
      return;
    }

    const expectedApiKey = process.env.REACT_APP_LENDER_API_KEY;
    if (role === "lender" && apiKey.trim() !== expectedApiKey) {
      setError("Invalid API Key");
      return;
    }

    const endpoint =
      role === "lender"
        ? "http://localhost:5000/api/lender/login"
        : "http://localhost:5000/api/vendor/login";

    const payload = { email, password, role };
    if (role === "lender") payload.apiKey = apiKey;

    try {
      setLoading(true);
      const response = await axios.post(endpoint, payload);

      if (response.data.success) {
        const { token, role: userRole, userId } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        localStorage.setItem("userId", userId);

        if (userRole === "vendor") navigate("/vendor");
        else if (userRole === "lender") navigate("/lender");
        else navigate("/dashboard");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        (err.response?.status === 404
          ? "You are not registered. Please register first."
          : "Login error");
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-[#0A0F1E]">

      {/* ── LEFT PANEL — background image + brand story ── */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1E]/80 via-blue-950/70 to-purple-950/80" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group w-fit">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Dhan<span className="text-blue-400">Setu</span>
            </span>
          </Link>
        </div>

        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Welcome<br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Back.
              </span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-sm">
              The fastest way to manage microloans for India's street vendors — all powered by blockchain.
            </p>
          </div>

          {/* Trust bullets */}
          <div className="space-y-4">
            {[
              { icon: Lock, label: "End-to-end encrypted", color: "text-emerald-400" },
              { icon: Zap, label: "Approvals in under 10 minutes", color: "text-amber-400" },
              { icon: Shield, label: "Ethereum blockchain verified", color: "text-blue-400" },
              { icon: TrendingUp, label: "98.5% repayment success rate", color: "text-purple-400" },
            ].map(({ icon: Icon, label, color }, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-gray-200 text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom badge */}
        <div className="relative z-10 flex items-center gap-2 text-xs text-gray-400">
          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          RBI Compliant · Secured by Ethereum · Zero Hidden Fees
        </div>
      </div>

      {/* ── RIGHT PANEL — login form ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-[#0A0F1E]">
        {/* Glow blobs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Dhan<span className="text-blue-400">Setu</span>
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">Sign In</h1>
            <p className="text-gray-400 text-sm">
              New to DhanSetu?{" "}
              <Link to="/register" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                Create an account
              </Link>
            </p>
          </div>

          {/* Card */}
          <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-5">

              {/* Role toggle */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "vendor", label: "Vendor", desc: "Borrow Funds" },
                    { value: "lender", label: "Lender", desc: "Invest Funds" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setRole(opt.value)}
                      className={`py-3 px-4 rounded-xl border text-center transition-all duration-200 ${
                        role === opt.value
                          ? "border-blue-500 bg-blue-500/15 text-white shadow-lg shadow-blue-500/10"
                          : "border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <p className="font-semibold text-sm">{opt.label}</p>
                      <p className="text-xs opacity-70 mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/[0.09] transition-all text-sm"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/[0.09] transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* API Key (lender only) */}
              {role === "lender" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    API Key
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your lender API key"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/[0.09] transition-all text-sm"
                  />
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  <span className="mt-0.5 flex-shrink-0">⚠️</span>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group w-full py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 hover:shadow-xl hover:shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer note */}
          <p className="mt-6 text-center text-xs text-gray-600">
            By signing in, you agree to our{" "}
            <a href="#" className="text-gray-400 hover:text-white transition-colors underline underline-offset-2">Terms</a>
            {" "}and{" "}
            <a href="#" className="text-gray-400 hover:text-white transition-colors underline underline-offset-2">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

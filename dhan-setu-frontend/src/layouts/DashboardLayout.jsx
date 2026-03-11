// src/layouts/DashboardLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, Link } from "react-router-dom";
import { LayoutDashboard, FileText, CreditCard, Settings, User, HelpCircle, LogOut, Menu, X, Wallet, TrendingUp, AlertCircle, Bell, ShieldCheck, Calculator, Radar } from "lucide-react";
import Footer from "../components/common/Footer";
import QuickAccessDock from "../components/common/QuickAccessDock";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    setMenuOpen(false);
    navigate("/login");
  };

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform ${
      isActive 
        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]" 
        : "text-slate-300 hover:bg-slate-800/55 hover:text-white hover:scale-[1.01]"
    }`;

  const roleLabel =
    role === "vendor"
      ? "Vendor Dashboard"
      : role === "lender"
      ? "Lender Dashboard"
      : "Dashboard";

  return (
    <div className="flex flex-col min-h-screen bg-[#05070d]">
      {/* Top Navbar with glass effect */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-700/40">
        <nav className="w-full px-4 md:px-8 py-4 flex items-center justify-between">

          {/* Logo Section with gradient */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 flex items-center justify-center text-white text-base font-bold shadow-lg shadow-blue-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Wallet size={20} />
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg md:text-xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-700 transition-all">
                DhanSetu
              </span>
              <span className="hidden md:block text-xs text-gray-500 font-medium">
                {roleLabel}
              </span>
            </div>
          </Link>

          {/* Hamburger Button with animation */}
          <button
            className="relative h-10 w-10 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-slate-600/40"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={20} className="text-slate-300" /> : <Menu size={20} className="text-slate-300" />}
          </button>
        </nav>
      </header>

      {/* Drawer + Backdrop */}
      <div className={`fixed inset-0 z-30 ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-slate-900/40 backdrop-blur-sm transition-opacity duration-500 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Sliding Sidebar with gradient */}
        <aside
          className={`absolute inset-y-0 left-0 w-72 bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-black/40 border-r border-slate-700/40 pt-6 pb-6 flex flex-col transform transition-all duration-500 ease-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Logo with modern design */}
          <div className="px-6 mb-6 flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/30">
              <Wallet size={24} />
            </div>
            <div>
              <p className="text-base font-bold bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
                DhanSetu
              </p>
              <p className="text-xs text-slate-400 font-medium">{roleLabel}</p>
            </div>
          </div>

          {/* Navigation section header */}
          <div className="px-6 mb-3">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
              <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                Menu
              </p>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
            {role === "vendor" && (
              <>
                <NavLink to="/vendor" end className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </NavLink>
                <NavLink to="/vendor/loans" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <FileText size={18} />
                  <span>Loans</span>
                </NavLink>
                <NavLink to="/vendor/transactions" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <CreditCard size={18} />
                  <span>Transactions</span>
                </NavLink>
                <NavLink to="/vendor/settings" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <Settings size={18} />
                  <span>Settings</span>
                </NavLink>
                <NavLink to="/vendor/profile" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <User size={18} />
                  <span>Profile</span>
                </NavLink>
                <NavLink to="/vendor/help" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <HelpCircle size={18} />
                  <span>Help</span>
                </NavLink>
                <NavLink to="/vendor/easy" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <AlertCircle size={18} />
                  <span>Easy Help</span>
                </NavLink>
                <NavLink to="/vendor/planner" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <CreditCard size={18} />
                  <span>Repayment Planner</span>
                </NavLink>
                <NavLink to="/vendor/checklist" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <FileText size={18} />
                  <span>Daily Checklist</span>
                </NavLink>
                <NavLink to="/vendor/reminders" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <Bell size={18} />
                  <span>Reminder Center</span>
                </NavLink>
                <NavLink to="/vendor/expense-tracker" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <CreditCard size={18} />
                  <span>Expense Tracker</span>
                </NavLink>
                <NavLink to="/vendor/sales-booster" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <TrendingUp size={18} />
                  <span>Sales Booster</span>
                </NavLink>
              </>
            )}

            {role === "lender" && (
              <>
                <NavLink to="/lender" end className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </NavLink>
                <NavLink to="/lender/loans" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <FileText size={18} />
                  <span>Loan Requests</span>
                </NavLink>
                <NavLink to="/lender/portfolio" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <TrendingUp size={18} />
                  <span>Portfolio</span>
                </NavLink>
                <NavLink to="/lender/investments" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <AlertCircle size={18} />
                  <span>Investment History</span>
                </NavLink>
                <NavLink to="/lender/transactions" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <CreditCard size={18} />
                  <span>Transactions</span>
                </NavLink>
                <NavLink to="/lender/withdrawal" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <Wallet size={18} />
                  <span>Withdraw Funds</span>
                </NavLink>
                <NavLink to="/lender/risk-analyzer" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <ShieldCheck size={18} />
                  <span>Risk Analyzer</span>
                </NavLink>
                <NavLink to="/lender/yield-planner" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <Calculator size={18} />
                  <span>Yield Planner</span>
                </NavLink>
                <NavLink to="/lender/opportunity-radar" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <Radar size={18} />
                  <span>Opportunity Radar</span>
                </NavLink>
                <NavLink to="/lender/settings" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <Settings size={18} />
                  <span>Settings</span>
                </NavLink>
                <NavLink to="/lender/profile" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <User size={18} />
                  <span>Profile</span>
                </NavLink>
                <NavLink to="/lender/help" className={linkStyle} onClick={() => setMenuOpen(false)}>
                  <HelpCircle size={18} />
                  <span>Help</span>
                </NavLink>
              </>
            )}
          </nav>

          {role && (
            <div className="px-6 mt-4 space-y-3">
              <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-[1.02] transform"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
              <div className="text-center px-3 py-2 rounded-lg bg-slate-800/40 border border-slate-700/40">
                <p className="text-xs text-slate-400">
                  Signed in as <span className="font-bold text-blue-400">{role}</span>
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Main Content with modern spacing */}
      <main className={`flex-grow w-full ${role === "vendor" || role === "lender" ? "relative overflow-hidden bg-[#0A0F1E]" : ""}`}>
        {(role === "vendor" || role === "lender") && (
          <>
            <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-600/25 blur-3xl" />
            <div className="pointer-events-none absolute top-1/3 -left-52 h-[28rem] w-[28rem] rounded-full bg-purple-600/20 blur-3xl" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            />
          </>
        )}
        <div className={`relative w-full px-4 md:px-8 py-6 md:py-8 max-w-7xl mx-auto ${role === "vendor" ? "vendor-modern-scope" : ""} ${role === "lender" ? "lender-modern-scope" : ""}`}>
          <Outlet />
        </div>
        <QuickAccessDock role={role} />
      </main>

      <Footer />
    </div>
  );
};

export default DashboardLayout;

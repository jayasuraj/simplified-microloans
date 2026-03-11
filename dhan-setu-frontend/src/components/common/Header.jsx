import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Wallet, Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClasses = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-cyan-300" : "text-slate-300 hover:text-cyan-300"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-700/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              DhanSetu
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={navLinkClasses}>Home</NavLink>
            <NavLink to="/register" className={navLinkClasses}>Register</NavLink>
            <NavLink to="/login" className={navLinkClasses}>Login</NavLink>
            <Link
              to="/register"
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
            >
              Get Started
            </Link>
          </nav>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors text-slate-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden py-4 border-t border-slate-700/40 space-y-2">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/register"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              Register
            </NavLink>
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              Login
            </NavLink>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg text-center font-semibold"
            >
              Get Started
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

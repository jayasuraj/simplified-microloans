// src/components/common/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Wallet, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white mt-auto border-t border-slate-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">DhanSetu</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering India's street vendors with blockchain-powered microloans.
            </p>
            <div className="flex gap-3">
              <button type="button" className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors" aria-label="Facebook">
                <span className="text-sm">f</span>
              </button>
              <button type="button" className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors" aria-label="X">
                <span className="text-sm">𝕏</span>
              </button>
              <button type="button" className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors" aria-label="LinkedIn">
                <span className="text-sm">in</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-slate-400 hover:text-white transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-400 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4" />
                <span>support@dhansetu.com</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Phone className="w-4 h-4" />
                <span>Mon-Sat: 9AM - 6PM</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, Maharashtra</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © 2026 DhanSetu. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <span>🔒 Secured by Blockchain</span>
            <span>✅ RBI Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

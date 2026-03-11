import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 6 + 4,
      opacity: Math.random() * 0.4 + 0.1,
    }));
    setDots(generated);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#05070d] px-4 overflow-hidden">

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/8 rounded-full blur-2xl pointer-events-none" />

      {/* Floating dots */}
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-slate-400 pointer-events-none"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
            animation: `float ${dot.duration}s ease-in-out ${dot.delay}s infinite alternate`,
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          from { transform: translateY(0px) scale(1); opacity: 0.1; }
          to   { transform: translateY(-20px) scale(1.2); opacity: 0.4; }
        }
        @keyframes glitch-1 {
          0%, 100% { clip-path: inset(0 0 95% 0); transform: translate(-4px, 0); }
          20%       { clip-path: inset(30% 0 50% 0); transform: translate(4px, 0); }
          40%       { clip-path: inset(60% 0 20% 0); transform: translate(-2px, 0); }
          60%       { clip-path: inset(80% 0 5% 0);  transform: translate(3px, 0); }
          80%       { clip-path: inset(10% 0 70% 0); transform: translate(-3px, 0); }
        }
        @keyframes glitch-2 {
          0%, 100% { clip-path: inset(40% 0 40% 0); transform: translate(4px, 0); }
          25%       { clip-path: inset(5% 0 80% 0);  transform: translate(-4px, 0); }
          50%       { clip-path: inset(70% 0 10% 0); transform: translate(2px, 0); }
          75%       { clip-path: inset(20% 0 65% 0); transform: translate(-2px, 0); }
        }
        .glitch-wrap { position: relative; display: inline-block; }
        .glitch-wrap::before,
        .glitch-wrap::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          background: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .glitch-wrap::before {
          background-image: linear-gradient(to right, #f87171, #fb923c);
          animation: glitch-1 3.5s infinite steps(1);
          opacity: 0.7;
        }
        .glitch-wrap::after {
          background-image: linear-gradient(to right, #818cf8, #a78bfa);
          animation: glitch-2 3.5s infinite steps(1);
          opacity: 0.6;
        }
      `}</style>

      {/* Main card */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full">

        {/* Glitch 404 */}
        <div className="mb-2 select-none">
          <h1
            className="glitch-wrap text-8xl md:text-[10rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 leading-none"
            data-text="404"
          >
            404
          </h1>
        </div>

        {/* Icon badge */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-900/70 border border-white/10 shadow-2xl backdrop-blur-sm
                        ring-1 ring-inset ring-white/5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔭</span>
            <div>
              <p className="text-white font-bold text-base leading-tight">Page Not Found</p>
              <p className="text-slate-400 text-xs mt-0.5">This page drifted into deep space</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm md:text-base text-center leading-relaxed mb-8 px-4">
          The page you're looking for doesn't exist or has been moved.
          The URL might be incorrect, or the page may have been deleted.
        </p>

        {/* Action buttons */}
        <div className="flex gap-3 flex-wrap justify-center mb-10">
          <Link
            to="/"
            className="group flex items-center gap-2 px-7 py-3 rounded-xl
                       bg-gradient-to-r from-blue-600 to-indigo-600
                       text-white font-semibold text-sm shadow-lg shadow-blue-900/40
                       hover:from-blue-500 hover:to-indigo-500
                       hover:-translate-y-0.5 hover:shadow-blue-700/50
                       active:scale-95 transition-all duration-200"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1V10" />
            </svg>
            Go Home
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 px-7 py-3 rounded-xl
                       bg-slate-800/60 border border-slate-600/50
                       text-slate-200 font-semibold text-sm
                       hover:bg-slate-700/70 hover:border-slate-500/70
                       hover:-translate-y-0.5
                       active:scale-95 transition-all duration-200"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Go Back
          </button>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-slate-800/60 mb-6" />

        {/* Quick links */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="text-slate-600 text-xs">Quick links:</span>
          {[
            { to: "/login",    label: "Login" },
            { to: "/register", label: "Register" },
            { to: "/",         label: "Home" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="px-3 py-1 rounded-lg text-xs font-medium
                         bg-slate-800/50 border border-slate-700/40 text-slate-300
                         hover:bg-slate-700/60 hover:text-white hover:border-slate-500/60
                         transition-all duration-150"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-[11px] mt-8 text-slate-600 text-center">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  );
};

export default NotFound;

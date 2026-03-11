import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Bell, CircleHelp, Wallet, ArrowUpRight, X, PanelRightOpen } from "lucide-react";

const QuickAccessDock = ({ role }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  if (!role) return null;

  const items =
    role === "lender"
      ? [
          { label: "Risk Analyzer", sub: "Assess loan risk", to: "/lender/risk-analyzer", icon: Sparkles },
          { label: "Withdraw", sub: "Move earnings", to: "/lender/withdrawal", icon: Wallet },
          { label: "Help", sub: "Support center", to: "/lender/help", icon: CircleHelp },
        ]
      : [
          { label: "Reminders", sub: "Due-date alerts", to: "/vendor/reminders", icon: Bell },
          { label: "Expense", sub: "Track spending", to: "/vendor/expense-tracker", icon: Wallet },
          { label: "Help", sub: "Support center", to: "/vendor/help", icon: CircleHelp },
        ];

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-4 bottom-4 z-40 rounded-xl border border-slate-600/35 bg-slate-950/85 px-4 py-3 text-slate-100 shadow-2xl backdrop-blur-xl hover:border-cyan-400/40 transition-all"
          aria-label="Open quick access"
        >
          <span className="flex items-center gap-2 text-sm font-semibold">
            <PanelRightOpen className="w-4 h-4 text-cyan-300" />
            Quick Access
          </span>
        </button>
      )}

      {isOpen && (
        <aside className="fixed right-4 bottom-4 z-40 w-72 rounded-2xl border border-slate-600/35 bg-slate-950/90 backdrop-blur-xl shadow-2xl">
          <div className="px-4 py-3 border-b border-slate-700/40 flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider text-cyan-300 font-semibold">Quick Access</p>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-slate-800"
              aria-label="Close quick access"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-3 space-y-2">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.to}
                  onClick={() => navigate(item.to)}
                  className="w-full rounded-xl border border-slate-700/40 bg-slate-900/60 px-3 py-3 text-left hover:border-cyan-400/40 hover:bg-slate-800/70 transition-all"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-100">{item.label}</p>
                        <p className="text-xs text-slate-400">{item.sub}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </div>
                </button>
              );
            })}
          </div>
        </aside>
      )}
    </>
  );
};

export default QuickAccessDock;

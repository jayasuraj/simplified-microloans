import React from "react";
import { Radar, Star, Clock3, ShieldCheck } from "lucide-react";

const opportunities = [
  {
    id: "A11",
    vendor: "Ravi Stores",
    sector: "Retail Grocery",
    amount: "3.2 ETH",
    tenure: "4 months",
    score: 82,
  },
  {
    id: "B09",
    vendor: "Maya Foods",
    sector: "Food Processing",
    amount: "6.4 ETH",
    tenure: "8 months",
    score: 76,
  },
  {
    id: "C27",
    vendor: "Anil Logistics",
    sector: "Local Delivery",
    amount: "4.1 ETH",
    tenure: "6 months",
    score: 74,
  },
];

const LenderOpportunityRadar = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="rounded-3xl border border-amber-200/35 bg-gradient-to-r from-[#4a3413] to-[#62461b] p-8 text-white relative overflow-hidden">
          <div className="absolute -left-8 -top-12 h-44 w-44 rounded-full bg-amber-300/20 blur-3xl" />
          <p className="text-amber-100 text-sm font-semibold uppercase tracking-wide">Lender Toolkit</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Opportunity Radar</h1>
          <p className="text-amber-50 mt-2">Scan high-potential loan opportunities with quick quality signals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-amber-200/30 bg-white/5 p-5 backdrop-blur-xl">
            <p className="text-sm text-amber-200">Opportunities Today</p>
            <p className="text-3xl font-bold text-white mt-1">{opportunities.length}</p>
          </div>
          <div className="rounded-2xl border border-amber-200/30 bg-white/5 p-5 backdrop-blur-xl">
            <p className="text-sm text-amber-200">Avg Quality Score</p>
            <p className="text-3xl font-bold text-amber-300 mt-1">77.3</p>
          </div>
          <div className="rounded-2xl border border-amber-200/30 bg-white/5 p-5 backdrop-blur-xl">
            <p className="text-sm text-amber-200">Priority Window</p>
            <p className="text-3xl font-bold text-cyan-300 mt-1">24 hrs</p>
          </div>
        </div>

        <div className="space-y-4">
          {opportunities.map((item) => (
            <div key={item.id} className="rounded-2xl border border-amber-200/30 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-white">{item.vendor}</p>
                  <p className="text-sm text-slate-300 mt-1">{item.sector}</p>
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="px-3 py-1 rounded-full border border-slate-500/40 text-slate-200">{item.amount}</span>
                  <span className="px-3 py-1 rounded-full border border-slate-500/40 text-slate-200">{item.tenure}</span>
                  <span className="px-3 py-1 rounded-full border border-amber-300/40 text-amber-200">Score {item.score}</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="rounded-xl border border-slate-500/30 bg-slate-900/30 p-3 text-slate-300 flex items-center gap-2">
                  <Radar className="w-4 h-4 text-cyan-300" />
                  Matched your preferred ticket size
                </div>
                <div className="rounded-xl border border-slate-500/30 bg-slate-900/30 p-3 text-slate-300 flex items-center gap-2">
                  <Clock3 className="w-4 h-4 text-amber-300" />
                  Disbursement expected in 48 hours
                </div>
                <div className="rounded-xl border border-slate-500/30 bg-slate-900/30 p-3 text-slate-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  KYC and repayment checks passed
                </div>
              </div>

              <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:opacity-95">
                <Star className="w-4 h-4" />
                Mark as Priority
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LenderOpportunityRadar;

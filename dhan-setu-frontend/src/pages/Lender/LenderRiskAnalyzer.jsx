import React, { useMemo, useState } from "react";
import { AlertTriangle, ShieldCheck, TrendingUp, CircleGauge } from "lucide-react";

const riskBands = [
  { id: "low", label: "Low", score: 22, note: "Stable cashflow and short tenure", color: "text-emerald-300" },
  { id: "medium", label: "Medium", score: 49, note: "Balanced risk with moderate returns", color: "text-amber-300" },
  { id: "high", label: "High", score: 78, note: "Higher volatility and longer recovery", color: "text-rose-300" },
];

const LenderRiskAnalyzer = () => {
  const [selectedBand, setSelectedBand] = useState("medium");
  const [loanAmount, setLoanAmount] = useState("5");
  const [tenureMonths, setTenureMonths] = useState("6");

  const selected = useMemo(() => riskBands.find((b) => b.id === selectedBand) || riskBands[1], [selectedBand]);

  const stressLoss = useMemo(() => {
    const amount = Number(loanAmount) || 0;
    const tenure = Number(tenureMonths) || 0;
    const baseFactor = selected.score / 100;
    const tenureImpact = Math.min(tenure / 24, 1);
    return (amount * (0.06 + baseFactor * 0.18 + tenureImpact * 0.08)).toFixed(3);
  }, [loanAmount, selected.score, tenureMonths]);

  const confidence = Math.max(12, 100 - selected.score);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="relative overflow-hidden rounded-3xl border border-cyan-200/30 bg-gradient-to-r from-[#0b2740] via-[#103b52] to-[#1a4a58] p-8 text-white">
          <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
          <p className="text-cyan-200 text-sm font-semibold tracking-wide uppercase">Lender Toolkit</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Risk Analyzer</h1>
          <p className="text-cyan-100 mt-2 max-w-2xl">Run a quick stress simulation before approving a loan and compare downside potential across risk bands.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-cyan-200/30 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
              <CircleGauge className="w-5 h-5 text-cyan-300" />
              Simulation Inputs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">Risk Band</label>
                <select
                  value={selectedBand}
                  onChange={(e) => setSelectedBand(e.target.value)}
                  className="w-full rounded-xl border border-cyan-200/30 bg-slate-950/40 px-3 py-2 text-slate-100"
                >
                  {riskBands.map((band) => (
                    <option key={band.id} value={band.id}>
                      {band.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Loan Amount (ETH)</label>
                <input
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full rounded-xl border border-cyan-200/30 bg-slate-950/40 px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Tenure (months)</label>
                <input
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(e.target.value)}
                  className="w-full rounded-xl border border-cyan-200/30 bg-slate-950/40 px-3 py-2 text-slate-100"
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-cyan-200/25 bg-cyan-500/10 p-4">
                <p className="text-sm text-cyan-200">Risk Score</p>
                <p className={`text-2xl font-bold mt-1 ${selected.color}`}>{selected.score}/100</p>
              </div>
              <div className="rounded-xl border border-cyan-200/25 bg-cyan-500/10 p-4">
                <p className="text-sm text-cyan-200">Estimated Stress Loss</p>
                <p className="text-2xl font-bold mt-1 text-rose-300">{stressLoss} ETH</p>
              </div>
              <div className="rounded-xl border border-cyan-200/25 bg-cyan-500/10 p-4">
                <p className="text-sm text-cyan-200">Confidence</p>
                <p className="text-2xl font-bold mt-1 text-emerald-300">{confidence}%</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-cyan-200/30 bg-white/5 p-5 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
                Recommended Move
              </h3>
              <p className="text-slate-300 text-sm">{selected.note}</p>
            </div>
            <div className="rounded-2xl border border-cyan-200/30 bg-white/5 p-5 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-300" />
                Underwriting Tip
              </h3>
              <p className="text-slate-300 text-sm">If stress loss exceeds 20% of monthly inflow, reduce ticket size or split disbursement in stages.</p>
            </div>
            <div className="rounded-2xl border border-cyan-200/30 bg-white/5 p-5 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-300" />
                Portfolio Impact
              </h3>
              <p className="text-slate-300 text-sm">Keep high-risk exposure below 30% of active capital for smoother returns.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LenderRiskAnalyzer;

import React, { useMemo, useState } from "react";
import { Calculator, Coins, Sparkles, CalendarClock } from "lucide-react";

const LenderYieldPlanner = () => {
  const [principal, setPrincipal] = useState("10");
  const [apr, setApr] = useState("16");
  const [months, setMonths] = useState("9");

  const result = useMemo(() => {
    const p = Number(principal) || 0;
    const r = (Number(apr) || 0) / 100;
    const t = (Number(months) || 0) / 12;
    const expected = p * r * t;
    const total = p + expected;
    const monthly = months ? total / Number(months) : 0;
    return {
      expected: expected.toFixed(3),
      total: total.toFixed(3),
      monthly: monthly.toFixed(3),
    };
  }, [principal, apr, months]);

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <div className="rounded-3xl border border-emerald-200/35 bg-gradient-to-r from-[#143d2f] to-[#20584a] p-8 text-white relative overflow-hidden">
          <div className="absolute -right-10 -top-14 h-52 w-52 rounded-full bg-emerald-300/20 blur-3xl" />
          <p className="text-emerald-100 text-sm font-semibold uppercase tracking-wide">Lender Toolkit</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Yield Planner</h1>
          <p className="text-emerald-50 mt-2">Project expected earnings and monthly cashflow before funding a loan.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-emerald-200/30 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-300" />
              Input Parameters
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">Principal (ETH)</label>
                <input value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full rounded-xl border border-emerald-200/30 bg-slate-950/40 px-3 py-2 text-slate-100" />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Expected APR (%)</label>
                <input value={apr} onChange={(e) => setApr(e.target.value)} className="w-full rounded-xl border border-emerald-200/30 bg-slate-950/40 px-3 py-2 text-slate-100" />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">Duration (months)</label>
                <input value={months} onChange={(e) => setMonths(e.target.value)} className="w-full rounded-xl border border-emerald-200/30 bg-slate-950/40 px-3 py-2 text-slate-100" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-emerald-200/30 bg-white/5 p-5 backdrop-blur-xl">
              <p className="text-sm text-emerald-200">Projected Profit</p>
              <p className="text-3xl font-bold text-emerald-300 mt-1 flex items-center gap-2">
                <Coins className="w-6 h-6" />
                {result.expected} ETH
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200/30 bg-white/5 p-5 backdrop-blur-xl">
              <p className="text-sm text-emerald-200">Total at Maturity</p>
              <p className="text-3xl font-bold text-white mt-1">{result.total} ETH</p>
            </div>
            <div className="rounded-2xl border border-emerald-200/30 bg-white/5 p-5 backdrop-blur-xl">
              <p className="text-sm text-emerald-200">Approx Monthly Collection</p>
              <p className="text-3xl font-bold text-cyan-300 mt-1">{result.monthly} ETH</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-emerald-200/30 bg-white/5 p-5 backdrop-blur-xl">
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <CalendarClock className="w-5 h-5 text-emerald-300" />
              Planning Tip
            </h3>
            <p className="text-slate-300 text-sm">Use staggered repayment dates to smooth incoming liquidity and reduce withdrawal timing risk.</p>
          </div>
          <div className="rounded-2xl border border-emerald-200/30 bg-white/5 p-5 backdrop-blur-xl">
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              Strategy Tip
            </h3>
            <p className="text-slate-300 text-sm">Blend short-tenure and medium-tenure loans to maintain both agility and return potential.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LenderYieldPlanner;

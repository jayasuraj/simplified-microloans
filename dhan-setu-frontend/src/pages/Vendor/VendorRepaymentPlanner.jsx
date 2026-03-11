import React, { useMemo, useState } from "react";
import { Calculator, CalendarDays, IndianRupee, Wallet } from "lucide-react";

const VendorRepaymentPlanner = () => {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [weeks, setWeeks] = useState(10);
  const [interestPercent, setInterestPercent] = useState(10);

  const result = useMemo(() => {
    const principal = Number(loanAmount) || 0;
    const duration = Number(weeks) || 0;
    const rate = Number(interestPercent) || 0;

    const interest = (principal * rate) / 100;
    const total = principal + interest;
    const weekly = duration > 0 ? total / duration : 0;

    return { principal, interest, total, weekly, duration };
  }, [loanAmount, weeks, interestPercent]);

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-16">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Repayment Planner</h1>
          <p className="mt-2 text-white/90 text-base sm:text-lg">Check weekly payment before you take a loan.</p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="rounded-3xl bg-white border-2 border-gray-200 p-6 shadow-lg">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-600" />
              Loan Inputs
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">Loan Amount (Rupees)</label>
                <input
                  type="number"
                  value={loanAmount}
                  min="0"
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-lg focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">Repayment Time (Weeks)</label>
                <input
                  type="number"
                  value={weeks}
                  min="1"
                  onChange={(e) => setWeeks(e.target.value)}
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-lg focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1">Interest (%)</label>
                <input
                  type="number"
                  value={interestPercent}
                  min="0"
                  onChange={(e) => setInterestPercent(e.target.value)}
                  className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 text-lg focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white border-2 border-gray-200 p-6 shadow-lg">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-emerald-600" />
              Payment Result
            </h2>

            <div className="space-y-3">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex items-center justify-between">
                <span className="text-slate-600">Loan Amount</span>
                <span className="font-bold text-slate-900 inline-flex items-center gap-1"><IndianRupee className="w-4 h-4" />{result.principal.toLocaleString("en-IN")}</span>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex items-center justify-between">
                <span className="text-slate-600">Interest</span>
                <span className="font-bold text-slate-900 inline-flex items-center gap-1"><IndianRupee className="w-4 h-4" />{result.interest.toLocaleString("en-IN")}</span>
              </div>
              <div className="rounded-2xl bg-indigo-50 border border-indigo-200 p-4 flex items-center justify-between">
                <span className="text-slate-700 font-semibold">Total to Pay</span>
                <span className="font-extrabold text-indigo-700 inline-flex items-center gap-1"><IndianRupee className="w-4 h-4" />{result.total.toLocaleString("en-IN")}</span>
              </div>
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex items-center justify-between">
                <span className="text-slate-700 font-semibold inline-flex items-center gap-1"><CalendarDays className="w-4 h-4" />Weekly Payment</span>
                <span className="font-extrabold text-emerald-700 inline-flex items-center gap-1"><IndianRupee className="w-4 h-4" />{result.weekly.toFixed(0)}</span>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">Tip: Choose a weekly payment amount you can repay comfortably.</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default VendorRepaymentPlanner;


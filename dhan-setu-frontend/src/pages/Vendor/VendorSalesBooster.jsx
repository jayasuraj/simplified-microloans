import React, { useMemo, useState } from "react";
import { LineChart, Lightbulb, IndianRupee, CalendarDays } from "lucide-react";

const VendorSalesBooster = () => {
  const [weekdaySales, setWeekdaySales] = useState({ mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 });

  const insight = useMemo(() => {
    const entries = Object.entries(weekdaySales).map(([day, value]) => ({ day, value: Number(value) || 0 }));
    const total = entries.reduce((sum, row) => sum + row.value, 0);
    const avg = total / 7;
    const best = [...entries].sort((a, b) => b.value - a.value)[0];
    const worst = [...entries].sort((a, b) => a.value - b.value)[0];

    return { total, avg, best, worst };
  }, [weekdaySales]);

  const dayLabel = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };

  return (
    <div className="min-h-screen">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 mb-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-violet-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-300">
          <Lightbulb className="w-4 h-4" />
          Extra Feature
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Sales Booster</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-300">Enter weekly sales to get simple business insights and action tips.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-bold text-white mb-4 inline-flex items-center gap-2"><CalendarDays className="w-5 h-5" />Weekly Sales Input</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.keys(weekdaySales).map((key) => (
              <div key={key} className="rounded-2xl border border-white/10 p-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">{dayLabel[key]}</label>
                <input
                  type="number"
                  min="0"
                  value={weekdaySales[key]}
                  onChange={(e) => setWeekdaySales((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white"
                  placeholder="0"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3">
          <h2 className="text-lg font-bold text-white inline-flex items-center gap-2"><LineChart className="w-5 h-5" />Insights</h2>

          <div className="rounded-2xl border border-white/10 p-4">
            <p className="text-xs text-gray-400">Total Weekly Sales</p>
            <p className="text-2xl font-bold text-blue-300 inline-flex items-center gap-1"><IndianRupee className="w-5 h-5" />{insight.total.toLocaleString("en-IN")}</p>
          </div>
          <div className="rounded-2xl border border-white/10 p-4">
            <p className="text-xs text-gray-400">Average Daily Sales</p>
            <p className="text-2xl font-bold text-emerald-300 inline-flex items-center gap-1"><IndianRupee className="w-5 h-5" />{Math.round(insight.avg).toLocaleString("en-IN")}</p>
          </div>
          <div className="rounded-2xl border border-white/10 p-4">
            <p className="text-xs text-gray-400">Best Day</p>
            <p className="text-base font-bold text-violet-300">{dayLabel[insight.best.day]}</p>
            <p className="text-xs text-gray-400">Try extra stock on this day.</p>
          </div>
          <div className="rounded-2xl border border-white/10 p-4">
            <p className="text-xs text-gray-400">Needs Attention</p>
            <p className="text-base font-bold text-amber-300">{dayLabel[insight.worst.day]}</p>
            <p className="text-xs text-gray-400">Offer combo deals or discounts.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VendorSalesBooster;

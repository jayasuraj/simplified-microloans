import React, { useEffect, useMemo, useState } from "react";
import { CheckSquare, Square, RotateCcw } from "lucide-react";

const STORAGE_KEY = "vendor_daily_checklist_v1";

const VendorDailyChecklist = () => {
  const [items, setItems] = useState([
    { id: "open-app", label: "Open app and check dashboard", done: false },
    { id: "check-loans", label: "Check loan status", done: false },
    { id: "check-due", label: "Check repayment due date", done: false },
    { id: "save-proof", label: "Save payment proof", done: false },
    { id: "need-help", label: "If issue, call support", done: false },
  ]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setItems(parsed);
    } catch {
      // ignore invalid local data
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const completed = useMemo(() => items.filter((i) => i.done).length, [items]);

  const toggleItem = (id) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  };

  const resetAll = () => {
    setItems((prev) => prev.map((item) => ({ ...item, done: false })));
  };

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-16">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Daily Checklist</h1>
          <p className="mt-2 text-white/90 text-base sm:text-lg">Simple checklist for every day work.</p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-12">
        <section className="rounded-3xl bg-white border-2 border-gray-200 p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <p className="text-lg font-bold text-slate-900">Progress: {completed}/{items.length}</p>
            <button
              onClick={resetAll}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 hover:bg-slate-200 px-4 py-2 font-semibold text-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`w-full flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                  item.done
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-white border-gray-200 hover:bg-slate-50"
                }`}
              >
                {item.done ? (
                  <CheckSquare className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                ) : (
                  <Square className="w-6 h-6 text-slate-500 flex-shrink-0" />
                )}
                <span className={`text-base ${item.done ? "text-emerald-700 font-semibold" : "text-slate-800"}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-4 text-xs text-slate-500">Your checklist is saved automatically on this device.</p>
        </section>
      </main>
    </div>
  );
};

export default VendorDailyChecklist;


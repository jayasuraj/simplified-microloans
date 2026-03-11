import React, { useMemo, useState } from "react";
import { PiggyBank, PlusCircle, Trash2, IndianRupee, TrendingUp, TrendingDown } from "lucide-react";

const VendorExpenseTracker = () => {
  const [sales, setSales] = useState(0);
  const [expenses, setExpenses] = useState([{ id: 1, label: "Stock Purchase", amount: 0 }]);

  const addExpense = () => {
    setExpenses((prev) => [...prev, { id: Date.now(), label: "", amount: 0 }]);
  };

  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const updateExpense = (id, field, value) => {
    setExpenses((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const totals = useMemo(() => {
    const expenseTotal = expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const totalSales = Number(sales) || 0;
    const profit = totalSales - expenseTotal;
    return {
      expenseTotal,
      totalSales,
      profit,
      margin: totalSales > 0 ? (profit / totalSales) * 100 : 0,
    };
  }, [expenses, sales]);

  return (
    <div className="min-h-screen">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 mb-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
          <PiggyBank className="w-4 h-4" />
          Extra Feature
        </p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Expense Tracker</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-300">Track daily sales and expenses to know your real profit.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="mb-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Today Sales</label>
            <input
              type="number"
              value={sales}
              min="0"
              onChange={(e) => setSales(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white"
              placeholder="Enter total sales"
            />
          </div>

          <div className="space-y-3">
            {expenses.map((item) => (
              <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 rounded-2xl border border-white/10 p-3">
                <input
                  value={item.label}
                  onChange={(e) => updateExpense(item.id, "label", e.target.value)}
                  className="sm:col-span-7 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white"
                  placeholder="Expense title"
                />
                <input
                  type="number"
                  min="0"
                  value={item.amount}
                  onChange={(e) => updateExpense(item.id, "amount", e.target.value)}
                  className="sm:col-span-4 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white"
                  placeholder="Amount"
                />
                <button
                  onClick={() => removeExpense(item.id)}
                  className="sm:col-span-1 inline-flex items-center justify-center rounded-xl border border-red-400/25 px-3 py-2 text-red-300 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addExpense}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2.5 text-sm font-bold text-white"
          >
            <PlusCircle className="w-4 h-4" /> Add Expense
          </button>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3">
          <h2 className="text-lg font-bold text-white">Profit Summary</h2>
          <div className="rounded-2xl border border-white/10 p-4">
            <p className="text-xs text-gray-400">Sales</p>
            <p className="text-2xl font-bold text-blue-300 inline-flex items-center gap-1">
              <IndianRupee className="w-5 h-5" />{totals.totalSales.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 p-4">
            <p className="text-xs text-gray-400">Expenses</p>
            <p className="text-2xl font-bold text-red-300 inline-flex items-center gap-1">
              <IndianRupee className="w-5 h-5" />{totals.expenseTotal.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 p-4">
            <p className="text-xs text-gray-400">Net Profit</p>
            <p className={`text-2xl font-bold inline-flex items-center gap-1 ${totals.profit >= 0 ? "text-emerald-300" : "text-amber-300"}`}>
              <IndianRupee className="w-5 h-5" />{totals.profit.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-gray-400 mt-1 inline-flex items-center gap-1">
              {totals.margin >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />} Margin: {totals.margin.toFixed(1)}%
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VendorExpenseTracker;

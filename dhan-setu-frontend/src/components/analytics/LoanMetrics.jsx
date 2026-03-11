import React from 'react';
import { TrendingUp, Users, DollarSign, Clock } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * Advanced Loan Metrics Component
 */
const LoanMetrics = ({ data = {}, type = 'vendor' }) => {
  const {
    monthlyData = [],
    loansByStatus = [],
    repaymentRate = 0,
    averageLoanAmount = 0,
  } = data;

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      {/* Loan Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Distribution by Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={loansByStatus}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {loansByStatus.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Loan Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="colorLoans" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="loans" stroke="#3b82f6" fillOpacity={1} fill="url(#colorLoans)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Repayment Rate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium opacity-90">Repayment Rate</h4>
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-4xl font-bold mb-1">{repaymentRate}%</p>
          <p className="text-sm opacity-75">On-time payments</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium opacity-90">Avg. Loan Amount</h4>
            <DollarSign className="w-5 h-5" />
          </div>
          <p className="text-4xl font-bold mb-1">{averageLoanAmount} ETH</p>
          <p className="text-sm opacity-75">Across all loans</p>
        </div>
      </div>
    </div>
  );
};

export default LoanMetrics;

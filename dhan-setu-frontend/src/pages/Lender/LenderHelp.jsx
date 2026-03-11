// src/pages/lender/LenderHelp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HelpCircle,
  FileText,
  CreditCard,
  BarChart3,
  Shield,
  Wallet,
  CheckCircle,
  ChevronDown,
  Mail,
  BookOpen,
  ShieldCheck,
  Calculator,
  Radar
} from "lucide-react";

const HelpHeader = () => (
  <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
    
    <div className="relative z-10 px-8 py-16 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4">
        <BookOpen className="w-4 h-4 text-white" />
        <span className="text-white font-medium">Knowledge Base</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Lender Help Center
      </h1>
      <p className="text-blue-100 text-lg max-w-2xl mx-auto">
        Comprehensive guides for managing your lending portfolio and understanding platform features
      </p>
    </div>
  </div>
);

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: FileText,
      title: "Review Loans",
      description: "Access loan requests to evaluate vendor details and repayment schedules.",
      color: "from-blue-600 to-cyan-600",
      path: "/lender/loans"
    },
    {
      icon: ShieldCheck,
      title: "Risk Analyzer",
      description: "Estimate stress loss before approval to keep exposure balanced.",
      color: "from-emerald-600 to-teal-600",
      path: "/lender/risk-analyzer"
    },
    {
      icon: Calculator,
      title: "Yield Planner",
      description: "Project expected return and monthly cashflow on any ticket size.",
      color: "from-amber-500 to-orange-500",
      path: "/lender/yield-planner"
    },
    {
      icon: Radar,
      title: "Opportunity Radar",
      description: "Scan shortlisted opportunities and prioritize high-quality deals.",
      color: "from-slate-700 to-slate-900",
      path: "/lender/opportunity-radar"
    }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {actions.map((action) => {
        const IconComponent = action.icon;
        return (
          <button
            key={action.title}
            onClick={() => navigate(action.path)}
            className={`text-left bg-gradient-to-r ${action.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105`}
          >
            <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
              <IconComponent className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
            <p className="text-white/90 text-sm leading-relaxed">
              {action.description}
            </p>
          </button>
        );
      })}
    </section>
  );
};

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-900">{question}</span>
        <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-6 pb-4 pt-2 text-slate-700 bg-slate-50 border-t border-slate-200 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

const FaqSection = () => (
  <section className="space-y-4">
    <div className="flex items-center gap-2 mb-4">
      <HelpCircle className="w-6 h-6 text-blue-600" />
      <h2 className="text-xl font-semibold text-slate-900">
        Frequently Asked Questions
      </h2>
    </div>
    <FAQItem
      question="How do I fund a loan?"
      answer={
        <>
          Go to the <span className="font-semibold">Loan Requests</span> page,
          review vendor details, and click <span className="font-semibold">Fund</span>. 
          Your wallet will open for confirmation. Once confirmed, ETH is sent to
          the smart contract and the loan becomes active.
        </>
      }
    />
    <FAQItem
      question="Is my money safe in the platform?"
      answer={
        <>
          All funds move through Ethereum{" "}
          <span className="font-semibold">smart contracts</span>. The rules are
          transparent and on-chain, so loans and repayments follow predefined
          logic and cannot be altered secretly.
        </>
      }
    />
    <FAQItem
      question="Where can I see my repayments?"
      answer={
        <>
          Use the <span className="font-semibold">Dashboard</span> for a
          high-level summary, and the{" "}
          <span className="font-semibold">Transactions</span> page for a
          detailed list of each repayment and its date.
        </>
      }
    />
    <FAQItem
      question="What happens if a vendor is late on repayment?"
      answer={
        <>
          Late or missed repayments are shown in your{" "}
          <span className="font-semibold">Loans</span> section with a status.
          Any penalties or follow-up steps are defined in the loan&apos;s smart
          contract terms.
        </>
      }
    />
  </section>
);

const SupportCard = () => (
  <section className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-8">
    <div className="flex items-start gap-4">
      <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
        <Mail className="w-7 h-7 text-white" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Need Additional Support?
        </h3>
        <p className="text-slate-700 mb-4">
          Our dedicated support team is available to assist you with any questions or concerns.
        </p>
        <div className="flex items-center gap-2 text-blue-700">
          <Mail className="w-4 h-4" />
          <a
            href="mailto:support@dhansetu.io"
            className="font-semibold hover:text-purple-700 transition"
          >
            support@dhansetu.io
          </a>
        </div>
        <p className="text-sm text-slate-600 mt-3">
          <CheckCircle className="w-4 h-4 inline mr-1" />
          Include your wallet address and loan ID for faster resolution
        </p>
      </div>
    </div>
  </section>
);

const LenderHelp = () => {
  const sections = [
    {
      icon: CreditCard,
      title: "Funding a Loan",
      content: "In the Loan Requests section, each card displays the ETH amount required, the vendor's purpose, and their repayment schedule. When you choose to fund, your wallet will prompt for confirmation before transferring ETH to the loan smart contract."
    },
    {
      icon: Shield,
      title: "Smart Contract Security",
      content: "All loans on DhanSetu are processed through Ethereum smart contracts, ensuring:",
      list: [
        "Transparent and immutable rules for disbursement and repayment",
        "Automated execution without manual intervention",
        "Complete on-chain transaction history and audibility"
      ]
    },
    {
      icon: BarChart3,
      title: "Portfolio Tracking",
      content: "Your Lender Dashboard provides comprehensive oversight: total loans funded, repayments received, and active vendor relationships. For granular loan details, access the Loans section. Transaction history provides a complete record of all payment movements."
    },
    {
      icon: Wallet,
      title: "Wallet & Repayments",
      content: "Your wallet balance reflects all received repayments. As vendors make payments, the smart contract automatically allocates and transfers your share directly to your linked wallet address."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <HelpHeader />
        <QuickActions />
        
        {/* Main Content */}
        <div className="space-y-6">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <div key={section.title} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {section.title}
                  </h2>
                </div>
                <p className="text-slate-700 leading-relaxed mb-4">
                  {section.content}
                </p>
                {section.list && (
                  <ul className="space-y-2">
                    {section.list.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700">
                        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <FaqSection />
          </div>

          {/* Support Section */}
          <SupportCard />
        </div>
      </div>
    </div>
  );
};

export default LenderHelp;

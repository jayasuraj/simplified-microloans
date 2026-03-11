// Simple Tutorial Page for Street Vendors
import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Play,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Wallet,
  FileText,
  CreditCard,
  Shield,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const VendorTutorial = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      id: 0,
      title: "Welcome to DhanSetu",
      description: "This app helps you request and manage microloans for your business. No long bank queue and no complex paperwork.",
      icon: Smartphone,
      gradient: "from-blue-500 to-cyan-500",
      tips: [
        "Keep your phone charged",
        "Use a stable internet connection",
        "Ask a trusted person for help if needed"
      ]
    },
    {
      id: 1,
      title: "What is a Wallet?",
      description: "A wallet is a secure digital app where your loan funds are received. MetaMask is one common wallet.",
      icon: Wallet,
      gradient: "from-purple-500 to-pink-500",
      tips: [
        "Never share your wallet password",
        "Store your secret phrase safely",
        "Without the secret phrase, recovery is difficult",
        "Contact support if you need setup help"
      ]
    },
    {
      id: 2,
      title: "How to Apply for a Loan",
      description: "Fill a short form with your name, phone number, Aadhaar details, required amount, and loan purpose.",
      icon: FileText,
      gradient: "from-emerald-500 to-teal-500",
      tips: [
        "Upload clear Aadhaar photos",
        "Upload a clear photo of your shop or stall",
        "Use an active phone number for OTP",
        "Write a clear and honest loan purpose"
      ]
    },
    {
      id: 3,
      title: "After Loan Approval",
      description: "Once approved by a lender, funds are sent to your wallet and a notification appears in the app.",
      icon: CheckCircle,
      gradient: "from-green-500 to-emerald-500",
      tips: [
        "Check notifications regularly",
        "Track wallet balance from the dashboard",
        "Save transaction receipts",
        "Contact support for any issue"
      ]
    },
    {
      id: 4,
      title: "Repaying the Loan",
      description: "Go to Transactions, click Repay, connect your wallet, and confirm the repayment.",
      icon: CreditCard,
      gradient: "from-orange-500 to-red-500",
      tips: [
        "Repay on time to keep a strong profile",
        "Repayment history helps future approvals",
        "Contact support before due date if needed",
        "Keep all repayment receipts"
      ]
    },
    {
      id: 5,
      title: "Security Basics",
      description: "Never share OTP, password, or wallet secret phrase with anyone.",
      icon: Shield,
      gradient: "from-red-500 to-pink-500",
      tips: [
        "Support never asks for OTP on call",
        "Report suspicious calls immediately",
        "Protect your phone with PIN or lock",
        "Avoid transactions on public Wi-Fi"
      ]
    }
  ];

  const currentTutorial = tutorialSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    navigate("/vendor");
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        setCurrentStep((prev) => Math.min(prev + 1, tutorialSteps.length - 1));
      }
      if (event.key === "ArrowLeft") {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [tutorialSteps.length]);

  const CurrentIcon = currentTutorial.icon;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/10" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xl border-2 border-white/30 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Tutorial</h1>
                <p className="text-sm text-white/80">Step {currentStep + 1} of {tutorialSteps.length}</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/vendor")}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 mt-2 pb-12">
        <div className="rounded-3xl bg-white border-2 border-gray-200 shadow-2xl overflow-hidden">
          
          {/* Current Step Content */}
          <div className="p-8 md:p-12">
            {/* Icon and Heading */}
            <div className="text-center mb-8">
              <div className={`inline-flex w-24 h-24 rounded-full bg-gradient-to-br ${currentTutorial.gradient} items-center justify-center shadow-2xl mb-4 animate-bounce`}>
                <CurrentIcon className="w-11 h-11 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {currentTutorial.title}
              </h2>
            </div>

            <div className="mb-8 text-center max-w-2xl mx-auto">
              <p className="text-lg text-gray-800 leading-relaxed mb-4 font-medium">
                {currentTutorial.description}
              </p>
            </div>

            {/* Tips Section */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <span>Important Tips</span>
              </h3>
              <ul className="space-y-3">
                {currentTutorial.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-base text-blue-900">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="bg-gray-50 border-t-2 border-gray-200 px-8 py-6 flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Back</span>
            </button>

            {/* Step Indicators */}
            <div className="flex gap-2">
              {tutorialSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentStep
                      ? 'bg-indigo-600 w-8'
                      : index < currentStep
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                  title={`Step ${index + 1}`}
                />
              ))}
            </div>

            {currentStep < tutorialSteps.length - 1 ? (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-105 transition-all shadow-lg"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg hover:scale-105 transition-all shadow-xl"
              >
                <CheckCircle className="w-6 h-6" />
                <span>Start</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Actions Below */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/vendor/help")}
            className="p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  Open Help Center
                </h3>
                <p className="text-sm text-gray-600">More details and FAQs</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => alert("Video tutorials are coming soon.")}
            className="p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  Video Tutorials
                </h3>
                <p className="text-sm text-gray-600">Watch and learn (Coming soon)</p>
              </div>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
};

export default VendorTutorial;


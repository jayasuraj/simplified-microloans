import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import ErrorBoundary from "./components/common/ErrorBoundary";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";

// Lender Pages
import LenderDashboard from "./pages/Lender/Dashboard";
import LenderLoans from "./pages/Lender/LenderLoans";
import LenderTransactions from "./pages/Lender/LenderTransactions";
import LenderSettings from "./pages/Lender/LenderSettings";
import LenderProfile from "./pages/Lender/LenderProfile";
import LenderHelp from "./pages/Lender/LenderHelp";
import LenderPortfolio from "./pages/Lender/LenderPortfolio";
import LenderWithdrawal from "./pages/Lender/LenderWithdrawal";
import LenderInvestmentHistory from "./pages/Lender/LenderInvestmentHistory";
import LenderRiskAnalyzer from "./pages/Lender/LenderRiskAnalyzer";
import LenderYieldPlanner from "./pages/Lender/LenderYieldPlanner";
import LenderOpportunityRadar from "./pages/Lender/LenderOpportunityRadar";

// Vendor Pages - Updated with Modern UI
import VendorDashboard from "./pages/Vendor/Dashboard";
import VendorLoans from "./pages/Vendor/VendorLoans";
import VendorTransactions from "./pages/Vendor/VendorTransactions";
import VendorSettings from "./pages/Vendor/VendorSettings";
import VendorProfile from "./pages/Vendor/VendorProfile";
import VendorHelp from "./pages/Vendor/VendorHelp";
import LoanRequestForm from "./pages/Vendor/LoanRequestForm";
import VendorTutorial from "./pages/Vendor/VendorTutorial";
import VendorQuickGuide from "./pages/Vendor/VendorQuickGuide";
import VendorEasyAssist from "./pages/Vendor/VendorEasyAssist";
import VendorRepaymentPlanner from "./pages/Vendor/VendorRepaymentPlanner";
import VendorDailyChecklist from "./pages/Vendor/VendorDailyChecklist";
import VendorReminderCenter from "./pages/Vendor/VendorReminderCenter";
import VendorExpenseTracker from "./pages/Vendor/VendorExpenseTracker";
import VendorSalesBooster from "./pages/Vendor/VendorSalesBooster";

// Auth & Common Pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import VerifyOtp from "./pages/Auth/VerifyOTP";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import EmailVerificationSuccess from "./pages/Auth/EmailVerificationSuccess";
import TwoFactorSetup from "./pages/Auth/TwoFactorSetup";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/email-verified" element={<EmailVerificationSuccess />} />
          <Route path="/2fa-setup" element={<TwoFactorSetup />} />

          {/* Lender Dashboard Routes - Protected */}
          <Route 
            path="/lender" 
            element={
              <ProtectedRoute requiredRole="lender">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<LenderDashboard />} />
            <Route path="loans" element={<LenderLoans />} />
            <Route path="portfolio" element={<LenderPortfolio />} />
            <Route path="investments" element={<LenderInvestmentHistory />} />
            <Route path="transactions" element={<LenderTransactions />} />
            <Route path="withdrawal" element={<LenderWithdrawal />} />
            <Route path="risk-analyzer" element={<LenderRiskAnalyzer />} />
            <Route path="yield-planner" element={<LenderYieldPlanner />} />
            <Route path="opportunity-radar" element={<LenderOpportunityRadar />} />
            <Route path="settings" element={<LenderSettings />} />
            <Route path="profile" element={<LenderProfile />} />
            <Route path="help" element={<LenderHelp />} />
          </Route>

          {/* Vendor Dashboard Routes - Protected */}
          <Route 
            path="/vendor" 
            element={
              <ProtectedRoute requiredRole="vendor">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<VendorDashboard />} />
            <Route path="loans" element={<VendorLoans />} />
            <Route path="transactions" element={<VendorTransactions />} />
            <Route path="settings" element={<VendorSettings />} />
            <Route path="profile" element={<VendorProfile />} />
            <Route path="help" element={<VendorHelp />} />
            <Route path="request-loan" element={<LoanRequestForm />} />
            <Route path="tutorial" element={<VendorTutorial />} />
            <Route path="quick-guide" element={<VendorQuickGuide />} />
            <Route path="easy" element={<VendorEasyAssist />} />
            <Route path="planner" element={<VendorRepaymentPlanner />} />
            <Route path="checklist" element={<VendorDailyChecklist />} />
            <Route path="reminders" element={<VendorReminderCenter />} />
            <Route path="expense-tracker" element={<VendorExpenseTracker />} />
            <Route path="sales-booster" element={<VendorSalesBooster />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

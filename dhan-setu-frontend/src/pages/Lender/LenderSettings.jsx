// src/pages/lender/LenderSettings.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";
import {
  Settings,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Shield,
  CheckCircle,
  AlertCircle,
  Mail,
  MessageSquare,
  Smartphone,
  Globe,
  Save,
  RefreshCw,
  Key,
  Wallet,
  LogOut,
  Trash2,
} from "lucide-react";

const BASE_URL = API_BASE_URL;

const LenderSettings = () => {
  const lenderId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Tab and State Management
  const [activeTab, setActiveTab] = useState("notifications");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  // Settings State
  const [lender, setLender] = useState(null);
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    loanUpdates: true,
    repaymentReminders: true,

    // Preferences
    language: "English",
    theme: "light",

    // Security
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",

    // Contact
    phone: "",
    walletAddress: "",
  });

  // Fetch Lender Data
  useEffect(() => {
    const fetchLender = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/lender/profile/${lenderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.data;
        setLender(data);
        setSettings((prev) => ({
          ...prev,
          phone: data.phone || "",
          walletAddress: data.walletAddress || "",
          language: data.language || "English",
          theme: data.theme || "light",
          emailNotifications:
            typeof data.notifyByEmail === "boolean" ? data.notifyByEmail : true,
          smsNotifications:
            typeof data.notifyBySMS === "boolean" ? data.notifyBySMS : false,
        }));
      } catch (error) {
        console.error("Error fetching lender", error);
        setMessage({
          type: "error",
          text: "Failed to load your settings. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };

    if (lenderId && token) fetchLender();
  }, [lenderId, token]);

  const handleSave = async (section) => {
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      let updateData = {};

      if (section === "notifications") {
        updateData = {
          notifyByEmail: settings.emailNotifications,
          notifyBySMS: settings.smsNotifications,
        };
      } else if (section === "preferences") {
        updateData = {
          language: settings.language,
          theme: settings.theme,
        };
      } else if (section === "security") {
        if (settings.newPassword !== settings.confirmPassword) {
          setMessage({
            type: "error",
            text: "Passwords do not match!",
          });
          setSaving(false);
          setTimeout(() => setMessage({ type: "", text: "" }), 3000);
          return;
        }
        if (settings.newPassword && settings.newPassword.length < 8) {
          setMessage({
            type: "error",
            text: "Password must be at least 8 characters long!",
          });
          setSaving(false);
          setTimeout(() => setMessage({ type: "", text: "" }), 3000);
          return;
        }
        updateData = {};
        if (settings.newPassword) {
          updateData.password = settings.newPassword;
          updateData.oldPassword = settings.oldPassword;
        }
      } else if (section === "contact") {
        updateData = {
          phone: settings.phone,
        };
      }

      const response = await axios.put(
        `${BASE_URL}/lender/update/${lenderId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setMessage({
          type: "success",
          text: `${section.charAt(0).toUpperCase() + section.slice(1)} settings updated successfully!`,
        });

        // Reset password fields
        if (section === "security") {
          setSettings((prev) => ({
            ...prev,
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }));
        }
      }
    } catch (error) {
      console.error("Error saving settings", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update settings",
      });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    }
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "⚠️ Are you sure you want to delete your account? This action cannot be undone and your lending history will be archived."
    );
    if (!confirmed) return;

    alert(
      "Account deletion is not yet automated. Please contact support@dhansetu.io with your verified email to proceed."
    );
  };

  const tabs = [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "preferences", label: "Preferences", icon: Settings },
    { id: "contact", label: "Contact Info", icon: Smartphone },
  ];


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin shadow-lg"></div>
          <p className="text-slate-700 font-medium text-lg">
            Loading your settings...
          </p>
        </div>
      </div>
    );
  }

  if (!lender) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 text-center">
            <p className="text-red-600 font-semibold text-lg">
              Unable to load your settings. Please try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="relative rounded-3xl overflow-hidden mb-8 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-96 -mt-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>

          <div className="relative z-10 px-6 md:px-8 py-12 md:py-16">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-lg border border-white/30">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Settings
                </h1>
                <p className="text-blue-100 mt-2 text-lg">
                  Manage your account preferences and security
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Banner */}
        {message.text && (
          <div
            className={`mb-6 rounded-2xl px-6 py-4 border flex items-center gap-3 shadow-lg animate-in fade-in slide-in-from-top-2 ${
              message.type === "success"
                ? "bg-green-50 border-green-300 text-green-800"
                : "bg-red-50 border-red-300 text-red-800"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
            )}
            <p className="font-medium">{message.text}</p>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="space-y-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                      : "text-slate-700 hover:bg-white/80 hover:shadow-md bg-white/60 backdrop-blur-sm border border-white/40"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* ============ NOTIFICATIONS TAB ============ */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Bell className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900">
                      Notification Preferences
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {/* Email Notifications */}
                    <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-purple-50/50 border border-blue-100 hover:border-blue-200 transition cursor-pointer">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Mail className="w-4 h-4 text-blue-600" />
                          <p className="font-semibold text-slate-900">
                            Email Notifications
                          </p>
                        </div>
                        <p className="text-xs text-slate-600">
                          Receive loan updates and account alerts via email
                        </p>
                      </div>
                      <label className="inline-flex items-center cursor-pointer flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) =>
                            setSettings((prev) => ({
                              ...prev,
                              emailNotifications: e.target.checked,
                            }))
                          }
                          className="sr-only"
                        />
                        <span
                          className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-all duration-300 ${
                            settings.emailNotifications
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                              : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                              settings.emailNotifications
                                ? "translate-x-5"
                                : "translate-x-0"
                            }`}
                          />
                        </span>
                      </label>
                    </div>

                    {/* SMS Notifications */}
                    <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/50 to-pink-50/50 border border-purple-100 hover:border-purple-200 transition cursor-pointer">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Smartphone className="w-4 h-4 text-purple-600" />
                          <p className="font-semibold text-slate-900">
                            SMS Notifications
                          </p>
                        </div>
                        <p className="text-xs text-slate-600">
                          Get critical alerts via SMS for time-sensitive updates
                        </p>
                      </div>
                      <label className="inline-flex items-center cursor-pointer flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={settings.smsNotifications}
                          onChange={(e) =>
                            setSettings((prev) => ({
                              ...prev,
                              smsNotifications: e.target.checked,
                            }))
                          }
                          className="sr-only"
                        />
                        <span
                          className={`w-11 h-6 flex items-center rounded-full p-0.5 transition-all duration-300 ${
                            settings.smsNotifications
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                              : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                              settings.smsNotifications
                                ? "translate-x-5"
                                : "translate-x-0"
                            }`}
                          />
                        </span>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSave("notifications")}
                    disabled={saving}
                    className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:shadow-lg hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Preferences
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ============ SECURITY TAB ============ */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Lock className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900">
                      Change Password
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {/* Old Password */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Old Password
                      </label>
                      <div className="relative">
                        <input
                          type={showOldPassword ? "text" : "password"}
                          value={settings.oldPassword}
                          onChange={(e) =>
                            setSettings((prev) => ({
                              ...prev,
                              oldPassword: e.target.value,
                            }))
                          }
                          placeholder="Enter your current password"
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition font-medium"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowOldPassword(!showOldPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition"
                        >
                          {showOldPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={settings.newPassword}
                          onChange={(e) =>
                            setSettings((prev) => ({
                              ...prev,
                              newPassword: e.target.value,
                            }))
                          }
                          placeholder="Enter a new password (minimum 8 characters)"
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition font-medium"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowNewPassword(!showNewPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 mt-2">
                        Password must be at least 8 characters long
                      </p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={settings.confirmPassword}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                        placeholder="Confirm your new password"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition font-medium"
                      />
                    </div>
                  </div>

                  {/* Security Tips */}
                  <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-bold text-slate-900 mb-2">
                          Security Tips
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-slate-700">
                          <li>Use a strong, unique password</li>
                          <li>Never share your password with anyone</li>
                          <li>Enable 2FA for extra protection</li>
                          <li>Change your password regularly</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSave("security")}
                    disabled={saving || !settings.newPassword}
                    className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:shadow-lg hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Key className="w-4 h-4" />
                        Update Password
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ============ PREFERENCES TAB ============ */}
            {activeTab === "preferences" && (
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Settings className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900">
                      App Preferences
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {/* Language */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        <Globe className="w-4 h-4 inline mr-2" />
                        Language
                      </label>
                      <select
                        value={settings.language}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            language: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition font-medium bg-white"
                      >
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Spanish</option>
                      </select>
                    </div>

                    {/* Theme */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Theme
                      </label>
                      <select
                        value={settings.theme}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            theme: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition font-medium bg-white"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto (System)</option>
                      </select>
                    </div>

                    {/* Account Info Section */}
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <h3 className="font-semibold text-slate-900 mb-4">
                        Account Information
                      </h3>

                      <div className="space-y-4">
                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address (Read-only)
                          </label>
                          <input
                            type="email"
                            value={lender?.email || ""}
                            disabled
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium cursor-not-allowed"
                          />
                        </div>

                        {/* Wallet Address */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            <Wallet className="w-4 h-4 inline mr-2" />
                            Payout Wallet (Read-only)
                          </label>
                          {lender?.walletAddress ? (
                            <input
                              type="text"
                              value={lender.walletAddress}
                              disabled
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-mono text-sm cursor-not-allowed break-all"
                            />
                          ) : (
                            <div className="px-4 py-3 rounded-lg border border-amber-200 bg-amber-50 text-amber-700 text-sm">
                              ⚠️ No wallet connected. Add a wallet in your
                              profile to receive repayments.
                            </div>
                          )}
                        </div>

                        {/* Last Login */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            <LogOut className="w-4 h-4 inline mr-2" />
                            Last Login
                          </label>
                          <input
                            type="text"
                            value={
                              lender?.lastLogin
                                ? new Date(
                                    lender.lastLogin
                                  ).toLocaleString("en-IN")
                                : "Not available"
                            }
                            disabled
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSave("preferences")}
                    disabled={saving}
                    className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:shadow-lg hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Preferences
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ============ CONTACT INFO TAB ============ */}
            {activeTab === "contact" && (
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Smartphone className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-slate-900">
                      Contact Information
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={settings.phone}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        placeholder="+91 9XXXXXXXXX"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition font-medium"
                      />
                      <p className="text-xs text-slate-600 mt-2">
                        This number will be used for account recovery and
                        notifications
                      </p>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Email Address (Read-only)
                      </label>
                      <input
                        type="email"
                        value={lender?.email || ""}
                        disabled
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleSave("contact")}
                    disabled={saving}
                    className="mt-6 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:shadow-lg hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Update Contact
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Support and Danger Zone */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Support Card */}
          <div className="border border-blue-200 rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-lg">
                  Need Help?
                </p>
                <p className="text-slate-700 mt-2 leading-relaxed">
                  If you face any issues or notice suspicious activity, our
                  support team is ready to assist.
                </p>
                <a
                  href="mailto:support@dhansetu.io"
                  className="inline-block mt-4 font-semibold text-blue-700 hover:text-purple-700 transition flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  support@dhansetu.io
                </a>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="border border-red-300 rounded-2xl p-6 bg-gradient-to-br from-red-50 to-orange-50 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-bold text-red-900 text-lg flex items-center gap-2">
                  ⚠️ Danger Zone
                </p>
                <p className="text-red-700 mt-2 leading-relaxed text-sm">
                  Deleting your account is permanent and cannot be undone. Your
                  lending history will be archived.
                </p>
              </div>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-5 py-2 rounded-lg transition-all hover:shadow-lg hover:scale-105"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LenderSettings;

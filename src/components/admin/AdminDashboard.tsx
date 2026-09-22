import React, { useState, useEffect } from 'react';
import {
  FileText,
  CheckCircle,
  AlertCircle,
  Filter,
  Search,
  Settings,
  Eye,
  EyeOff,
  LogOut,
  Save,
  Download,
  Mail,
  ExternalLink,
  Terminal,
  UserPlus,
  ShieldCheck,
  UserCheck,
  RefreshCw,
  Lock
} from 'lucide-react';
import {
  ServiceApplication,
  ApplicationStatus,
  WebsiteSettings,
  Language,
  AdminUser
} from '../../types';
import {
  getApplications,
  updateApplicationStatus,
  getContactMessages,
  getSettings,
  saveSettings,
  isAdminLoggedIn,
  getAdminUser,
  registerAdminUser,
  loginAdminUser,
  logoutAdmin,
  resetAdminAccount,
  AUTHORIZED_ADMIN_EMAIL,
} from '../../services/storage';
import { StatusBadge } from '../common/StatusBadge';

interface AdminDashboardProps {
  currentLang?: Language;
  onNavigateHome: () => void;
}

export function AdminDashboard({ onNavigateHome }: AdminDashboardProps) {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(getAdminUser());
  const [isAuthenticated, setIsAuthenticated] = useState(isAdminLoggedIn());
  
  // Auth view mode: default to 'register' if no admin exists, otherwise 'login'
  const [authMode, setAuthMode] = useState<'login' | 'register'>(
    getAdminUser() ? 'login' : 'register'
  );

  // Login form state
  const [loginEmail, setLoginEmail] = useState(adminUser?.email || '');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form state (restricted exclusively to AUTHORIZED_ADMIN_EMAIL)
  const [regEmail, setRegEmail] = useState(AUTHORIZED_ADMIN_EMAIL);
  const [regName, setRegName] = useState('Elisha Samwel');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regError, setRegError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Active Tab: 'overview' | 'applications' | 'messages' | 'settings' | 'deployment'
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Reactive data lists
  const [applications, setApplications] = useState<ServiceApplication[]>(getApplications());
  const [messages, setMessages] = useState(getContactMessages());
  const [settings, setSettings] = useState<WebsiteSettings>(getSettings());

  // Application filter & search state
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<ServiceApplication | null>(null);
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('New');
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Settings Feedback
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);
  const [appUpdatedToast, setAppUpdatedToast] = useState(false);

  useEffect(() => {
    const handleStorageUpdate = () => {
      setApplications(getApplications());
      setMessages(getContactMessages());
      setSettings(getSettings());
      setAdminUser(getAdminUser());
      setIsAuthenticated(isAdminLoggedIn());
    };
    window.addEventListener('e27_storage_updated', handleStorageUpdate);
    return () => window.removeEventListener('e27_storage_updated', handleStorageUpdate);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = loginAdminUser(loginEmail, loginPassword);
    if (res.success && res.user) {
      setAdminUser(res.user);
      setIsAuthenticated(true);
      setLoginError('');
      setLoginPassword('');
    } else {
      setLoginError(res.error || 'Invalid administrator email or password.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    
    // Strict email check
    if (regEmail.trim().toLowerCase() !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      setRegError(`Access Denied: Only ${AUTHORIZED_ADMIN_EMAIL} is authorized to register as administrator.`);
      return;
    }

    if (regPassword.length < 6) {
      setRegError('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match. Please verify and re-type.');
      return;
    }

    const res = registerAdminUser(regEmail, regPassword, regName);
    if (res.success && res.user) {
      setAdminUser(res.user);
      setIsAuthenticated(true);
      setRegError('');
      setRegPassword('');
      setRegConfirmPassword('');
    } else {
      setRegError(res.error || 'Failed to register administrator account.');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    onNavigateHome();
  };

  const handleResetOrReRegister = () => {
    if (
      window.confirm(
        'Are you sure you want to reset or re-register the administrator account? Only elishasamwel27@gmail.com will be permitted to register.'
      )
    ) {
      resetAdminAccount();
      setAdminUser(null);
      setIsAuthenticated(false);
      setAuthMode('register');
      setRegEmail(AUTHORIZED_ADMIN_EMAIL);
      setRegName('Elisha Samwel');
      setRegPassword('');
      setRegConfirmPassword('');
      setLoginError('');
      setRegError('');
    }
  };

  // KPIs
  const totalApps = applications.length;
  const newApps = applications.filter((a) => a.status === 'New').length;
  const inProgressApps = applications.filter(
    (a) => a.status === 'In Progress' || a.status === 'Under Review'
  ).length;
  const completedApps = applications.filter((a) => a.status === 'Completed').length;

  // Filtered applications list
  const filteredApps = applications.filter((app) => {
    const matchesStatus = appStatusFilter === 'all' || app.status === appStatusFilter;
    const q = appSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      app.id.toLowerCase().includes(q) ||
      app.customerName.toLowerCase().includes(q) ||
      app.customerPhone.includes(q) ||
      app.customerEmail.toLowerCase().includes(q) ||
      app.serviceName.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const handleUpdateAppStatus = () => {
    if (!selectedApp) return;
    updateApplicationStatus(selectedApp.id, newStatus, adminNoteInput);
    const updatedList = getApplications();
    setApplications(updatedList);
    const updatedCurrent = updatedList.find((a) => a.id === selectedApp.id) || null;
    setSelectedApp(updatedCurrent);
    setAppUpdatedToast(true);
    setTimeout(() => setAppUpdatedToast(false), 4000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(settings);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 4000);
  };

  // If not authenticated, render Login/Register Screen
  if (!isAuthenticated) {
    return (
      <div id="admin-login-screen" className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-red-600 text-white font-mono font-black text-2xl flex items-center justify-center mx-auto shadow-lg shadow-red-600/20">
              E27
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              {authMode === 'register' ? 'Register Administrator' : 'E27 Admin Portal'}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {authMode === 'register'
                ? 'Only elishasamwel27@gmail.com is authorized to register this administrator account.'
                : 'Sign in with your registered administrator email and password.'}
            </p>
          </div>

          {/* Security Notice for Registration */}
          {authMode === 'register' && (
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>
                <strong>Strict Policy:</strong> Only <strong>{AUTHORIZED_ADMIN_EMAIL}</strong> is permitted to register this admin account.
              </span>
            </div>
          )}

          {/* Toggle between Login and Register if an admin already exists */}
          {adminUser && (
            <div className="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1 border border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setLoginError('');
                  setRegError('');
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  authMode === 'login'
                    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setLoginError('');
                  setRegError('');
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  authMode === 'register'
                    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                Re-Register
              </button>
            </div>
          )}

          {/* Error messages */}
          {authMode === 'login' && loginError && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          {authMode === 'register' && regError && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{regError}</span>
            </div>
          )}

          {/* REGISTER FORM */}
          {authMode === 'register' ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Administrator Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="elishasamwel27@gmail.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                  Permitted email: <span className="font-mono font-semibold text-red-600 dark:text-red-400">{AUTHORIZED_ADMIN_EMAIL}</span>
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Administrator Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Elisha Samwel"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Create Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    placeholder="Min. 6 characters..."
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Re-enter password to confirm..."
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase shadow-md shadow-red-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register Administrator Account</span>
              </button>
            </form>
          ) : (
            /* LOGIN FORM */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Administrator Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="Enter registered email..."
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter password..."
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase shadow-md shadow-red-600/20 transition-all active:scale-[0.98]"
              >
                Sign In to Admin Portal
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleResetOrReRegister}
                  className="text-[11px] text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                >
                  Need to change or re-register administrator? Click here
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div id="admin-dashboard-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Admin Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400 border border-red-200 dark:border-red-900">
              Staff Console
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Kijichi, Kigamboni Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight mt-1">
            E27 Central Management Dashboard
          </h1>
          {adminUser && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                Administrator: <strong className="text-gray-800 dark:text-gray-200">{adminUser.name}</strong> ({adminUser.email})
              </span>
              <span className="text-[10px] bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300 ml-1">
                {adminUser.role}
              </span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Public Website
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-xs font-bold hover:bg-red-100 dark:hover:bg-red-900/60 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Admin Tab Navigation - Clean Red, White, Gray, No Blog, No Comments, No Service Catalogue */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-gray-200 dark:border-gray-800">
        {[
          { id: 'overview', label: 'Overview', icon: CheckCircle },
          { id: 'applications', label: `Applications (${applications.length})`, icon: FileText },
          { id: 'messages', label: `Inquiries (${messages.length})`, icon: Mail },
          { id: 'settings', label: 'Website Settings', icon: Settings },
          { id: 'deployment', label: 'Deployment & Setup Guide', icon: Terminal },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedApp(null);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/20'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-150">
          {/* KPI Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Total Applications
              </span>
              <p className="text-3xl font-black text-gray-900 dark:text-white">{totalApps}</p>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">Registered on system</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-red-200 dark:border-red-900/60 shadow-sm space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
                New Submissions
              </span>
              <p className="text-3xl font-black text-red-600 dark:text-red-500">{newApps}</p>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">Needs initial check</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                In Progress
              </span>
              <p className="text-3xl font-black text-gray-900 dark:text-white">{inProgressApps}</p>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">Processing with agencies</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Completed
              </span>
              <p className="text-3xl font-black text-gray-900 dark:text-white">{completedApps}</p>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">Successfully delivered</span>
            </div>
          </div>

          {/* Quick Actions & Recent Queue */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent applications table preview */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Recent Applications Queue
                </h3>
                <button
                  onClick={() => setActiveTab('applications')}
                  className="text-xs text-red-600 dark:text-red-500 hover:underline font-bold"
                >
                  View All ({applications.length})
                </button>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
                {applications.slice(0, 5).map((app) => (
                  <div
                    key={app.id}
                    onClick={() => {
                      setSelectedApp(app);
                      setNewStatus(app.status);
                      setAdminNoteInput(app.adminNotes || '');
                      setActiveTab('applications');
                    }}
                    className="py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/60 px-2 rounded-lg cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-red-600 dark:text-red-500">
                          {app.id}
                        </span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {app.customerName}
                        </span>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400 text-[11px]">
                        {app.serviceName}
                      </span>
                    </div>

                    <StatusBadge status={app.status} size="sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications / Pending Queue */}
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Pending Staff Tasks
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-900 dark:text-red-200">
                  <div className="flex items-center justify-between font-bold">
                    <span>New Applications</span>
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[11px] font-mono">
                      {newApps}
                    </span>
                  </div>
                  <p className="text-[11px] text-red-700 dark:text-red-300 mt-1">
                    Require document verification and customer dispatch.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
                  <div className="flex items-center justify-between font-bold">
                    <span>Customer Inquiries</span>
                    <span className="px-2 py-0.5 rounded bg-gray-900 dark:bg-gray-700 text-white text-[11px] font-mono">
                      {messages.length}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                    Direct messages received via Contact page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. APPLICATIONS MANAGEMENT TAB */}
      {activeTab === 'applications' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {selectedApp ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
                <div>
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="text-xs text-red-600 dark:text-red-500 font-bold hover:underline mb-1 block"
                  >
                    ← Back to Applications List
                  </button>
                  <h2 className="text-xl sm:text-2xl font-mono font-black text-gray-900 dark:text-white">
                    Application: {selectedApp.id}
                  </h2>
                  <p className="text-xs text-gray-500">{selectedApp.serviceName}</p>
                </div>

                <StatusBadge status={selectedApp.status} size="lg" />
              </div>

              {appUpdatedToast && (
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Application status and notes successfully updated and saved!</span>
                </div>
              )}

              {/* Status Update & Admin Notes Control Box */}
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-4">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <Settings className="w-4 h-4 text-red-600" />
                  <span>Update Application Processing Status & Notes</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Change Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold focus:ring-2 focus:ring-red-600 focus:outline-none"
                    >
                      <option value="New">New</option>
                      <option value="Received">Received</option>
                      <option value="Under Review">Under Review</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Waiting for Customer">Waiting for Customer</option>
                      <option value="Completed">Completed</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Admin / Customer Visible Note
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Official portal submission complete, waiting for certificate..."
                      value={adminNoteInput}
                      onChange={(e) => setAdminNoteInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={handleUpdateAppStatus}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wide shadow-md shadow-red-600/20 transition-all"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save & Notify Customer</span>
                  </button>
                </div>
              </div>

              {/* Customer Contact & Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800">
                  <span className="text-gray-500 dark:text-gray-400 block mb-1">Customer Full Name</span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm">
                    {selectedApp.customerName}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800">
                  <span className="text-gray-500 dark:text-gray-400 block mb-1">Phone & WhatsApp</span>
                  <a
                    href={`https://wa.me/${selectedApp.customerPhone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-red-600 dark:text-red-500 hover:underline flex items-center gap-1 text-sm"
                  >
                    <span>{selectedApp.customerPhone}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800">
                  <span className="text-gray-500 dark:text-gray-400 block mb-1">Email Address</span>
                  <a
                    href={`mailto:${selectedApp.customerEmail}`}
                    className="font-bold text-gray-900 dark:text-gray-100 hover:text-red-600 hover:underline text-sm truncate block"
                  >
                    {selectedApp.customerEmail}
                  </a>
                </div>
              </div>

              {/* Service Attributes Data */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Form Details Submitted by Customer
                </h4>
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800 font-mono text-xs space-y-2">
                  {Object.entries(selectedApp.details || selectedApp.formData || {}).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between py-1 border-b border-gray-200/50 dark:border-gray-700/50 last:border-0"
                    >
                      <span className="text-gray-500 capitalize">{k}:</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {String(v)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Uploaded Documents List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Uploaded Supporting Documents ({(selectedApp.documents || []).length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(selectedApp.documents || []).map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 text-red-600 shrink-0" />
                        <span className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                          {doc.name}
                        </span>
                        <span className="text-gray-400 text-[10px]">
                          ({(doc.size / 1024).toFixed(0)} KB)
                        </span>
                      </div>
                      <a
                        href={doc.dataUrl || '#'}
                        download={doc.name}
                        className="p-1.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-red-600 transition-colors"
                        title="Download Document"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Search & Filter Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by ID, name, phone, email, service..."
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={appStatusFilter}
                    onChange={(e) => setAppStatusFilter(e.target.value)}
                    className="px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Received">Received</option>
                    <option value="Under Review">Under Review</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Waiting for Customer">Waiting for Customer</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Applications Table */}
              <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Ref ID</th>
                      <th className="py-3 px-4">Applicant</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Submitted</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {filteredApps.map((app) => (
                      <tr
                        key={app.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="py-3 px-4 font-mono font-bold text-red-600 dark:text-red-500">
                          {app.id}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-gray-900 dark:text-white block">
                            {app.customerName}
                          </span>
                          <span className="text-[11px] text-gray-500 dark:text-gray-400">
                            {app.customerPhone}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                          {app.serviceName}
                        </td>
                        <td className="py-3 px-4 text-gray-500">
                          {new Date(app.submittedAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <StatusBadge status={app.status} size="sm" />
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedApp(app);
                              setNewStatus(app.status);
                              setAdminNoteInput(app.adminNotes || '');
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 font-semibold transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Manage</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredApps.length === 0 && (
                  <div className="py-12 text-center text-gray-400 text-xs">
                    No applications match the selected search or filter.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* 3. CONTACT MESSAGES / INQUIRIES TAB */}
      {activeTab === 'messages' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Customer Inquiries & Contact Forms
            </h3>
            <p className="text-xs text-gray-500">Inquiries submitted via the Contact page.</p>
          </div>

          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 dark:text-white text-sm">
                      {msg.name}
                    </span>
                    <span className="text-red-600 dark:text-red-500 font-semibold">
                      [{msg.subject}]
                    </span>
                  </div>
                  <span className="text-gray-400 text-[11px]">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-gray-500">
                  <span>Phone: {msg.phone || 'N/A'}</span>
                  <span>Email: {msg.email}</span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                  {msg.message}
                </p>

                <div className="flex justify-end gap-2 pt-1">
                  {msg.phone && (
                    <a
                      href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm"
                    >
                      Reply on WhatsApp
                    </a>
                  )}
                  <a
                    href={`mailto:${msg.email}?subject=RE: ${encodeURIComponent(msg.subject)}`}
                    className="px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-black dark:bg-gray-800 dark:hover:bg-gray-700 text-white font-bold text-xs"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            ))}

            {messages.length === 0 && (
              <div className="p-8 text-center text-gray-400 text-xs">
                No customer inquiries submitted yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. WEBSITE SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl space-y-6 animate-in fade-in duration-150">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Website Configuration & Contact Channels
            </h3>
            <p className="text-xs text-gray-500">
              Changes saved here immediately update the website header, footer, WhatsApp links, and contact channels.
            </p>
          </div>

          {settingsSavedToast && (
            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>Settings updated and saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={settings.brandName}
                  onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  WhatsApp Support Number (with Country Code)
                </label>
                <input
                  type="text"
                  placeholder="+255714530815"
                  value={settings.whatsApp}
                  onChange={(e) => setSettings({ ...settings, whatsApp: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                  Format: Include country code (e.g. +255714530815)
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Public Email Address
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Physical Office Location
                </label>
                <input
                  type="text"
                  value={settings.location}
                  onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Working / Office Hours
                </label>
                <input
                  type="text"
                  value={settings.officeHours}
                  onChange={(e) => setSettings({ ...settings, officeHours: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Social Media Handles & Links
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Facebook URL
                  </label>
                  <input
                    type="text"
                    value={settings.socials.facebook}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        socials: { ...settings.socials, facebook: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Instagram URL
                  </label>
                  <input
                    type="text"
                    value={settings.socials.instagram}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        socials: { ...settings.socials, instagram: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    X / Twitter URL
                  </label>
                  <input
                    type="text"
                    value={settings.socials.twitter}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        socials: { ...settings.socials, twitter: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={settings.socials.linkedin}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        socials: { ...settings.socials, linkedin: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase shadow-md shadow-red-600/20 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save All Website Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 6. DEPLOYMENT & ARCHITECTURE GUIDE */}
      {activeTab === 'deployment' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl space-y-8 animate-in fade-in duration-150">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400 border border-red-200 dark:border-red-900 text-xs font-bold uppercase tracking-wider">
                Production Manual
              </span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mt-1">
              E27 Operations & Deployment Guide
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Instructions for deployment, configuration, and administrative operations.
            </p>
          </div>

          <div className="space-y-6 text-xs text-gray-700 dark:text-gray-300">
            {/* 1. How to run project */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                1. Running the Project Locally
              </h3>
              <p>To run E27 in development mode:</p>
              <pre className="bg-gray-950 text-gray-200 p-3 rounded-xl overflow-x-auto font-mono text-[11px] border border-gray-800">
                npm install{'\n'}npm run dev
              </pre>
              <p>The app will start on port 3000 (accessible via http://localhost:3000).</p>
            </div>

            {/* 2. Admin Credentials */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                2. Administrator Access Credentials
              </h3>
              <p>
                - No default password exists. Register your administrator account using your official email directly in the Administrator portal.<br />
                - In production: Store and authenticate credentials securely via your chosen authentication backend.
              </p>
            </div>

            {/* 3. Build & Production Deployment */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-2">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                3. Building for Production
              </h3>
              <pre className="bg-gray-950 text-gray-200 p-3 rounded-xl overflow-x-auto font-mono text-[11px] border border-gray-800">
                npm run build
              </pre>
              <p>Outputs clean, optimized static production assets in the <code>dist/</code> folder.</p>
            </div>

            {/* 4. Where to Edit Content & Applications */}
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-3">
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                4. Managing Content & Customer Applications
              </h3>
              <ul className="list-disc list-inside space-y-1.5">
                <li>
                  <strong>Phone, WhatsApp, Email, Office Location, Socials:</strong> Open the <em>Website Settings</em> tab right here in this Admin Dashboard. Updates propagate immediately.
                </li>
                <li>
                  <strong>Manage Applications:</strong> Use the <em>Applications</em> tab to review submitted client information, view/download uploaded documents, update processing status, and post notes.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

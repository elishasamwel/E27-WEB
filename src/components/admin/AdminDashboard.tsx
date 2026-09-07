import React, { useState, useEffect, type FormEvent } from 'react';
import {
  Users,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
  Search,
  Settings,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  Edit,
  Trash2,
  Check,
  X,
  Plus,
  Eye,
  LogOut,
  Save,
  Download,
  Phone,
  Mail,
  Share2,
  ExternalLink,
  Lock,
  Terminal,
  Server,
  Database
} from 'lucide-react';
import {
  ServiceApplication,
  ApplicationStatus,
  BlogPost,
  BlogComment,
  ServiceItem,
  WebsiteSettings,
  Language
} from '../../types';
import {
  getApplications,
  updateApplicationStatus,
  getServices,
  saveServices,
  getBlogPosts,
  saveBlogPosts,
  getComments,
  approveComment,
  rejectComment,
  deleteComment,
  getContactMessages,
  getSettings,
  saveSettings,
  isAdminLoggedIn,
  setAdminLoggedIn,
  logoutAdmin
} from '../../services/storage';
import { StatusBadge } from '../common/StatusBadge';

interface AdminDashboardProps {
  currentLang: Language;
  onNavigateHome: () => void;
}

export function AdminDashboard({ currentLang, onNavigateHome }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(isAdminLoggedIn());
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab: 'overview' | 'applications' | 'services' | 'blog' | 'comments' | 'messages' | 'settings' | 'deployment'
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Reactive data lists
  const [applications, setApplications] = useState<ServiceApplication[]>(getApplications());
  const [services, setServices] = useState<ServiceItem[]>(getServices());
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(getBlogPosts());
  const [comments, setComments] = useState<BlogComment[]>(getComments());
  const [messages, setMessages] = useState(getContactMessages());
  const [settings, setSettings] = useState<WebsiteSettings>(getSettings());

  // Application filter & search state
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<ServiceApplication | null>(null);
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('New');
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Service Edit state
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Blog Editor state
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  // Settings Feedback
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  useEffect(() => {
    const handleStorageUpdate = () => {
      setApplications(getApplications());
      setServices(getServices());
      setBlogPosts(getBlogPosts());
      setComments(getComments());
      setMessages(getContactMessages());
      setSettings(getSettings());
    };
    window.addEventListener('e27_storage_updated', handleStorageUpdate);
    return () => window.removeEventListener('e27_storage_updated', handleStorageUpdate);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master password for initial administrative setup
    if (passwordInput === 'e27admin2026' || passwordInput === 'admin') {
      setAdminLoggedIn(true);
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid administrator credentials. Try demo password: "e27admin2026"');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    onNavigateHome();
  };

  // KPIs
  const totalApps = applications.length;
  const newApps = applications.filter((a) => a.status === 'New').length;
  const inProgressApps = applications.filter((a) => a.status === 'In Progress' || a.status === 'Under Review').length;
  const completedApps = applications.filter((a) => a.status === 'Completed').length;
  const pendingCommentsCount = comments.filter((c) => c.status === 'pending').length;

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
    alert(`Application ${selectedApp.id} status successfully updated to "${newStatus}".`);
  };

  const handleToggleServiceActive = (serviceId: string) => {
    const updated = services.map((s) => (s.id === serviceId ? { ...s, active: !s.active } : s));
    setServices(updated);
    saveServices(updated);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(settings);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 4000);
  };

  // If not authenticated, render Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-mono font-bold text-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
              E27
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              E27 Admin Portal
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Authorized personnel access only. Please sign in to manage operations.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Admin Security Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Demo access password: <strong className="text-blue-500">e27admin2026</strong>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs tracking-wider uppercase shadow-md shadow-blue-500/20 transition-all"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div id="admin-dashboard-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Admin Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              Staff Console
            </span>
            <span className="text-xs text-slate-400">Kigamboni Branch Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            E27 Central Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Visit Public Website
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-bold hover:bg-rose-100 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'overview', label: 'Overview', icon: CheckCircle },
          { id: 'applications', label: `Applications (${applications.length})`, icon: FileText },
          { id: 'services', label: `Services (${services.length})`, icon: Settings },
          { id: 'blog', label: `Blog (${blogPosts.length})`, icon: BookOpen },
          {
            id: 'comments',
            label: `Comments (${comments.length}${pendingCommentsCount > 0 ? ` • ${pendingCommentsCount} Pending` : ''})`,
            icon: MessageSquare,
          },
          { id: 'messages', label: `Inquiries (${messages.length})`, icon: Mail },
          { id: 'settings', label: 'Website Settings', icon: Settings },
          { id: 'deployment', label: 'Deployment & Setup Guide', icon: Terminal },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSelectedApp(null);
                setEditingPost(null);
                setIsCreatingPost(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
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
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Applications
              </span>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{totalApps}</p>
              <span className="text-[11px] text-blue-500">Across 10 service categories</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                New Submissions
              </span>
              <p className="text-3xl font-black text-amber-600 dark:text-amber-400">{newApps}</p>
              <span className="text-[11px] text-slate-400">Needs initial check</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                In Progress
              </span>
              <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{inProgressApps}</p>
              <span className="text-[11px] text-slate-400">Processing with agencies</span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                Completed
              </span>
              <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{completedApps}</p>
              <span className="text-[11px] text-slate-400">Successfully delivered</span>
            </div>
          </div>

          {/* Quick Actions & Recent Queue */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent applications table preview */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Recent Applications Queue
                </h3>
                <button
                  onClick={() => setActiveTab('applications')}
                  className="text-xs text-blue-600 dark:text-cyan-400 hover:underline font-bold"
                >
                  View All ({applications.length})
                </button>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {applications.slice(0, 5).map((app) => (
                  <div
                    key={app.id}
                    onClick={() => {
                      setSelectedApp(app);
                      setNewStatus(app.status);
                      setAdminNoteInput(app.adminNotes);
                      setActiveTab('applications');
                    }}
                    className="py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 px-2 rounded-lg cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-blue-600 dark:text-cyan-400">
                          {app.id}
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {app.customerName}
                        </span>
                      </div>
                      <span className="text-slate-400 text-[11px]">{app.serviceName}</span>
                    </div>

                    <StatusBadge status={app.status} size="sm" />
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications / Pending Queue */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Pending Staff Tasks
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200">
                  <div className="flex items-center justify-between font-bold">
                    <span>New Applications</span>
                    <span>{newApps}</span>
                  </div>
                  <p className="text-[11px] text-amber-700 dark:text-amber-300 mt-1">
                    Require document check and customer contact.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-200">
                  <div className="flex items-center justify-between font-bold">
                    <span>Comments to Moderate</span>
                    <span>{pendingCommentsCount}</span>
                  </div>
                  <p className="text-[11px] text-blue-700 dark:text-blue-300 mt-1">
                    Blog reader comments awaiting approval.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <div className="flex items-center justify-between font-bold">
                    <span>Customer Inquiries</span>
                    <span>{messages.length}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Received through website contact form.
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
          {/* Detail drawer / modal if an application is selected */}
          {selectedApp ? (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <button
                    onClick={() => setSelectedApp(null)}
                    className="text-xs text-blue-600 dark:text-cyan-400 font-bold hover:underline mb-1 block"
                  >
                    ← Back to Applications List
                  </button>
                  <h2 className="text-xl sm:text-2xl font-mono font-black text-slate-900 dark:text-white">
                    Application: {selectedApp.id}
                  </h2>
                  <p className="text-xs text-slate-500">{selectedApp.serviceName}</p>
                </div>

                <StatusBadge status={selectedApp.status} size="lg" />
              </div>

              {/* Status Update & Admin Notes Control Box */}
              <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 space-y-4">
                <h4 className="text-sm font-bold text-blue-950 dark:text-blue-200 flex items-center gap-1.5">
                  <Settings className="w-4 h-4" />
                  <span>Update Application Processing Status & Notes</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Change Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
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
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Admin / Customer Visible Note
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. TRA portal submission complete, waiting for certificate..."
                      value={adminNoteInput}
                      onChange={(e) => setAdminNoteInput(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={handleUpdateAppStatus}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide shadow-md transition-all"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save & Notify Customer</span>
                  </button>
                </div>
              </div>

              {/* Customer Contact & Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block mb-1">Customer Full Name</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {selectedApp.customerName}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block mb-1">Phone & WhatsApp</span>
                  <a
                    href={`https://wa.me/${selectedApp.customerPhone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 text-sm"
                  >
                    <span>{selectedApp.customerPhone}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 block mb-1">Email Address</span>
                  <a
                    href={`mailto:${selectedApp.customerEmail}`}
                    className="font-bold text-blue-600 dark:text-cyan-400 hover:underline text-sm truncate block"
                  >
                    {selectedApp.customerEmail}
                  </a>
                </div>
              </div>

              {/* Service Attributes Data */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Form Details Submitted by Customer
                </h4>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-2">
                  {Object.entries(selectedApp.details || selectedApp.formData || {}).map(([k, v]) => (
                    <div key={k} className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-700/50 last:border-0">
                      <span className="text-slate-500 capitalize">{k}:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{String(v)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Uploaded Documents List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Uploaded Supporting Documents ({(selectedApp.documents || []).length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(selectedApp.documents || []).map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {doc.name}
                        </span>
                        <span className="text-slate-400 text-[10px]">
                          ({(doc.size / 1024).toFixed(0)} KB)
                        </span>
                      </div>
                      <a
                        href={doc.dataUrl || '#'}
                        download={doc.name}
                        className="p-1.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-950 dark:text-cyan-300"
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
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by ID, name, phone, email, service..."
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    value={appStatusFilter}
                    onChange={(e) => setAppStatusFilter(e.target.value)}
                    className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
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
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Ref ID</th>
                      <th className="py-3 px-4">Applicant</th>
                      <th className="py-3 px-4">Service</th>
                      <th className="py-3 px-4">Submitted</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredApps.map((app) => (
                      <tr
                        key={app.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="py-3 px-4 font-mono font-bold text-blue-600 dark:text-cyan-400">
                          {app.id}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-900 dark:text-white block">
                            {app.customerName}
                          </span>
                          <span className="text-[11px] text-slate-400">{app.customerPhone}</span>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">
                          {app.serviceName}
                        </td>
                        <td className="py-3 px-4 text-slate-500">
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
                              setAdminNoteInput(app.adminNotes);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-cyan-300 hover:bg-blue-100 font-semibold"
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
                  <div className="py-12 text-center text-slate-400 text-xs">
                    No applications match the selected search or filter.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* 3. SERVICES MANAGEMENT TAB */}
      {activeTab === 'services' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Active Service Catalog
              </h3>
              <p className="text-xs text-slate-500">Enable or disable services, update pricing and processing duration.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-blue-600 dark:text-cyan-400">
                      {srv.code}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {srv.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {srv.name.en}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{srv.shortDesc.en}</p>
                  <span className="text-xs text-blue-500 font-medium block pt-1">
                    Est. {srv.estimatedTime}
                  </span>
                </div>

                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleServiceActive(srv.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                      srv.active
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {srv.active ? 'Active' : 'Disabled'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. BLOG POSTS MANAGEMENT TAB */}
      {activeTab === 'blog' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Blog Articles Manager
            </h3>
            <button
              onClick={() => {
                const newPost: BlogPost = {
                  id: `post-${Date.now()}`,
                  slug: `new-article-${Date.now()}`,
                  title: { en: 'New Guide Title', sw: 'Kichwa cha Makala Mapya', zh: '新文章标题', fr: 'Nouveau Guide', de: 'Neuer Leitfaden' },
                  excerpt: { en: 'Summary of the new article...', sw: 'Muhtasari wa makala...', zh: '文章摘要...', fr: 'Résumé de l’article...', de: 'Zusammenfassung...' },
                  content: { en: 'Full guide content goes here...', sw: 'Yaliyomo...', zh: '正文内容...', fr: 'Contenu du guide...', de: 'Inhalt...' },
                  category: 'Civil Registry & RITA',
                  author: 'E27 Editorial Team',
                  publishedAt: new Date().toISOString(),
                  readTime: '3 min read',
                  imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
                  views: 0,
                  published: true,
                  tags: ['News', 'Tanzania'],
                };
                const updated = [newPost, ...blogPosts];
                setBlogPosts(updated);
                saveBlogPosts(updated);
                alert('New draft article created.');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Article</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden text-xs">
            {blogPosts.map((post) => (
              <div key={post.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold text-blue-500 uppercase">{post.category}</span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{post.title.en}</h4>
                  <p className="text-slate-400 text-[11px]">
                    Published: {new Date(post.publishedAt).toLocaleDateString()} by {post.author}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const updated = blogPosts.map((p) =>
                        p.id === post.id ? { ...p, published: !p.published } : p
                      );
                      setBlogPosts(updated);
                      saveBlogPosts(updated);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      post.published
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800'
                    }`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Delete article "${post.title.en}"?`)) {
                        const updated = blogPosts.filter((p) => p.id !== post.id);
                        setBlogPosts(updated);
                        saveBlogPosts(updated);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. COMMENTS MODERATION TAB */}
      {activeTab === 'comments' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Blog Reader Comments Moderation
            </h3>
            <p className="text-xs text-slate-500">
              Approve comments to make them visible on public article pages, or reject inappropriate submissions.
            </p>
          </div>

          <div className="space-y-3">
            {comments.map((cmt) => (
              <div
                key={cmt.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{cmt.authorName}</span>
                    <span className="text-slate-400">({cmt.authorEmail})</span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        cmt.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : cmt.status === 'rejected'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {cmt.status}
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    "{cmt.content}"
                  </p>
                  <span className="text-[10px] text-slate-400 block">
                    Article: {cmt.postId} • {new Date(cmt.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {cmt.status !== 'approved' && (
                    <button
                      onClick={() => approveComment(cmt.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  )}

                  {cmt.status !== 'rejected' && (
                    <button
                      onClick={() => rejectComment(cmt.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  )}

                  <button
                    onClick={() => deleteComment(cmt.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {comments.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs">
                No comments submitted yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. CONTACT MESSAGES TAB */}
      {activeTab === 'messages' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Customer Inquiries & Contact Forms
            </h3>
            <p className="text-xs text-slate-500">Inquiries submitted via the Contact page.</p>
          </div>

          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {msg.name}
                    </span>
                    <span className="text-blue-600 dark:text-cyan-400 font-semibold">
                      [{msg.subject}]
                    </span>
                  </div>
                  <span className="text-slate-400 text-[11px]">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-slate-500">
                  <span>Phone: {msg.phone || 'N/A'}</span>
                  <span>Email: {msg.email}</span>
                </div>

                <p className="text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  {msg.message}
                </p>

                <div className="flex justify-end gap-2 pt-1">
                  {msg.phone && (
                    <a
                      href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                    >
                      Reply on WhatsApp
                    </a>
                  )}
                  <a
                    href={`mailto:${msg.email}?subject=RE: ${encodeURIComponent(msg.subject)}`}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            ))}

            {messages.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs">
                No customer inquiries submitted yet.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 7. WEBSITE SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 animate-in fade-in duration-150">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Website Configuration & Contact Channels
            </h3>
            <p className="text-xs text-slate-500">
              Changes saved here instantly propagate across the entire website header, footer, WhatsApp direct links, and contact forms.
            </p>
          </div>

          {settingsSavedToast && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Settings updated and saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={settings.brandName}
                  onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  WhatsApp Support Number
                </label>
                <input
                  type="text"
                  value={settings.whatsApp}
                  onChange={(e) => setSettings({ ...settings, whatsApp: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Public Email Address
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Physical Office Location
                </label>
                <input
                  type="text"
                  value={settings.location}
                  onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Working / Office Hours
                </label>
                <input
                  type="text"
                  value={settings.officeHours}
                  onChange={(e) => setSettings({ ...settings, officeHours: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Social Media Handles & Links
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
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
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
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
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
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
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
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
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wider uppercase shadow-md transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save All Website Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 8. DEPLOYMENT & FIREBASE ARCHITECTURE GUIDE */}
      {activeTab === 'deployment' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8 animate-in fade-in duration-150">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider">
                Full Production Manual
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              E27 Operational & Firebase Integration Guide
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Detailed answers to all 12 operational, administrative, and cloud hosting questions.
            </p>
          </div>

          <div className="space-y-6 text-xs text-slate-700 dark:text-slate-300">
            {/* 1. How to run project */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                1. How to Run the Project Locally
              </h3>
              <p>To run E27 in development mode:</p>
              <pre className="bg-slate-900 text-emerald-400 p-3 rounded-xl overflow-x-auto font-mono text-[11px]">
                npm install{'\n'}npm run dev
              </pre>
              <p>The app will start on port 3000 (accessible via http://localhost:3000).</p>
            </div>

            {/* 2 & 3 & 4. Firebase Setup */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                2, 3, 4, 5. Connecting Firebase (Auth, Firestore, Storage)
              </h3>
              <p>
                In your Google Firebase Console (firebase.google.com), create a project named <strong>e27-tanzania</strong>.
                Add a Web App and copy the config into your <code>.env</code> file:
              </p>
              <pre className="bg-slate-900 text-cyan-300 p-3 rounded-xl overflow-x-auto font-mono text-[11px]">
                VITE_FIREBASE_API_KEY=your_api_key{'\n'}
                VITE_FIREBASE_AUTH_DOMAIN=e27-tanzania.firebaseapp.com{'\n'}
                VITE_FIREBASE_PROJECT_ID=e27-tanzania{'\n'}
                VITE_FIREBASE_STORAGE_BUCKET=e27-tanzania.appspot.com{'\n'}
                VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id{'\n'}
                VITE_FIREBASE_APP_ID=your_app_id
              </pre>
              <p>
                - <strong>Firebase Auth:</strong> Enable Email/Password in Authentication &gt; Sign-in method.<br />
                - <strong>Firestore Database:</strong> Create database in production mode. Use the collections defined in <code>src/services/firebase.ts</code>: <code>applications</code>, <code>services</code>, <code>blogPosts</code>, <code>comments</code>, <code>settings</code>.<br />
                - <strong>Firebase Storage:</strong> Enable Firebase Cloud Storage for customer supporting documents.
              </p>
            </div>

            {/* 6. First Admin Account */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                6. How to Create the First Admin Account
              </h3>
              <p>
                - In local/preview mode: Use the demo password <strong>e27admin2026</strong> on the Admin tab.<br />
                - In Firebase production mode: Create an admin user with email <code>admin@e27.co.tz</code> in Firebase Authentication, and add a document in the <code>users</code> collection with <code>role: 'admin'</code>.
              </p>
            </div>

            {/* 7. Deploy to Firebase Hosting */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                7. How to Deploy to Firebase Hosting
              </h3>
              <pre className="bg-slate-900 text-emerald-400 p-3 rounded-xl overflow-x-auto font-mono text-[11px]">
                npm install -g firebase-tools{'\n'}
                firebase login{'\n'}
                firebase init hosting{'\n'}
                # Set public directory to "dist" and rewrite all URLs to /index.html{'\n'}
                npm run build{'\n'}
                firebase deploy --only hosting
              </pre>
            </div>

            {/* 8, 9, 10, 11, 12. Management locations */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                8, 9, 10, 11, 12. Where to Edit Content & Applications
              </h3>
              <ul className="list-disc list-inside space-y-1.5">
                <li>
                  <strong>Phone, WhatsApp, Email, Address, Socials:</strong> Open the <em>Website Settings</em> tab right here in this Admin Dashboard. Saves update the entire site instantly. You can also view default values in <code>src/data/initialData.ts</code>.
                </li>
                <li>
                  <strong>Edit Services & Pricing:</strong> Go to the <em>Services</em> tab in this Admin Dashboard, or edit the service definitions in <code>src/data/initialData.ts</code>.
                </li>
                <li>
                  <strong>Edit Translations (5 Languages):</strong> All translations for English, Kiswahili, Chinese, French, and German are centralized in <code>src/translations/index.ts</code> with 100% type safety.
                </li>
                <li>
                  <strong>Manage Blog Posts & Moderation:</strong> Use the <em>Blog</em> and <em>Comments</em> tabs above. You can create drafts, publish articles, and moderate reader discussions.
                </li>
                <li>
                  <strong>Manage Customer Applications:</strong> Use the <em>Applications</em> tab above. Click "Manage" on any application to view submitted forms, view/download uploaded documents, update status, and write internal notes.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

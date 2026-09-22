import { useState, useEffect } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  MessageCircle,
  ShieldCheck,
  Calendar,
  User,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Check
} from 'lucide-react';
import { ServiceApplication, ApplicationStatus, Language } from '../../types';
import { translations } from '../../translations';
import { getApplicationById, getSettings, getWhatsAppCleanNumber } from '../../services/storage';
import { StatusBadge } from '../common/StatusBadge';

interface TrackApplicationPageProps {
  currentLang: Language;
  initialRefId?: string;
  onNavigate: (page: string) => void;
}

export function TrackApplicationPage({
  currentLang,
  initialRefId,
  onNavigate,
}: TrackApplicationPageProps) {
  const t = translations[currentLang];
  const settings = getSettings();

  const [refInput, setRefInput] = useState(initialRefId || '');
  const [searchedApp, setSearchedApp] = useState<ServiceApplication | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialRefId) {
      handleSearch(initialRefId);
    }
  }, [initialRefId]);

  const handleSearch = (idToSearch?: string) => {
    const id = (idToSearch || refInput).trim().toUpperCase();
    if (!id) {
      setErrorMsg('Please enter an application reference ID.');
      setSearchedApp(null);
      return;
    }

    const found = getApplicationById(id);
    setHasSearched(true);
    if (found) {
      setSearchedApp(found);
      setErrorMsg('');
    } else {
      setSearchedApp(null);
      setErrorMsg(`No application found with reference ID "${id}". Please verify and try again.`);
    }
  };

  // Status progress stages
  const STAGES: ApplicationStatus[] = [
    'New',
    'Received',
    'Under Review',
    'In Progress',
    'Completed',
  ];

  const getStageIndex = (status: ApplicationStatus) => {
    switch (status) {
      case 'New':
        return 0;
      case 'Received':
        return 1;
      case 'Under Review':
        return 2;
      case 'In Progress':
        return 3;
      case 'Waiting for Customer':
        return 2;
      case 'Completed':
        return 4;
      case 'Rejected':
      case 'Cancelled':
        return -1;
      default:
        return 0;
    }
  };

  const currentStageIndex = searchedApp ? getStageIndex(searchedApp.status) : 0;

  return (
    <div id="track-application-container" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
          Live Verification
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {t.track.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {t.track.subtitle}
        </p>
      </div>

      {/* Search Input Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter Reference (e.g. E27-2026-9812 or E27-2026-7841)"
              value={refInput}
              onChange={(e) => setRefInput(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none uppercase"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wider uppercase shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>{t.track.searchButton || t.track.btnTrack || 'Check Status'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Demo Reference numbers quick pickers */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span>Try sample tracking IDs:</span>
          <button
            onClick={() => {
              setRefInput('E27-2026-9812');
              handleSearch('E27-2026-9812');
            }}
            className="font-mono text-blue-600 dark:text-cyan-400 hover:underline px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60"
          >
            E27-2026-9812 (In Progress)
          </button>
          <button
            onClick={() => {
              setRefInput('E27-2026-7841');
              handleSearch('E27-2026-7841');
            }}
            className="font-mono text-blue-600 dark:text-cyan-400 hover:underline px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60"
          >
            E27-2026-7841 (Completed)
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* SEARCH RESULT DETAILS CARD */}
      {searchedApp && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8 animate-in fade-in duration-200">
          {/* Top Info Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Application Reference
              </span>
              <h2 className="text-2xl sm:text-3xl font-mono font-black text-blue-600 dark:text-cyan-400">
                {searchedApp.id}
              </h2>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                {searchedApp.serviceName}
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-1.5">
              <span className="text-xs text-slate-400">Current Status</span>
              <StatusBadge status={searchedApp.status} size="lg" />
            </div>
          </div>

          {/* Status Timeline */}
          {searchedApp.status !== 'Rejected' && searchedApp.status !== 'Cancelled' ? (
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Progress Stages
              </span>
              <div className="grid grid-cols-5 gap-2 text-center text-xs">
                {STAGES.map((stage, idx) => {
                  const isPassed = currentStageIndex >= idx;
                  const isCurrent = currentStageIndex === idx;
                  return (
                    <div key={stage} className="space-y-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          isPassed
                            ? 'bg-blue-600 dark:bg-cyan-500'
                            : 'bg-slate-200 dark:bg-slate-800'
                        } ${isCurrent ? 'ring-2 ring-blue-400 ring-offset-2 dark:ring-offset-slate-900' : ''}`}
                      />
                      <span
                        className={`block text-[11px] font-semibold leading-tight ${
                          isCurrent
                            ? 'text-blue-600 dark:text-cyan-300 font-bold'
                            : isPassed
                            ? 'text-slate-800 dark:text-slate-200'
                            : 'text-slate-400'
                        }`}
                      >
                        {stage}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-300">
              <strong>Notice:</strong> This application has been marked as{' '}
              <span className="font-bold uppercase">{searchedApp.status}</span>. Please review the
              notes below or message our support team on WhatsApp.
            </div>
          )}

          {/* Details Overview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block flex items-center gap-1 mb-1">
                <User className="w-3.5 h-3.5" />
                Applicant Name
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {searchedApp.customerName}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block flex items-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5" />
                Submission Date
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {new Date(searchedApp.submittedAt).toLocaleDateString()}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5" />
                Last Updated
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {new Date(searchedApp.updatedAt).toLocaleDateString()}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block flex items-center gap-1 mb-1">
                <FileText className="w-3.5 h-3.5" />
                Documents Attached
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {searchedApp.documents.length} files
              </span>
            </div>
          </div>

          {/* Admin / Team Communications Note */}
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              <span>Team Updates & Processing Notes</span>
            </span>
            <p className="text-xs text-blue-900 dark:text-blue-200 leading-relaxed font-sans">
              {searchedApp.adminNotes || 'Application is being queued for initial review.'}
            </p>
          </div>

          {/* Service Details Breakdown */}
          {Object.keys(searchedApp.details || searchedApp.formData || {}).length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Application Attributes
              </span>
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1.5">
                {Object.entries(searchedApp.details || searchedApp.formData || {}).map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-700/50 last:border-0">
                    <span className="text-slate-500 capitalize">{k.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents list */}
          {searchedApp.documents && searchedApp.documents.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Submitted Supporting Documents
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(searchedApp.documents || []).map((doc, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                        {doc.name}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {(doc.size / 1024).toFixed(0)} KB
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Support CTA */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Have questions regarding this reference? Our support desk in Kigamboni is available on WhatsApp.
            </p>
            <a
              href={`https://wa.me/${getWhatsAppCleanNumber(settings.whatsApp)}?text=Hello%20E27,%20I%20am%20inquiring%20about%20my%20application%20reference%20${searchedApp.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

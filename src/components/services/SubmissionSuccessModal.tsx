import { useState } from 'react';
import {
  CheckCircle,
  Copy,
  Check,
  MessageCircle,
  Clock,
  Printer,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  X
} from 'lucide-react';
import { ServiceApplication, Language } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { getSettings } from '../../services/storage';

interface SubmissionSuccessModalProps {
  application: ServiceApplication;
  currentLang: Language;
  onClose: () => void;
  onTrack: (refId: string) => void;
}

export function SubmissionSuccessModal({
  application,
  currentLang,
  onClose,
  onTrack,
}: SubmissionSuccessModalProps) {
  const [copied, setCopied] = useState(false);
  const settings = getSettings();

  const handleCopy = () => {
    navigator.clipboard.writeText(application.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello E27 Team, I just submitted an application for "${application.serviceName}". My Reference Number is ${application.id}. Please assist with processing updates.`
  );

  return (
    <div
      id="submission-success-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        id="submission-success-card"
        className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center mb-3 shadow-inner">
            <CheckCircle className="w-9 h-9 text-white" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            Application Submitted Successfully!
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-md mx-auto">
            Your application has been registered securely in our E27 processing queue.
          </p>
        </div>

        {/* Reference Number Callout */}
        <div className="p-6 space-y-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
              Your Unique Application Reference Number
            </span>

            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl sm:text-3xl font-mono font-black text-blue-600 dark:text-cyan-400 tracking-wider">
                {application.id}
              </span>
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-blue-400 text-slate-700 dark:text-slate-200 transition-colors shadow-sm"
                title="Copy reference number"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Save this reference number. You can use it anytime to track your progress live.
            </p>
          </div>

          {/* Quick Summary Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 bg-slate-50/50 dark:bg-slate-800/30">
            <div>
              <span className="text-slate-400 block">Service Requested</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {application.serviceName}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Current Status</span>
              <div className="mt-0.5">
                <StatusBadge status={application.status} size="sm" />
              </div>
            </div>
            <div>
              <span className="text-slate-400 block">Applicant Name</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {application.customerName}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">Submitted On</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {new Date(application.submittedAt).toLocaleDateString()} at{' '}
                {new Date(application.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          {/* Next Steps Instructions */}
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>What Happens Next?</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1 pl-1">
              <li>
                <strong>Verification:</strong> Our team reviews your submitted facts and uploaded documents.
              </li>
              <li>
                <strong>Communication:</strong> You will receive a direct WhatsApp and SMS notification within 2 to 4 business hours regarding fee clearance and processing.
              </li>
              <li>
                <strong>Processing & Delivery:</strong> Once finalized by the state portal or development team, your certificate, registration document, or website credentials will be delivered to your contact channels.
              </li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={`https://wa.me/${settings.whatsApp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wide shadow-md shadow-emerald-600/20 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire on WhatsApp</span>
            </a>

            <button
              onClick={() => onTrack(application.id)}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-600/20 transition-all"
            >
              <span>Track Status Live</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrint}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              title="Print acknowledgment receipt"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

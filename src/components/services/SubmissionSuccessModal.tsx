import { useState } from 'react';
import {
  CheckCircle,
  Copy,
  Check,
  MessageCircle,
  Clock,
  Printer,
  X
} from 'lucide-react';
import { ServiceApplication, Language } from '../../types';
import { getSettings } from '../../services/storage';

interface SubmissionSuccessModalProps {
  application: ServiceApplication;
  currentLang: Language;
  onClose: () => void;
  onTrack?: (refId: string) => void;
}

export function SubmissionSuccessModal({
  application,
  onClose,
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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        id="submission-success-card"
        className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden text-gray-900 dark:text-white"
      >
        {/* Top Header Banner */}
        <div className="bg-red-600 text-white p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center mb-3 shadow-inner">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black tracking-tight">
            Application Submitted!
          </h3>
          <p className="text-xs text-red-100 mt-1 max-w-md mx-auto">
            Your application for {application.serviceName} has been registered securely.
          </p>
        </div>

        {/* Reference Number Callout */}
        <div className="p-6 space-y-6">
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-center space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400">
              Your Application Reference Number
            </span>

            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl sm:text-3xl font-mono font-black text-red-600 dark:text-red-500 tracking-wider">
                {application.id}
              </span>
              <button
                onClick={handleCopy}
                className="p-2 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-red-500 text-gray-700 dark:text-gray-200 transition-colors shadow-sm"
                title="Copy reference number"
              >
                {copied ? <Check className="w-4 h-4 text-red-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Save this reference number. You can quote it anytime for support and inquiries.
            </p>
          </div>

          {/* Summary Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs border border-gray-200 dark:border-gray-800 rounded-2xl p-4 bg-gray-50/50 dark:bg-gray-800/30">
            <div>
              <span className="text-gray-400 block">Service Requested</span>
              <span className="font-bold text-gray-900 dark:text-white">
                {application.serviceName}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block">Applicant Name</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {application.customerName}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block">Phone</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {application.customerPhone}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block">Submitted On</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {new Date(application.submittedAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <h4 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-red-600" />
              <span>What Happens Next?</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1 pl-1">
              <li>
                <strong>Verification:</strong> Our specialists in Kigamboni review your submitted information.
              </li>
              <li>
                <strong>Direct Updates:</strong> We contact you directly via WhatsApp or phone call.
              </li>
            </ol>
          </div>

          {/* Action Buttons: Centered */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/${settings.whatsApp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wide shadow-md shadow-red-600/20 transition-all inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Inquiry</span>
            </a>

            <button
              onClick={handlePrint}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
              title="Print acknowledgment receipt"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

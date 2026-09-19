import {
  X,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileText,
  FileCheck,
  Landmark,
  Building2,
  Briefcase,
  Laptop,
  Server,
  Globe,
  Mail,
  Search,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { ServiceItem, Language } from '../../types';
import { translations } from '../../translations';

interface ServiceDetailModalProps {
  service: ServiceItem;
  currentLang: Language;
  onClose: () => void;
  onApply: (service: ServiceItem) => void;
}

export function ServiceDetailModal({
  service,
  currentLang,
  onClose,
  onApply,
}: ServiceDetailModalProps) {
  const t = translations[currentLang];

  const renderIcon = (iconName: string) => {
    const props = { className: 'w-7 h-7 text-white' };
    switch (iconName) {
      case 'FileText':
      case 'FileCheck2':
        return <FileText {...props} />;
      case 'Landmark':
        return <Landmark {...props} />;
      case 'Building2':
        return <Building2 {...props} />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      case 'Briefcase':
        return <Briefcase {...props} />;
      case 'Laptop':
        return <Laptop {...props} />;
      case 'Server':
        return <Server {...props} />;
      case 'Globe':
        return <Globe {...props} />;
      case 'Mail':
        return <Mail {...props} />;
      case 'Search':
        return <Search {...props} />;
      case 'GraduationCap':
        return <GraduationCap {...props} />;
      case 'BookOpen':
        return <BookOpen {...props} />;
      default:
        return <FileCheck {...props} />;
    }
  };

  return (
    <div
      id="service-detail-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
    >
      <div
        id="service-detail-card"
        className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden my-6 text-gray-900 dark:text-white"
      >
        {/* Header with Icon */}
        <div className="bg-red-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-lg">
              {renderIcon(service.icon)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-white/20 text-white">
                  {service.category.toUpperCase()}
                </span>
                <span className="text-xs text-red-100 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {service.estimatedTime}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mt-1 text-white">
                {service.name[currentLang] || service.name.en}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto text-sm">
          {/* Detailed Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Service Overview
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {service.fullDesc[currentLang] || service.fullDesc.en}
            </p>
          </div>

          {/* Requirements Checklist */}
          {service.requirements && (
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-red-600" />
                <span>Prerequisites & Requirements</span>
              </h4>
              <ul className="space-y-2">
                {(service.requirements?.[currentLang] || service.requirements?.en || []).map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Turnaround Time & Notice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40">
              <span className="text-gray-500 dark:text-gray-400 block">Processing Duration</span>
              <span className="font-bold text-red-600 dark:text-red-500 text-sm">
                {service.estimatedTime}
              </span>
            </div>
            <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40">
              <span className="text-gray-500 dark:text-gray-400 block">Service Model</span>
              <span className="font-bold text-gray-800 dark:text-gray-200 text-sm">
                100% Online or Kigamboni Office Walk-In
              </span>
            </div>
          </div>

          {/* Independent Notice */}
          <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-300 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>
              E27 provides preparation and digital submission assistance. Official certificates are approved and granted by the legal state agency in Tanzania.
            </span>
          </div>
        </div>

        {/* Modal Footer Controls - Centered */}
        <div className="p-4 sm:p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60 flex items-center justify-center gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {t.actions.cancel}
          </button>

          <button
            onClick={() => {
              onClose();
              onApply(service);
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wide shadow-md shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{t.actions.applyNow}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

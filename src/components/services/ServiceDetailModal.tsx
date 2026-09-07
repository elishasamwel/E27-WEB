import {
  X,
  Clock,
  CheckCircle2,
  Sparkles,
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

  // Dynamic Lucide Icon Mapper
  const renderIcon = (iconName: string) => {
    const props = { className: 'w-7 h-7 text-cyan-400' };
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
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
    >
      <div
        id="service-detail-card"
        className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6"
      >
        {/* Header with Icon */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 relative">
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
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {service.category.toUpperCase()}
                </span>
                <span className="text-xs text-blue-200 flex items-center gap-1">
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Service Overview
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {service.fullDesc[currentLang] || service.fullDesc.en}
            </p>
          </div>

          {/* Requirements Checklist */}
          {service.requirements && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Prerequisites & Requirements</span>
              </h4>
              <ul className="space-y-2">
                {(service.requirements?.[currentLang] || service.requirements?.en || []).map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Turnaround Time & Notice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-blue-100 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/30">
              <span className="text-slate-500 dark:text-slate-400 block">Typical Processing Duration</span>
              <span className="font-bold text-blue-700 dark:text-cyan-300 text-sm">
                {service.estimatedTime}
              </span>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40">
              <span className="text-slate-500 dark:text-slate-400 block">Service Model</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                100% Online or Kigamboni Office Walk-In
              </span>
            </div>
          </div>

          {/* Independent Notice */}
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <span>
              E27 provides preparation and digital submission assistance. Official certificates are approved and granted by the legal state agency in Tanzania.
            </span>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 transition-colors"
          >
            {t.actions.cancel}
          </button>

          <button
            onClick={() => {
              onClose();
              onApply(service);
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-500/20 transition-all"
          >
            <span>{t.actions.applyNow}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

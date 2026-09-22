import React from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  Layers
} from 'lucide-react';
import { ServiceItem, Language } from '../../types';
import { translations } from '../../translations';

interface ServiceCardProps {
  key?: React.Key;
  service: ServiceItem;
  currentLang: Language;
  isExpanded: boolean;
  onToggleRequirements: () => void;
  onSelectServiceToApply?: (service: ServiceItem) => void;
  onOpenModal?: (service: ServiceItem) => void;
}

export function ServiceCard({
  service,
  currentLang,
  isExpanded,
  onToggleRequirements,
}: ServiceCardProps) {
  const t = translations[currentLang];
  const serviceName = service.name[currentLang] || service.name.en;

  // Requirement items in current language or fallback
  const requirementsList =
    service.requirements?.[currentLang] ||
    service.requirements?.en ||
    service.requirements?.sw ||
    [];

  const groups =
    service.requirementGroups?.[currentLang] ||
    service.requirementGroups?.en ||
    service.requirementGroups?.sw;

  return (
    <div
      id={`service-card-${service.code}`}
      className={`group relative rounded-2xl bg-white dark:bg-gray-900 border transition-all duration-300 flex flex-col justify-between text-center overflow-hidden ${
        isExpanded
          ? 'border-red-500 ring-2 ring-red-500/20 shadow-xl'
          : 'border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-red-500 dark:hover:border-red-500'
      }`}
    >
      {/* Card Header & Service Name */}
      <div className="p-6 pb-4 space-y-3">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
          {serviceName}
        </h3>

        {/* Short description preview if collapsed */}
        {!isExpanded && (
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {service.shortDesc[currentLang] || service.shortDesc.en}
          </p>
        )}
      </div>

      {/* Expanded Requirements Preview Section */}
      {isExpanded && (
        <div
          id={`requirements-preview-${service.code}`}
          className="px-5 pb-5 pt-1 text-left space-y-4 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/80 p-4 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 border-b border-gray-200 dark:border-gray-700 pb-2.5">
              <FileText className="w-4 h-4 shrink-0" />
              <span>
                {currentLang === 'sw' ? 'Mahitaji Yanayotakiwa' : 'Required Documents & Details'}
              </span>
            </div>

            {/* Check if service has structured Requirement Groups */}
            {groups && groups.length > 0 ? (
              <div className="space-y-3 pt-1">
                {groups.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-1.5">
                    {group.title && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 dark:text-gray-100 bg-gray-200/70 dark:bg-gray-700/60 px-2 py-1 rounded-md">
                        <Layers className="w-3 h-3 text-red-600" />
                        <span>{group.title}</span>
                      </div>
                    )}
                    <ul className="space-y-1 pl-1">
                      {group.items.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300 leading-snug"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              /* Flat Requirements List */
              <ul className="space-y-2 pt-1">
                {requirementsList.map((req, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300 leading-snug"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Action Footer: "Requirements" Button (Toggles preview) */}
      <div className="p-5 pt-3 mt-auto border-t border-gray-100 dark:border-gray-800 flex justify-center">
        <button
          type="button"
          onClick={onToggleRequirements}
          aria-expanded={isExpanded}
          className={`w-full sm:w-auto min-w-[160px] px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all inline-flex items-center justify-center gap-2 shadow-sm ${
            isExpanded
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200'
              : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20 shadow-md hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          <span>
            {isExpanded
              ? t.actions.hideRequirements || (currentLang === 'sw' ? 'Ficha Mahitaji' : 'Hide Requirements')
              : t.actions.requirements || t.actions.applyNow || 'Requirements'}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 shrink-0 text-red-600" />
          ) : (
            <ChevronDown className="w-4 h-4 shrink-0" />
          )}
        </button>
      </div>
    </div>
  );
}

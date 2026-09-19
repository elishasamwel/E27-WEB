import { useState, useMemo } from 'react';
import {
  Search,
  ArrowRight,
  Info
} from 'lucide-react';
import { ServiceItem, Language } from '../../types';
import { translations } from '../../translations';
import { getServices } from '../../services/storage';

interface ServicesPageProps {
  currentLang: Language;
  onApply: (service: ServiceItem) => void;
  onViewDetails: (service: ServiceItem) => void;
}

export function ServicesPage({ currentLang, onApply }: ServicesPageProps) {
  const t = translations[currentLang];
  const services = getServices();

  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return services.filter((s) => {
      if (!s.active) return false;
      const q = search.toLowerCase().trim();
      const sName = (s.name[currentLang] || s.name.en).toLowerCase();
      const sDesc = (s.shortDesc[currentLang] || s.shortDesc.en).toLowerCase();
      return !q || sName.includes(q) || sDesc.includes(q);
    });
  }, [services, search, currentLang]);

  return (
    <div id="services-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
          Our Services Catalog
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          {t.services?.title || 'Professional Services'}
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          {t.services?.subtitle || 'Official Tanzanian government systems, commercial registries, and web technology.'}
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto pt-2">
          <div className="relative flex items-center shadow-sm rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2">
            <Search className="w-5 h-5 text-gray-400 ml-2.5 shrink-0" />
            <input
              type="text"
              placeholder="Search by service name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-xs text-gray-400 hover:text-gray-600 px-2"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Services Grid - Only Card, Service Name, and Centered Apply Button */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((service) => (
          <div
            key={service.id}
            id={`service-catalog-${service.code}`}
            className="group rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between hover:border-red-500 dark:hover:border-red-500 text-center"
          >
            <div className="space-y-3 py-2">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                {service.name[currentLang] || service.name.en}
              </h3>
            </div>

            <div className="pt-5 mt-4 border-t border-gray-100 dark:border-gray-800 flex justify-center">
              <button
                onClick={() => onApply(service)}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold tracking-wide shadow-md shadow-red-600/20 transition-all inline-flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{t.actions.applyNow}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
          <Info className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            No services found matching your criteria.
          </p>
          <button
            onClick={() => setSearch('')}
            className="mt-3 text-xs text-red-600 dark:text-red-400 underline font-semibold"
          >
            Show all services
          </button>
        </div>
      )}
    </div>
  );
}

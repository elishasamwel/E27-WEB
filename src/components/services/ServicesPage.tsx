import { useState, useMemo } from 'react';
import { Search, Info } from 'lucide-react';
import { ServiceItem, Language } from '../../types';
import { translations } from '../../translations';
import { getServices } from '../../services/storage';
import { ServiceCard } from './ServiceCard';

interface ServicesPageProps {
  currentLang: Language;
  onApply: (service: ServiceItem) => void;
  onViewDetails: (service: ServiceItem) => void;
}

export function ServicesPage({ currentLang, onApply, onViewDetails }: ServicesPageProps) {
  const t = translations[currentLang];
  const services = getServices();

  const [search, setSearch] = useState('');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

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
    <div id="services-page-container" className="space-y-12 pb-16">
      {/* Page Header with Photographic Background */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-28 sm:pb-28 bg-gray-950 text-white border-b border-gray-800">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=2000&q=80"
            alt="Business Documents and Strategy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.28] contrast-[1.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/75 to-red-950/35" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/15 via-transparent to-black/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-red-500 bg-red-950/60 border border-red-800/60 px-3 py-1 rounded-full inline-block">
            Our Services Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-sm">
            {t.services?.title || 'Professional Services'}
          </h1>
          <p className="text-base text-gray-200 leading-relaxed drop-shadow-sm">
            {t.services?.subtitle || 'Official Tanzanian government systems, commercial registries, and web technology.'}
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative flex items-center shadow-lg rounded-2xl border border-gray-700/80 bg-gray-900/90 backdrop-blur-md p-2">
              <Search className="w-5 h-5 text-gray-400 ml-2.5 shrink-0" />
              <input
                type="text"
                placeholder="Search by service name or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-transparent text-white placeholder-gray-400 focus:outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="text-xs text-gray-400 hover:text-white px-2"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

      {/* Services Grid - Cards with Requirements Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {filtered.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            currentLang={currentLang}
            isExpanded={expandedServiceId === service.id}
            onToggleRequirements={() =>
              setExpandedServiceId((prev) => (prev === service.id ? null : service.id))
            }
            onSelectServiceToApply={onApply}
            onOpenModal={onViewDetails}
          />
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
    </div>
  );
}

import { useState, useMemo } from 'react';
import {
  Search,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Info,
  ShieldCheck
} from 'lucide-react';
import { ServiceItem, Language, ServiceCategory } from '../../types';
import { translations } from '../../translations';
import { getServices } from '../../services/storage';

interface ServicesPageProps {
  currentLang: Language;
  onApply: (service: ServiceItem) => void;
  onViewDetails: (service: ServiceItem) => void;
}

export function ServicesPage({ currentLang, onApply, onViewDetails }: ServicesPageProps) {
  const t = translations[currentLang];
  const services = getServices();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'gov_online', label: 'RITA Services' },
    { id: 'tax_revenue', label: 'TRA Services' },
    { id: 'business_legal', label: 'BRELA Registration' },
    { id: 'licensing', label: 'TAUSI Licences' },
    { id: 'procurement', label: 'NeST Tenders' },
    { id: 'web_tech', label: 'Website Design' },
    { id: 'cloud_hosting', label: 'Hosting & Domains' },
    { id: 'applications', label: 'Online Portals' },
  ];

  const filtered = useMemo(() => {
    return services.filter((s) => {
      if (!s.active) return false;
      const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
      const q = search.toLowerCase().trim();
      const sName = (s.name[currentLang] || s.name.en).toLowerCase();
      const sDesc = (s.shortDesc[currentLang] || s.shortDesc.en).toLowerCase();
      const matchesSearch = !q || sName.includes(q) || sDesc.includes(q);
      return matchesCat && matchesSearch;
    });
  }, [services, selectedCategory, search, currentLang]);

  return (
    <div id="services-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
          Our Comprehensive Catalog
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {t.services?.title || 'E27 Professional Services'}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {t.services?.subtitle || 'Expert guidance for official Tanzanian government systems, commercial registries, and web technology.'}
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto pt-2">
          <div className="relative flex items-center shadow-md rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
            <Search className="w-5 h-5 text-slate-400 ml-2.5 shrink-0" />
            <input
              type="text"
              placeholder="Search by service name or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-xs text-slate-400 hover:text-slate-600 px-2"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((service) => (
          <div
            key={service.id}
            id={`service-catalog-${service.code}`}
            className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between hover:border-blue-400 dark:hover:border-cyan-500"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-300 border border-blue-100 dark:border-blue-900">
                  {service.category.replace('_', ' ')}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  {service.estimatedTime}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  {service.name[currentLang] || service.name.en}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {service.shortDesc[currentLang] || service.shortDesc.en}
                </p>
              </div>

              {service.requirements && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Requirements:
                  </span>
                  <ul className="space-y-1">
                    {((service.requirements && (service.requirements[currentLang] || service.requirements.en)) || []).slice(0, 3).map((req, idx) => (
                      <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 truncate">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
              <button
                onClick={() => onViewDetails(service)}
                className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-center"
              >
                {t.actions.learnMore}
              </button>

              <button
                onClick={() => onApply(service)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold tracking-wide shadow-md shadow-blue-500/20 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <span>{t.actions.applyNow}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 p-8">
          <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No services found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
            }}
            className="mt-3 text-xs text-blue-600 dark:text-cyan-400 underline font-semibold"
          >
            Show all services
          </button>
        </div>
      )}
    </div>
  );
}

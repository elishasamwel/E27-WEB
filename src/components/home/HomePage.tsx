import { useState, useMemo } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  Search,
  MessageCircle,
  FileCheck2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  HelpCircle,
  CheckCircle,
  Users,
  Award,
  Lock,
  Headphones,
  Laptop,
  Globe,
  Building,
  FileText
} from 'lucide-react';
import { ServiceItem, Language, ServiceCategory } from '../../types';
import { translations } from '../../translations';
import { getServices, getBlogPosts, getSettings } from '../../services/storage';

interface HomePageProps {
  currentLang: Language;
  onNavigate: (page: string) => void;
  onSelectServiceToApply: (service: ServiceItem) => void;
  onSelectServiceToView: (service: ServiceItem) => void;
  onSelectPost: (slug: string) => void;
}

export function HomePage({
  currentLang,
  onNavigate,
  onSelectServiceToApply,
  onSelectServiceToView,
  onSelectPost,
}: HomePageProps) {
  const t = translations[currentLang];
  const settings = getSettings();
  const services = getServices();
  const blogPosts = getBlogPosts().filter((p) => p.published !== false).slice(0, 3);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter services by category and search
  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      if (!srv.active) return false;
      const matchesCategory =
        selectedCategory === 'all' || srv.category === selectedCategory;
      const srvName = (srv.name[currentLang] || srv.name.en).toLowerCase();
      const srvDesc = (srv.shortDesc[currentLang] || srv.shortDesc.en).toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || srvName.includes(q) || srvDesc.includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [services, selectedCategory, searchQuery, currentLang]);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Services (10+)' },
    { id: 'gov_online', label: 'RITA & Civil Registry' },
    { id: 'tax_revenue', label: 'TRA & Tax Services' },
    { id: 'business_legal', label: 'BRELA & Business Names' },
    { id: 'licensing', label: 'TAUSI Business Licences' },
    { id: 'procurement', label: 'NeST Tenders' },
    { id: 'web_tech', label: 'Web Design & Tech' },
    { id: 'cloud_hosting', label: 'Hosting & Domains' },
    { id: 'applications', label: 'Online Portals' },
  ];

  const faqs = [
    {
      q: 'Is E27 an official government agency?',
      a: 'No. E27 is an independent private digital service and technology consultancy based in Kigamboni, Dar es Salaam. We assist citizens, entrepreneurs, and firms with professional documentation, online portal submissions, and IT solutions. Official legal certificates and licences are evaluated and issued by the respective state authorities (RITA, TRA, BRELA, TAUSI, etc.).',
    },
    {
      q: 'How fast can E27 process my application?',
      a: 'Our turnaround time is among the fastest in Tanzania. Standard services like TIN preparation or initial name reservation typically take 24 to 48 hours. Complex filings (such as Company Incorporation or NeST Tender dossiers) usually take 3 to 5 business days, subject to government agency review times.',
    },
    {
      q: 'How do I pay for E27 services?',
      a: 'We accept convenient and transparent mobile money transfers (M-Pesa, Tigo Pesa, Airtel Money, Halopesa) as well as commercial bank deposits. You will receive an official digital payment receipt and clear itemized invoice.',
    },
    {
      q: 'Can I apply if I am outside Dar es Salaam or living abroad?',
      a: 'Absolutely! Our platform is 100% digital. We serve clients across all regions of Mainland Tanzania, Zanzibar, and Tanzanians in the diaspora. Final certificates and digital credentials are securely delivered via encrypted email and WhatsApp.',
    },
    {
      q: 'What if I need help building a company website or hosting in Tanzania?',
      a: 'E27 has an in-house software engineering team specializing in responsive web design, .co.tz local domain registration, high-speed NVMe hosting, and custom digital portals.',
    },
  ];

  return (
    <div id="home-page-container" className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 bg-gradient-to-b from-blue-50/60 via-white to-slate-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border-b border-slate-100 dark:border-slate-800/80">
        {/* Subtle decorative glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-blue-400/10 via-cyan-400/10 to-indigo-500/10 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-cyan-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
              <span>Your Trusted Digital Partner in Kigamboni, Dar es Salaam</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              {t.hero.title || t.hero.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {t.hero.subtitle || t.hero.subheadline}
            </p>

            {/* Live Service Search Bar */}
            <div className="pt-2 max-w-2xl mx-auto">
              <div className="relative flex items-center shadow-lg shadow-blue-500/5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-2">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search RITA, TIN, BRELA, TAUSI, NeST, Web Design, Domains..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-slate-400 hover:text-slate-600 px-2"
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={() => {
                    const servicesEl = document.getElementById('services-grid-section');
                    if (servicesEl) servicesEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hidden sm:inline-flex px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-500/20 transition-all"
                >
                  Find Services
                </button>
              </div>
            </div>

            {/* CTAs & Trust Badges */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => {
                  const servicesEl = document.getElementById('services-grid-section');
                  if (servicesEl) servicesEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-xl shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>{t.hero.ctaApply || t.actions.applyNow}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('track')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700/60 shadow-sm transition-all"
              >
                <Search className="w-4 h-4 text-blue-500" />
                <span>{t.hero.ctaTrack || t.actions.trackStatus}</span>
              </button>

              <a
                href={`https://wa.me/${settings.whatsApp.replace(/[^0-9]/g, '')}?text=Hello%20E27,%20I%20would%20like%20to%20inquire%20about%20your%20digital%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Consultation</span>
              </a>
            </div>

            {/* Trust Badges Grid */}
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto text-left">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <Clock className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Fast Turnaround (24-48h)
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Verified & Accurate
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <Lock className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Secure & Confidential
                </span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <Headphones className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Live WhatsApp Updates
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES CATALOG SECTION */}
      <section id="services-grid-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
              Complete Digital Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.services?.title || 'Our Comprehensive Services'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl">
              {t.services?.subtitle || 'Explore our full suite of government online facilitation, business registration, and high-performance digital solutions.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline"
          >
            <span>{t.services?.viewAll || 'View All Services'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredServices.map((service) => {
            return (
              <div
                key={service.id}
                id={`service-card-${service.code}`}
                className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between hover:border-blue-400 dark:hover:border-cyan-500"
              >
                <div className="space-y-4">
                  {/* Category badge and turnaround time */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-300 border border-blue-100 dark:border-blue-900">
                      {service.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      {service.estimatedTime}
                    </span>
                  </div>

                  {/* Title & Short description */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                      {service.name[currentLang] || service.name.en}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                      {service.shortDesc[currentLang] || service.shortDesc.en}
                    </p>
                  </div>

                  {/* Prerequisites Preview */}
                  {service.requirements && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                        Key Requirements:
                      </span>
                      <ul className="space-y-1">
                        {((service.requirements && (service.requirements[currentLang] || service.requirements.en)) || []).slice(0, 2).map((req, i) => (
                          <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                            <span className="truncate">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => onSelectServiceToView(service)}
                    className="flex-1 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-center"
                  >
                    {t.actions.learnMore}
                  </button>

                  <button
                    onClick={() => onSelectServiceToApply(service)}
                    className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold tracking-wide shadow-md shadow-blue-500/20 transition-all text-center flex items-center justify-center gap-1"
                  >
                    <span>{t.actions.applyNow}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 p-8">
            <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No services found matching "{searchQuery}"
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs text-blue-600 dark:text-cyan-400 underline font-semibold"
            >
              Reset search filters
            </button>
          </div>
        )}
      </section>

      {/* 3. HOW IT WORKS / 4-STEP PROCESS */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Seamless Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {t.howItWorks?.title || 'How E27 Works'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {t.howItWorks?.subtitle || 'From application to completion in 4 easy, transparent steps.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 relative">
              <span className="text-3xl font-black text-cyan-400/40 absolute top-4 right-4">01</span>
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 text-cyan-300 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{t.howItWorks?.step1Title || 'Choose Service'}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t.howItWorks?.step1Desc || 'Browse our catalog and select the government portal or digital solution you need.'}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 relative">
              <span className="text-3xl font-black text-cyan-400/40 absolute top-4 right-4">02</span>
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 text-cyan-300 flex items-center justify-center mb-4">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{t.howItWorks?.step2Title || 'Submit Documents'}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t.howItWorks?.step2Desc || 'Fill our straightforward form and upload required supporting documents securely.'}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 relative">
              <span className="text-3xl font-black text-cyan-400/40 absolute top-4 right-4">03</span>
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 text-cyan-300 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{t.howItWorks?.step3Title || 'Expert Review'}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t.howItWorks?.step3Desc || 'Our specialists in Kigamboni review and lodge your documents through official systems.'}</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 relative">
              <span className="text-3xl font-black text-cyan-400/40 absolute top-4 right-4">04</span>
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 text-cyan-300 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{t.howItWorks?.step4Title || 'Get Results'}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{t.howItWorks?.step4Desc || 'Track status live and receive your processed certificate, TIN, or deployed website.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE E27 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
            The E27 Difference
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {t.whyChooseUs?.title || 'Why Choose E27?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t.whyChooseUs?.subtitle || 'Reliability, compliance, speed, and dedicated customer support at every step.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-cyan-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t.whyChooseUs?.fast || 'Fast & Reliable'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.whyChooseUs?.fastDesc || 'Rapid turnaround times with real-time live tracking for every application.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t.whyChooseUs?.accurate || 'Verified & Accurate'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.whyChooseUs?.accurateDesc || 'Thorough pre-submission auditing prevents delays and portal rejections.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t.whyChooseUs?.secure || 'Secure & Confidential'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.whyChooseUs?.secureDesc || 'Your personal and business data is handled with maximum privacy standards.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t.whyChooseUs?.allInOne || 'All-In-One Partner'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.whyChooseUs?.allInOneDesc || 'From RITA and BRELA to modern web design and hosting under one roof.'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. LATEST INSIGHTS & BLOG PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
              Guides, News & Portal Updates
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.blog?.title || 'Guides & Insights'}
            </h2>
          </div>

          <button
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post.slug)}
              className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-blue-600 dark:text-cyan-400 uppercase">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                  {post.title[currentLang] || post.title.en}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {post.excerpt[currentLang] || post.excerpt.en}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span>By {post.author}</span>
                <span className="text-blue-600 dark:text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read Guide <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Clear, honest answers about how E27 assists individuals and businesses in Tanzania.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
            >
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. KIGAMBONI OFFICE LOCATION CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              Walk-in or 100% Online
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Visit E27 in Kigamboni, Dar es Salaam
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We welcome clients at our physical office in Kigamboni, or you can complete your entire application online from anywhere in Tanzania. Fast, reliable, and completely transparent.
            </p>
            <p className="text-xs text-cyan-200 font-mono">
              Working Hours: {settings.officeHours}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors shadow-lg"
            >
              Contact & Directions
            </button>
            <a
              href={`https://wa.me/${settings.whatsApp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: {settings.whatsApp}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

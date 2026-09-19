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
import { getServices, getSettings } from '../../services/storage';

interface HomePageProps {
  currentLang: Language;
  onNavigate: (page: string) => void;
  onSelectServiceToApply: (service: ServiceItem) => void;
  onSelectServiceToView: (service: ServiceItem) => void;
  onSelectPost?: (slug: string) => void;
}

export function HomePage({
  currentLang,
  onNavigate,
  onSelectServiceToApply,
  onSelectServiceToView,
}: HomePageProps) {
  const t = translations[currentLang];
  const settings = getSettings();
  const services = getServices();

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
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-20 bg-gradient-to-b from-red-50/40 via-white to-gray-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 border-b border-gray-200/80 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-5">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.15]">
              {t.hero.title || t.hero.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {t.hero.subtitle || t.hero.subheadline}
            </p>
          </div>
        </div>
      </section>

      {/* 2. SERVICES CATALOG SECTION */}
      <section id="services-grid-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
              Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
              {t.services?.title || 'Our Comprehensive Services'}
            </h2>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-500 hover:underline"
          >
            <span>{t.services?.viewAll || 'View All Services'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Services Grid - Only Card, Service Name, and Centered Apply Button */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {services
            .filter((s) => s.active)
            .map((service) => {
              return (
                <div
                  key={service.id}
                  id={`service-card-${service.code}`}
                  className="group relative rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between hover:border-red-500 dark:hover:border-red-500 text-center"
                >
                  <div className="space-y-3 py-2">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                      {service.name[currentLang] || service.name.en}
                    </h3>
                  </div>

                  <div className="pt-5 mt-4 border-t border-gray-100 dark:border-gray-800 flex justify-center">
                    <button
                      onClick={() => onSelectServiceToApply(service)}
                      className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold tracking-wide shadow-md shadow-red-600/20 transition-all inline-flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>{t.actions.applyNow}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* 3. HOW IT WORKS / 4-STEP PROCESS */}
      <section className="bg-gray-900 dark:bg-black text-white py-16 sm:py-20 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-red-500">
              Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {t.howItWorks?.title || 'How E27 Works'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              {t.howItWorks?.subtitle || 'From application to completion in 4 easy, transparent steps.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-gray-800/80 border border-gray-700/80 relative">
              <span className="text-3xl font-black text-red-500/30 absolute top-4 right-4">01</span>
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{t.howItWorks?.step1Title || 'Choose Service'}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{t.howItWorks?.step1Desc || 'Browse our catalog and select the government portal or digital solution you need.'}</p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-800/80 border border-gray-700/80 relative">
              <span className="text-3xl font-black text-red-500/30 absolute top-4 right-4">02</span>
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center mb-4">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{t.howItWorks?.step2Title || 'Submit Details'}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{t.howItWorks?.step2Desc || 'Fill our straightforward form and upload required supporting documents securely.'}</p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-800/80 border border-gray-700/80 relative">
              <span className="text-3xl font-black text-red-500/30 absolute top-4 right-4">03</span>
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{t.howItWorks?.step3Title || 'Review'}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{t.howItWorks?.step3Desc || 'Our specialists in Kigamboni review and lodge your documents through official systems.'}</p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-800/80 border border-gray-700/80 relative">
              <span className="text-3xl font-black text-red-500/30 absolute top-4 right-4">04</span>
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{t.howItWorks?.step4Title || 'Get Results'}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{t.howItWorks?.step4Desc || 'Track status and receive your processed certificate, TIN, or deployed website.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE E27 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
            Why Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            {t.whyChooseUs?.title || 'Why Choose E27?'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {t.whyChooseUs?.subtitle || 'Reliability, compliance, speed, and dedicated customer support at every step.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/60 flex items-center justify-center text-red-600 dark:text-red-500">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              {t.whyChooseUs?.fast || 'Fast & Reliable'}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {t.whyChooseUs?.fastDesc || 'Rapid turnaround times with real-time updates for every application.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              {t.whyChooseUs?.accurate || 'Verified & Accurate'}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {t.whyChooseUs?.accurateDesc || 'Thorough pre-submission auditing prevents delays and portal rejections.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/60 flex items-center justify-center text-red-600 dark:text-red-500">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              {t.whyChooseUs?.secure || 'Secure & Confidential'}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {t.whyChooseUs?.secureDesc || 'Your personal and business data is handled with maximum privacy standards.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              {t.whyChooseUs?.allInOne || 'All-In-One Partner'}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {t.whyChooseUs?.allInOneDesc || 'From RITA and BRELA to modern web design and hosting under one roof.'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Clear, honest answers about how E27 assists individuals and businesses in Tanzania.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-2"
            >
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. KIGAMBONI OFFICE LOCATION CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-red-600 via-red-700 to-gray-900 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
              Walk-in or 100% Online
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Visit E27 in Kigamboni, Dar es Salaam
            </h3>
            <p className="text-xs sm:text-sm text-gray-100 leading-relaxed">
              We welcome clients at our physical office in Kigamboni, or you can complete your entire application online from anywhere in Tanzania. Fast, reliable, and completely transparent.
            </p>
            <p className="text-xs text-red-100 font-mono">
              Working Hours: {settings.officeHours}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-gray-900 font-bold text-xs hover:bg-gray-100 transition-colors shadow-lg"
            >
              Contact & Directions
            </button>
            <a
              href={`https://wa.me/${settings.whatsApp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gray-900/80 hover:bg-gray-900 border border-white/20 text-white font-bold text-xs transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>WhatsApp: {settings.whatsApp}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

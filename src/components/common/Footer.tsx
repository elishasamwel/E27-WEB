import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Globe,
  ArrowRight,
  Clock
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../translations';
import { getSettings } from '../../services/storage';

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (page: string) => void;
  onSelectService?: (serviceCode: string) => void;
}

export function Footer({
  currentLang,
  onLanguageChange,
  onNavigate,
  onSelectService,
}: FooterProps) {
  const t = translations[currentLang];
  const settings = getSettings();

  const servicesList = [
    { code: 'rita_birth', label: 'RITA Services' },
    { code: 'tra_tin', label: 'TRA Services' },
    { code: 'brela_reg', label: 'BRELA Registration' },
    { code: 'tausi_licence', label: 'TAUSI Business Licences' },
    { code: 'nest_tender', label: 'NeST Tender Support' },
    { code: 'web_design', label: 'Website Design' },
    { code: 'web_hosting', label: 'Website Hosting' },
    { code: 'tz_domains', label: 'Tanzania Local Domains (.co.tz)' },
    { code: 'online_jobs', label: 'Online Applications' },
  ];

  const quickLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'contact', label: t.nav.contact },
    { id: 'admin', label: t.nav.admin },
  ];

  return (
    <footer id="e27-main-footer" className="bg-gray-950 text-gray-300 border-t border-gray-800">
      {/* Upper CTA Strip */}
      <div className="bg-gradient-to-r from-red-950/70 via-gray-900 to-gray-950 border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ready to get your services processed?
            </h3>
            <p className="text-sm text-gray-400 max-w-2xl">
              From birth certificates and TIN registration to custom company websites and .co.tz domains — our team in Kijichi, Kigamboni is ready to help.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${settings.whatsApp.replace(/[^0-9]/g, '')}?text=Hello,%20I%20need%20assistance%20with%20online%20services`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white font-semibold text-sm shadow-md transition-all duration-150"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>WhatsApp Chat</span>
            </a>
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-lg shadow-red-900/40 transition-all duration-150"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info - Leave only the logo */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="cursor-pointer inline-flex items-center gap-2"
              title="Home"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white shadow-md shadow-red-600/30">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed pr-6">
              {t.footer.description}
            </p>

            {/* Social Media Icons (Without links) */}
            <div className="flex items-center gap-2.5 pt-2">
              <span
                className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 flex items-center justify-center cursor-default select-none"
                aria-label="Facebook"
              >
                <span className="font-bold text-sm">fb</span>
              </span>
              <span
                className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 flex items-center justify-center cursor-default select-none"
                aria-label="Instagram"
              >
                <span className="font-bold text-sm">ig</span>
              </span>
              <span
                className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 flex items-center justify-center cursor-default select-none"
                aria-label="X / Twitter"
              >
                <span className="font-bold text-sm">x</span>
              </span>
              <span
                className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 flex items-center justify-center cursor-default select-none"
                aria-label="LinkedIn"
              >
                <span className="font-bold text-sm">in</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3 h-3 text-gray-600" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t.footer.ourServices}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {servicesList.map((srv) => (
                <li key={srv.code}>
                  <button
                    onClick={() => {
                      if (onSelectService) {
                        onSelectService(srv.code);
                      } else {
                        onNavigate('services');
                      }
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors text-left truncate block max-w-full"
                  >
                    {srv.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Physical Location & Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t.footer.contactInfo}
            </h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-1" />
                <span>{settings.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-red-400">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-red-500 shrink-0" />
                <a
                  href={`https://wa.me/${settings.whatsApp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-red-400 font-medium"
                >
                  WhatsApp: {settings.whatsApp}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-red-400">
                  {settings.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-gray-400 pt-1 border-t border-gray-800">
                <Clock className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                <span>{settings.officeHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Language selection */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            <p>{t.footer.copyright} — Kigamboni, Dar es Salaam, Tanzania.</p>
            <p className="text-[11px] text-gray-500 mt-0.5">{t.footer.rights}</p>
          </div>

          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-400">Languages:</span>
            <div className="flex items-center gap-1.5">
              {[
                { code: 'en', label: 'EN' },
                { code: 'sw', label: 'SW' },
                { code: 'zh', label: 'ZH' },
                { code: 'fr', label: 'FR' },
                { code: 'de', label: 'DE' },
              ].map((l) => (
                <button
                  key={l.code}
                  onClick={() => onLanguageChange(l.code as Language)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                    currentLang === l.code
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

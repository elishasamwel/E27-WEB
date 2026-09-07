import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
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
    { id: 'blog', label: t.nav.blog },
    { id: 'track', label: t.nav.track },
    { id: 'contact', label: t.nav.contact },
    { id: 'admin', label: t.nav.admin },
  ];

  return (
    <footer id="e27-main-footer" className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Upper CTA Strip */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-950 to-slate-900 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ready to streamline your online services with E27?
            </h3>
            <p className="text-sm text-slate-400 max-w-2xl">
              From birth certificates and TIN registration to custom company websites and .co.tz domains — our team in Kigamboni is ready to help.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${settings.whatsApp.replace(/[^0-9]/g, '')}?text=Hello%20E27,%20I%20need%20assistance%20with%20online%20services`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-900/40 transition-all duration-150"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct Chat</span>
            </a>
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-900/40 transition-all duration-150"
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
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-mono font-bold text-lg shadow-md shadow-blue-500/20">
                E27
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tight">E27</span>
                <span className="text-xs uppercase font-semibold text-cyan-400 ml-2 tracking-wider">
                  Digital Services
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              {t.footer.description}
            </p>

            {/* Prominent Independence Disclaimer */}
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="leading-snug">
                <strong>Disclaimer:</strong> {t.disclaimer.short}
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <span className="font-bold text-sm">fb</span>
              </a>
              <a
                href={settings.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <span className="font-bold text-sm">ig</span>
              </a>
              <a
                href={settings.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="X / Twitter"
              >
                <span className="font-bold text-sm">x</span>
              </a>
              <a
                href={settings.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <span className="font-bold text-sm">in</span>
              </a>
              <a
                href={`https://wa.me/${settings.whatsApp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp Community"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
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
                    className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600" />
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
                    className="text-slate-400 hover:text-cyan-400 transition-colors text-left truncate block max-w-full"
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
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                <span>{settings.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-cyan-300">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${settings.whatsApp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-300 font-medium"
                >
                  WhatsApp: {settings.whatsApp}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-cyan-300">
                  {settings.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-400 pt-1 border-t border-slate-800">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{settings.officeHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Language selection */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>{t.footer.copyright} — Kigamboni, Dar es Salaam, Tanzania.</p>
            <p className="text-[11px] text-slate-500 mt-0.5">{t.footer.rights}</p>
          </div>

          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Languages:</span>
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
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
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

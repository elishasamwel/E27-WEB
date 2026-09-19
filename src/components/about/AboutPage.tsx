import {
  ShieldCheck,
  Award,
  Compass,
  MapPin,
  HeartHandshake,
  Laptop
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../translations';
import { getSettings } from '../../services/storage';

interface AboutPageProps {
  currentLang: Language;
  onNavigate: (page: string) => void;
}

export function AboutPage({ currentLang, onNavigate }: AboutPageProps) {
  const t = translations[currentLang];
  const settings = getSettings();

  return (
    <div id="about-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
          About
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          {t.about?.title || 'Empowering Tanzania’s Digital Future'}
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          {t.about?.subtitle || 'Bridging the gap between individuals, businesses, and essential online platforms through speed, integrity, and local expertise in Kigamboni, Dar es Salaam.'}
        </p>
      </div>

      {/* Prominent Independence Notice */}
      <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 max-w-4xl mx-auto flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-red-600 dark:text-red-500 shrink-0 mt-1" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white">
            Independent Digital Service Consultancy
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
            {t.disclaimer.full}
          </p>
        </div>
      </div>

      {/* Company Story & Location */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500 block">
            Who We Are
          </span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Bridging the Gap in Tanzania's Digital Ecosystem
          </h2>
          <p>
            Founded in Kigamboni, Dar es Salaam, <strong>E27</strong> was born out of a desire to eliminate bureaucratic friction and digital complexity for everyday citizens, ambitious entrepreneurs, and expanding enterprises.
          </p>
          <p>
            While Tanzania continues to rapidly modernize its public administrative portals (including RITA e-Huduma, TRA Taxpayer Portal, BRELA ORS, TAUSI for municipal trade licences, and NeST for public procurement), navigating requirements, formats, and technical prerequisites can be time-consuming and challenging.
          </p>
          <p>
            E27 acts as your knowledgeable, dependable bridge. In addition to administrative digital facilitation, our in-house engineering team crafts world-class websites, manages reliable cloud hosting, and secures official Tanzanian .tz domain identities.
          </p>
        </div>

        {/* Highlight Card */}
        <div className="rounded-3xl bg-gray-950 text-white p-8 border border-gray-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-red-500" />
            <div>
              <h3 className="text-lg font-bold text-white">Based in Kigamboni</h3>
              <p className="text-xs text-gray-400">{settings.location}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-gray-800">
            <div>
              <span className="text-gray-400 block">Office Hours</span>
              <span className="font-semibold text-gray-200">{settings.officeHours}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Reach</span>
              <span className="font-semibold text-gray-200">All 31 Regions & Diaspora</span>
            </div>
            <div>
              <span className="text-gray-400 block">WhatsApp Desk</span>
              <span className="font-semibold text-white">{settings.whatsApp}</span>
            </div>
            <div>
              <span className="text-gray-400 block">General Inquiries</span>
              <span className="font-semibold text-gray-200">{settings.email}</span>
            </div>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wide shadow-md shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get in Touch with Our Team
            </button>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/60 flex items-center justify-center text-red-600 dark:text-red-500">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {t.about?.missionTitle || 'Our Mission'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {t.about?.missionDesc || 'To simplify regulatory filings, online government portals, and digital transformation for all Tanzanians with reliable, transparent, and prompt services.'}
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {t.about?.visionTitle || 'Our Vision'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {t.about?.visionDesc || 'To be Tanzania’s most trusted private digital facilitation and technology brand, championing digital literacy and online efficiency across East Africa.'}
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
            Guiding Principles
          </span>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-lg bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-500 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Integrity & Honesty</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Transparent pricing, genuine timelines, and honest guidance at every milestone.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Customer Empathy</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              We treat every document and website with the care and attention it deserves.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-lg bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-500 flex items-center justify-center">
              <Laptop className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Digital Excellence</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Leveraging modern technologies to make digital workflows seamless and reliable.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-2">
            <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Confidentiality</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Strict data privacy safeguards for all personal IDs, tax numbers, and company files.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

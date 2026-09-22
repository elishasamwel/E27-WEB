import { useState, useId, type FormEvent } from 'react';
import {
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../translations';
import { getSettings, addContactMessage } from '../../services/storage';

interface ContactPageProps {
  currentLang: Language;
}

export function ContactPage({ currentLang }: ContactPageProps) {
  const t = translations[currentLang];
  const settings = getSettings();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiries',
    message: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in your name, email address, and message.');
      return;
    }

    try {
      addContactMessage(
        formData.name,
        formData.phone,
        formData.email,
        formData.subject,
        formData.message
      );
      setIsSuccess(true);
      setErrorMsg('');
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'General Inquiries',
        message: '',
      });
    } catch (err: any) {
      setErrorMsg('Failed to send message. Please try WhatsApp directly.');
    }
  };

  return (
    <div id="contact-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
          Contact Us
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          {t.contact?.title || 'Get in Touch with E27'}
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          {t.contact?.subtitle || 'Visit our office in Kijichi, Kigamboni, call, WhatsApp, or send us a message online.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Information Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-gray-950 text-white p-8 border border-gray-800 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Kijichi Office</h3>
                <p className="text-xs text-gray-400">{settings.location}</p>
              </div>
            </div>

            <div className="space-y-4 text-xs pt-4 border-t border-gray-800">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-400 block">Phone Support</span>
                  <a href={`tel:${settings.phone}`} className="font-semibold text-white hover:text-red-400">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-400 block">Direct WhatsApp Desk</span>
                  <a
                    href={`https://wa.me/${settings.whatsApp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-white hover:text-red-400 hover:underline"
                  >
                    {settings.whatsApp} (Quickest Reply)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-400 block">Email Inquiries</span>
                  <a href={`mailto:${settings.email}`} className="font-semibold text-white hover:text-red-400">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-400 block">Working Hours</span>
                  <span className="font-semibold text-gray-200">{settings.officeHours}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-center">
              <a
                href={`https://wa.me/${settings.whatsApp.replace(/[^0-9]/g, '')}?text=Hello%20E27,%20I%20am%20reaching%20out%20via%20your%20website%20contact%20page.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-red-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Start WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Independent disclaimer card */}
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs text-gray-700 dark:text-gray-300 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
            <div>
              <strong className="block mb-1 text-gray-900 dark:text-white">Independent Digital Facilitator:</strong>
              <span>{t.disclaimer.short}</span>
            </div>
          </div>
        </div>

        {/* Contact Form (Right) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Send Us a Message
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Fill in the form below and our team in Kigamboni will respond within 2 to 4 business hours.
              </p>
            </div>

            {isSuccess && (
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                <span>
                  Thank you! Your inquiry has been sent to our customer care desk. We will respond via phone, WhatsApp, or email shortly.
                </span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={nameId}
                    className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    id={nameId}
                    type="text"
                    required
                    placeholder="e.g., Juma Ally Mussa"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor={phoneId}
                    className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id={phoneId}
                    type="tel"
                    placeholder="e.g., +255 750 272 727"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={emailId}
                    className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    required
                    placeholder="e.g., juma@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor={subjectId}
                    className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Service Interested In
                  </label>
                  <select
                    id={subjectId}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none"
                  >
                    <option value="General Inquiries">General Inquiries</option>
                    <option value="RITA Birth / Death Certificate">RITA Birth / Death Certificate</option>
                    <option value="TRA TIN Registration">TRA TIN Registration</option>
                    <option value="BRELA Business Registration">BRELA Business Registration</option>
                    <option value="TAUSI Business Licence">TAUSI Business Licence</option>
                    <option value="NeST Tender Assistance">NeST Tender Assistance</option>
                    <option value="Website Design & Hosting">Website Design & Hosting</option>
                    <option value="Tanzania Domains (.co.tz)">Tanzania Domains (.co.tz)</option>
                    <option value="Online Job / University Application">Online Job / University Application</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor={messageId}
                  className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
                >
                  Your Message or Question *
                </label>
                <textarea
                  id={messageId}
                  rows={4}
                  required
                  placeholder="Tell us what you would like to accomplish..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-red-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

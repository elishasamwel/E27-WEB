import React, { useState, useId, type FormEvent } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Building,
  Sparkles,
  ExternalLink
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
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (err: any) {
      setErrorMsg('Failed to send message. Please try again.');
    }
  };

  return (
    <div id="contact-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          {t.contact?.title || 'Contact E27 Digital Services'}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">
          {t.contact?.subtitle || 'Have questions about RITA, TRA TIN, BRELA, or Web Design? Reach our Kigamboni team directly.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info Cards (Left) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Office Card */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-500/40 text-cyan-400 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Kigamboni Office</h3>
                <p className="text-xs text-slate-400">{settings.location}</p>
              </div>
            </div>

            <div className="space-y-4 text-xs pt-4 border-t border-slate-800">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Phone Support</span>
                  <a href={`tel:${settings.phone}`} className="font-semibold text-white hover:text-cyan-300">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Direct WhatsApp Desk</span>
                  <a
                    href={`https://wa.me/${settings.whatsApp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-emerald-300 hover:underline"
                  >
                    {settings.whatsApp} (Quickest Reply)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Email Inquiries</span>
                  <a href={`mailto:${settings.email}`} className="font-semibold text-white hover:text-cyan-300">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Working Hours</span>
                  <span className="font-semibold text-slate-200">{settings.officeHours}</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${settings.whatsApp.replace(/[^0-9]/g, '')}?text=Hello%20E27,%20I%20am%20reaching%20out%20via%20your%20website%20contact%20page.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Start WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Independent disclaimer card */}
          <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-300 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block mb-1">Independent Digital Facilitator:</strong>
              <span>{t.disclaimer.short}</span>
            </div>
          </div>
        </div>

        {/* Contact Form (Right) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Send Us a Message
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Fill in the form below and our team in Kigamboni will respond within 2 to 4 business hours.
              </p>
            </div>

            {isSuccess && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  Thank you! Your inquiry has been sent to our customer care desk. We will respond via phone, WhatsApp, or email shortly.
                </span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={nameId}
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
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
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor={phoneId}
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id={phoneId}
                    type="tel"
                    placeholder="e.g., +255 750 272 727"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={emailId}
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
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
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor={subjectId}
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Service Interested In
                  </label>
                  <select
                    id={subjectId}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
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
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
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
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-blue-500/20 transition-all"
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

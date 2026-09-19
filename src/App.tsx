import { useState, useEffect } from 'react';
import { Language, ServiceItem, ServiceApplication } from './types';
import { getServices, getSettings } from './services/storage';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './components/home/HomePage';
import { AboutPage } from './components/about/AboutPage';
import { ServicesPage } from './components/services/ServicesPage';
import { ContactPage } from './components/contact/ContactPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ApplicationModal } from './components/services/ApplicationModal';
import { ServiceDetailModal } from './components/services/ServiceDetailModal';
import { SubmissionSuccessModal } from './components/services/SubmissionSuccessModal';
import { MessageCircle, ArrowUp } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activePage, setActivePage] = useState<string>('home');
  const [trackRefId, setTrackRefId] = useState<string>('');

  // Language State
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem('e27_language');
    if (saved && ['en', 'sw', 'zh', 'fr', 'de'].includes(saved)) {
      return saved as Language;
    }
    return 'en';
  });

  // Dark Mode State
  const [isDark, setIsDark] = useState<boolean>(() => {
    return (
      localStorage.getItem('e27_theme') === 'dark' ||
      (!('e27_theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  // Modal States
  const [serviceToApply, setServiceToApply] = useState<ServiceItem | null>(null);
  const [serviceToView, setServiceToView] = useState<ServiceItem | null>(null);
  const [submittedApp, setSubmittedApp] = useState<ServiceApplication | null>(null);

  // Settings & Storage
  const settings = getSettings();
  const allServices = getServices();

  // Scroll to top on page change
  const navigateTo = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Language Switcher handler
  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('e27_language', lang);
  };

  // Theme Toggle handler
  const handleThemeToggle = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('e27_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('e27_theme', 'light');
    }
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Handle service selection by code (from footer or elsewhere)
  const handleSelectServiceByCode = (code: string) => {
    const srv = allServices.find((s) => s.code === code);
    if (srv) {
      setServiceToApply(srv);
    } else {
      navigateTo('services');
    }
  };

  // Render current view
  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <HomePage
            currentLang={currentLang}
            onNavigate={navigateTo}
            onSelectServiceToApply={(srv) => setServiceToApply(srv)}
            onSelectServiceToView={(srv) => setServiceToApply(srv)}
            onSelectPost={() => {}}
          />
        );

      case 'about':
        return <AboutPage currentLang={currentLang} onNavigate={navigateTo} />;

      case 'services':
        return (
          <ServicesPage
            currentLang={currentLang}
            onApply={(srv) => setServiceToApply(srv)}
            onViewDetails={(srv) => setServiceToApply(srv)}
          />
        );

      case 'contact':
        return <ContactPage currentLang={currentLang} />;

      case 'admin':
        return (
          <AdminDashboard
            currentLang={currentLang}
            onNavigateHome={() => navigateTo('home')}
          />
        );

      default:
        return (
          <HomePage
            currentLang={currentLang}
            onNavigate={navigateTo}
            onSelectServiceToApply={(srv) => setServiceToApply(srv)}
            onSelectServiceToView={(srv) => setServiceToApply(srv)}
            onSelectPost={() => {}}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-200">
      {/* Main Navigation Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
        activePage={activePage}
        onNavigate={navigateTo}
        onOpenServiceModal={() => {
          // Open first featured service application or navigate to services
          if (allServices.length > 0) {
            setServiceToApply(allServices[0]);
          } else {
            navigateTo('services');
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">{renderContent()}</main>

      {/* Global Footer */}
      <Footer
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onNavigate={navigateTo}
        onSelectService={handleSelectServiceByCode}
      />

      {/* Floating Action Button: Quick WhatsApp Assistance */}
      <aside aria-label="Quick WhatsApp Consultation" className="fixed bottom-6 right-6 z-40">
        <a
          href={`https://wa.me/${settings.whatsApp.replace(/[^0-9]/g, '')}?text=Hello,%20I%20need%20quick%20assistance%20with%20online%20services.`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-2xl shadow-red-600/40 hover:scale-105 transition-all duration-200"
          title="Direct WhatsApp Consultation"
        >
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </aside>

      {/* MODAL 1: Custom Service Application Form */}
      {serviceToApply && (
        <ApplicationModal
          service={serviceToApply}
          currentLang={currentLang}
          onClose={() => setServiceToApply(null)}
          onSuccess={(newApp) => {
            setServiceToApply(null);
            setSubmittedApp(newApp);
          }}
        />
      )}

      {/* MODAL 2: Service Detail Breakdown Modal */}
      {serviceToView && (
        <ServiceDetailModal
          service={serviceToView}
          currentLang={currentLang}
          onClose={() => setServiceToView(null)}
          onApply={(srv) => {
            setServiceToView(null);
            setServiceToApply(srv);
          }}
        />
      )}

      {/* MODAL 3: Application Submission Success Receipt */}
      {submittedApp && (
        <SubmissionSuccessModal
          application={submittedApp}
          currentLang={currentLang}
          onClose={() => setSubmittedApp(null)}
          onTrack={() => {
            setSubmittedApp(null);
            navigateTo('services');
          }}
        />
      )}
    </div>
  );
}

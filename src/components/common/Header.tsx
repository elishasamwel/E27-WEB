import { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Globe,
  Sun,
  Moon,
  Search,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../translations';
import { isAdminLoggedIn } from '../../services/storage';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  isDark: boolean;
  onThemeToggle: () => void;
  activePage: string;
  onNavigate: (page: string) => void;
  onOpenServiceModal?: () => void;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'sw', label: 'Kiswahili', flag: '🇹🇿' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export function Header({
  currentLang,
  onLanguageChange,
  isDark,
  onThemeToggle,
  activePage,
  onNavigate,
  onOpenServiceModal,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const t = translations[currentLang];

  useEffect(() => {
    setIsAdmin(isAdminLoggedIn());
    const handleStorage = () => setIsAdmin(isAdminLoggedIn());
    window.addEventListener('e27_storage_updated', handleStorage);
    return () => window.removeEventListener('e27_storage_updated', handleStorage);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'services', label: t.nav.services },
    { id: 'about', label: t.nav.about },
    { id: 'contact', label: t.nav.contact },
  ];

  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <header
      id="e27-main-header"
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800'
          : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo - ONLY the Logo Mark */}
          <div
            id="brand-logo"
            onClick={() => onNavigate('home')}
            className="flex items-center cursor-pointer group select-none"
            title="Home"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-red-600 hover:bg-red-700 flex items-center justify-center text-white shadow-md shadow-red-600/25 transition-all duration-200">
              <svg
                className="w-6 h-6 text-white"
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

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${
                  activePage === item.id
                    ? 'text-red-600 dark:text-red-500 bg-red-50 dark:bg-red-950/40 font-bold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Admin Dashboard shortcut button */}
            <button
              id="nav-admin-btn"
              onClick={() => onNavigate('admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors duration-150 ml-1 border ${
                activePage === 'admin'
                  ? 'border-red-500 text-red-600 bg-red-50 dark:bg-red-950/60 dark:text-red-400'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-red-400 hover:text-red-600 dark:hover:text-red-400'
              }`}
              title="Admin Portal Management"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{t.nav.admin}</span>
            </button>
          </nav>

          {/* Right Controls: Language & Theme Toggle (Simple Header) */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                id="language-selector-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-semibold hover:border-red-400 transition-colors"
                aria-label="Select Language"
              >
                <span className="text-base leading-none">{currentLangObj.flag}</span>
                <span className="hidden xl:inline">{currentLangObj.label}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {langDropdownOpen && (
                <div
                  id="language-dropdown-menu"
                  className="absolute right-0 mt-2 w-44 rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 dark:border-gray-700/60">
                    Language / Lugha
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-left transition-colors ${
                        currentLang === lang.code
                          ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-semibold'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/60'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark/White Mode Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={onThemeToggle}
              className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 hover:border-red-400 transition-colors"
              aria-label="Toggle light and dark mode"
              title={isDark ? 'Switch to White Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-700" />}
            </button>
          </div>

          {/* Mobile Hamburger & Theme Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="mobile-theme-toggle"
              onClick={onThemeToggle}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-700" />}
            </button>
            <button
              id="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer - Simple, Red/White/Gray, No Get Started */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="sm:hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 pt-3 pb-6 space-y-3"
        >
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-xs font-semibold text-gray-400 uppercase">Language / Lugha</span>
            <div className="flex gap-1.5">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => onLanguageChange(l.code)}
                  className={`px-2.5 py-1 text-xs rounded font-medium ${
                    currentLang === l.code
                      ? 'bg-red-600 text-white font-bold'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {l.flag}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-left ${
                  activePage === item.id
                    ? 'bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400 font-bold'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}

            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-red-600"
            >
              <UserCheck className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span>{t.nav.admin}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

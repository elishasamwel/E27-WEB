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
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'blog', label: t.nav.blog },
    { id: 'track', label: t.nav.track },
    { id: 'contact', label: t.nav.contact },
  ];

  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <header
      id="e27-main-header"
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800'
          : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800/60'
      }`}
    >
      {/* Top Banner Notice: Clarifying Independent Digital Service Provider */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-cyan-200 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-blue-800/40">
        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span className="truncate max-w-3xl">
          {t.disclaimer.short}
        </span>
        <button
          onClick={() => onNavigate('contact')}
          className="hidden md:inline-flex items-center text-white hover:text-cyan-300 ml-3 underline text-[11px]"
        >
          Kigamboni Office: +255 750 272 727
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            id="brand-logo"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="font-extrabold tracking-tight text-xl font-mono">E27</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  E27
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-cyan-300">
                  Digital
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Simplifying Your Digital World
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${
                  activePage === item.id
                    ? 'text-blue-600 dark:text-cyan-400 bg-blue-50/80 dark:bg-blue-950/50'
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Admin Dashboard shortcut button */}
            <button
              id="nav-admin-btn"
              onClick={() => onNavigate('admin')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors duration-150 ml-1 border ${
                activePage === 'admin'
                  ? 'border-indigo-400 text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-400 hover:text-blue-600'
              }`}
              title="Admin Portal Management"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>{t.nav.admin}</span>
            </button>
          </nav>

          {/* Right Controls: Language, Theme, Get Started */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                id="language-selector-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:border-blue-400 transition-colors"
                aria-label="Select Language"
              >
                <span className="text-base leading-none">{currentLangObj.flag}</span>
                <span className="hidden xl:inline">{currentLangObj.label}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {langDropdownOpen && (
                <div
                  id="language-dropdown-menu"
                  className="absolute right-0 mt-2 w-44 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-700/60">
                    Select Language / Chagua Lugha
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
                          ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-cyan-300 font-semibold'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark/Light Mode Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={onThemeToggle}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-300 transition-colors"
              aria-label="Toggle light and dark mode"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Primary Action CTA */}
            <button
              id="header-get-started-btn"
              onClick={() => {
                if (onOpenServiceModal) {
                  onOpenServiceModal();
                } else {
                  onNavigate('services');
                }
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-500/20 hover:shadow-lg transition-all duration-150 transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>{t.nav.getStarted}</span>
            </button>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="mobile-theme-toggle"
              onClick={onThemeToggle}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              id="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="sm:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-3"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-400 uppercase">Language / Lugha</span>
            <div className="flex gap-1.5">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => onLanguageChange(l.code)}
                  className={`px-2 py-1 text-xs rounded ${
                    currentLang === l.code
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
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
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-cyan-400'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
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
              className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
            >
              <UserCheck className="w-4 h-4" />
              <span>{t.nav.admin}</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenServiceModal) onOpenServiceModal();
                else onNavigate('services');
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-md"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>{t.nav.getStarted}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

import { useState, type FormEvent } from 'react';
import { X, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ServiceItem, Language, ServiceApplication } from '../../types';
import { translations } from '../../translations';
import { submitApplication } from '../../services/storage';

interface ApplicationModalProps {
  service: ServiceItem;
  currentLang: Language;
  onClose: () => void;
  onSuccess: (application: ServiceApplication) => void;
}

export function ApplicationModal({
  service,
  currentLang,
  onClose,
  onSuccess,
}: ApplicationModalProps) {
  const t = translations[currentLang];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Common contact info
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  // Service specific state
  const [customFields, setCustomFields] = useState<Record<string, string>>({});

  const handleCustomChange = (key: string, value: string) => {
    setCustomFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name or applicant name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please enter your phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newApp = submitApplication(
        service,
        {
          fullName: fullName.trim(),
          phone: phone.trim(),
          whatsApp: phone.trim(),
          email: email.trim(),
          address: customFields.address || customFields.location || '',
        },
        {
          ...customFields,
          message: notes.trim(),
        },
        []
      );

      setTimeout(() => {
        setIsSubmitting(false);
        onSuccess(newApp);
      }, 400);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Failed to submit application. Please try again.');
    }
  };

  const serviceName = service.name[currentLang] || service.name.en;

  // Render service-specific custom fields
  const renderServiceSpecificFields = () => {
    switch (service.code) {
      // 1. RITA Birth Certificate
      case 'rita_birth':
        return (
          <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
              Birth Details (RITA)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Child's Date of Birth <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={customFields.dateOfBirth || ''}
                  onChange={(e) => handleCustomChange('dateOfBirth', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Place of Birth (Hospital / District)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Amana Hospital, Ilala"
                  value={customFields.placeOfBirth || ''}
                  onChange={(e) => handleCustomChange('placeOfBirth', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Father's Full Name & NIDA
                </label>
                <input
                  type="text"
                  placeholder="Father's name and NIDA number"
                  value={customFields.fatherDetails || ''}
                  onChange={(e) => handleCustomChange('fatherDetails', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Mother's Full Name & NIDA
                </label>
                <input
                  type="text"
                  placeholder="Mother's name and NIDA number"
                  value={customFields.motherDetails || ''}
                  onChange={(e) => handleCustomChange('motherDetails', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Clinic Card / Hospital Notification No.
              </label>
              <input
                type="text"
                placeholder="e.g., CLINIC-098234"
                value={customFields.clinicCardNo || ''}
                onChange={(e) => handleCustomChange('clinicCardNo', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>
          </div>
        );

      // 2. RITA Death Certificate
      case 'rita_death':
        return (
          <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
              Deceased & Permit Details (RITA)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Deceased Person's Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full legal name"
                  value={customFields.deceasedName || ''}
                  onChange={(e) => handleCustomChange('deceasedName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Date of Death <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={customFields.dateOfDeath || ''}
                  onChange={(e) => handleCustomChange('dateOfDeath', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Place of Death (Hospital / Region)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Muhimbili, Dar es Salaam"
                  value={customFields.placeOfDeath || ''}
                  onChange={(e) => handleCustomChange('placeOfDeath', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Burial Permit / Cause of Death No.
                </label>
                <input
                  type="text"
                  placeholder="Permit number or reference"
                  value={customFields.burialPermitNo || ''}
                  onChange={(e) => handleCustomChange('burialPermitNo', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Relationship to Deceased
              </label>
              <input
                type="text"
                placeholder="e.g., Son, Daughter, Spouse, Executor"
                value={customFields.relationship || ''}
                onChange={(e) => handleCustomChange('relationship', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>
          </div>
        );

      // 3. TRA TIN Registration
      case 'tra_tin':
        return (
          <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
              TRA Taxpayer Portal Information
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  NIDA National ID Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="20-digit NIDA number"
                  value={customFields.nidaNumber || ''}
                  onChange={(e) => handleCustomChange('nidaNumber', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  TIN Category <span className="text-red-600">*</span>
                </label>
                <select
                  value={customFields.tinCategory || 'individual'}
                  onChange={(e) => handleCustomChange('tinCategory', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                >
                  <option value="individual">Individual TIN (Personal/Employment/Driver)</option>
                  <option value="business_sole">Business TIN (Sole Proprietor / Biashara)</option>
                  <option value="company">Company / Corporate TIN (Limited Company)</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Business / Trading Name (if applicable)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Kigamboni Fresh Supplies"
                  value={customFields.businessName || ''}
                  onChange={(e) => handleCustomChange('businessName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Physical Premises (Region & District)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Dar es Salaam, Kigamboni, Tuangoma"
                  value={customFields.location || ''}
                  onChange={(e) => handleCustomChange('location', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        );

      // 4. TAUSI Business Licence
      case 'tausi_licence':
        return (
          <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
              TAUSI Local Government Licence Info
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Registered Business Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Exact registered business name"
                  value={customFields.businessName || ''}
                  onChange={(e) => handleCustomChange('businessName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  TRA TIN Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="9-digit TIN number"
                  value={customFields.tinNumber || ''}
                  onChange={(e) => handleCustomChange('tinNumber', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none font-mono"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  BRELA Registration Number
                </label>
                <input
                  type="text"
                  placeholder="e.g., BN-123456 or 154321"
                  value={customFields.brelaNo || ''}
                  onChange={(e) => handleCustomChange('brelaNo', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Municipal Council & Ward
                </label>
                <input
                  type="text"
                  placeholder="e.g., Kigamboni MC, Vijibweni Ward"
                  value={customFields.councilWard || ''}
                  onChange={(e) => handleCustomChange('councilWard', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Business Activity / Sector
              </label>
              <input
                type="text"
                placeholder="e.g., Pharmacy, Retail Shop, Hardware, Consultancy"
                value={customFields.businessSector || ''}
                onChange={(e) => handleCustomChange('businessSector', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>
          </div>
        );

      // 5. BRELA Registration
      case 'brela_reg':
        return (
          <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
              BRELA Name & Incorporation Choices
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Entity Type to Register <span className="text-red-600">*</span>
              </label>
              <select
                value={customFields.entityType || 'sole_proprietor'}
                onChange={(e) => handleCustomChange('entityType', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
              >
                <option value="sole_proprietor">Sole Proprietorship (Business Name / Jina la Biashara)</option>
                <option value="limited_company">Private Limited Company (Ltd / Kampuni)</option>
                <option value="partnership">Partnership Entity (Ubia)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                3 Proposed Names in order of preference <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Choice 1: Primary Preferred Name"
                value={customFields.nameChoice1 || ''}
                onChange={(e) => handleCustomChange('nameChoice1', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Choice 2: Alternative Name"
                value={customFields.nameChoice2 || ''}
                onChange={(e) => handleCustomChange('nameChoice2', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Choice 3: Fallback Name"
                value={customFields.nameChoice3 || ''}
                onChange={(e) => handleCustomChange('nameChoice3', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Core Objectives / Line of Business
              </label>
              <input
                type="text"
                placeholder="e.g., General Supply, Construction, IT Services, Agriculture"
                value={customFields.businessObjectives || ''}
                onChange={(e) => handleCustomChange('businessObjectives', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>
          </div>
        );

      // 6. NeST Tenders
      case 'nest_tender':
        return (
          <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
              NeST Procurement Portal Information
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Company Legal Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Registered company name"
                  value={customFields.companyName || ''}
                  onChange={(e) => handleCustomChange('companyName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  NeST Vendor ID (or "New Registration")
                </label>
                <input
                  type="text"
                  placeholder="e.g., VENDOR-7821 or New"
                  value={customFields.nestVendorId || ''}
                  onChange={(e) => handleCustomChange('nestVendorId', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none font-mono"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Tender Reference / Notice Number
                </label>
                <input
                  type="text"
                  placeholder="e.g., PA/001/2026/HQ/G/01"
                  value={customFields.tenderRef || ''}
                  onChange={(e) => handleCustomChange('tenderRef', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Procuring Entity (Ministry / Agency)
                </label>
                <input
                  type="text"
                  placeholder="e.g., TANROADS, TANESCO, Ministry of Health"
                  value={customFields.procuringEntity || ''}
                  onChange={(e) => handleCustomChange('procuringEntity', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        );

      // 7. Online Jobs & PSRS
      case 'online_jobs':
        return (
          <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
              Employment & PSRS Application Details
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  NIDA National ID Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="20-digit NIDA number"
                  value={customFields.nidaNumber || ''}
                  onChange={(e) => handleCustomChange('nidaNumber', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Target Portal / Employer
                </label>
                <input
                  type="text"
                  placeholder="e.g., PSRS (Utumishi) / Private Bank"
                  value={customFields.targetPortal || ''}
                  onChange={(e) => handleCustomChange('targetPortal', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Job Vacancy Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Accountant II, Records Officer"
                  value={customFields.jobTitle || ''}
                  onChange={(e) => handleCustomChange('jobTitle', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Highest Qualification Level
                </label>
                <select
                  value={customFields.educationLevel || 'degree'}
                  onChange={(e) => handleCustomChange('educationLevel', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                >
                  <option value="degree">Bachelor's Degree</option>
                  <option value="diploma">Ordinary Diploma</option>
                  <option value="masters">Master's Degree</option>
                  <option value="certificate">Certificate / Form IV/VI</option>
                </select>
              </div>
            </div>
          </div>
        );

      // 8. College & University Admissions
      case 'online_college':
        return (
          <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
              Admissions & TCU/NACTE Index Numbers
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Form IV (CSEE) Index No. <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., S0101/0001/2021"
                  value={customFields.form4Index || ''}
                  onChange={(e) => handleCustomChange('form4Index', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Form VI (ACSEE) or Diploma No.
                </label>
                <input
                  type="text"
                  placeholder="e.g., S0101/0501/2023"
                  value={customFields.form6Index || ''}
                  onChange={(e) => handleCustomChange('form6Index', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none font-mono"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Preferred University / College
                </label>
                <input
                  type="text"
                  placeholder="e.g., UDSM, UDOM, CBE, IFM"
                  value={customFields.preferredCollege || ''}
                  onChange={(e) => handleCustomChange('preferredCollege', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Apply for HESLB Loan?
                </label>
                <select
                  value={customFields.heslbNeeded || 'yes'}
                  onChange={(e) => handleCustomChange('heslbNeeded', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                >
                  <option value="yes">Yes, include HESLB loan application</option>
                  <option value="no">No, admissions only</option>
                </select>
              </div>
            </div>
          </div>
        );

      // 9. Website Design
      case 'web_design':
        return (
          <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
              Website Project Specifications
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Website Archetype / Purpose <span className="text-red-600">*</span>
                </label>
                <select
                  value={customFields.webType || 'corporate'}
                  onChange={(e) => handleCustomChange('webType', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                >
                  <option value="corporate">Corporate Business Website</option>
                  <option value="ecommerce">E-Commerce / Online Store</option>
                  <option value="ngo">NGO / Non-Profit Institution</option>
                  <option value="portfolio">Portfolio / Personal Brand</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Desired Domain Name (if decided)
                </label>
                <input
                  type="text"
                  placeholder="e.g., mybusiness.co.tz"
                  value={customFields.desiredDomain || ''}
                  onChange={(e) => handleCustomChange('desiredDomain', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Key Features Required
              </label>
              <input
                type="text"
                placeholder="e.g., WhatsApp chat button, Mobile payments (M-Pesa), Product gallery, Contact form"
                value={customFields.webFeatures || ''}
                onChange={(e) => handleCustomChange('webFeatures', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>
          </div>
        );

      // 10. Web Hosting
      case 'web_hosting':
        return (
          <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
              Cloud Hosting Specifications
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Domain Name to Host <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., company.co.tz"
                  value={customFields.domainToHost || ''}
                  onChange={(e) => handleCustomChange('domainToHost', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Hosting Tier Needed
                </label>
                <select
                  value={customFields.hostingTier || 'business'}
                  onChange={(e) => handleCustomChange('hostingTier', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                >
                  <option value="starter">Starter SSD (10 GB, 5 Emails)</option>
                  <option value="business">Business Cloud (30 GB, Unlimited Emails)</option>
                  <option value="enterprise">Enterprise Cloud (Unlimited SSD, Dedicated IP)</option>
                </select>
              </div>
            </div>
          </div>
        );

      // 11. Tanzania Local Domains (.co.tz)
      case 'tz_domains':
        return (
          <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
              Tanzania tzNIC Domain Registration
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Preferred Domain Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., yourname.co.tz"
                  value={customFields.domainName || ''}
                  onChange={(e) => handleCustomChange('domainName', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Registration Period
                </label>
                <select
                  value={customFields.registrationDuration || '1_year'}
                  onChange={(e) => handleCustomChange('registrationDuration', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
                >
                  <option value="1_year">1 Year</option>
                  <option value="2_years">2 Years (Discounted)</option>
                  <option value="5_years">5 Years</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Registrant Organization / Person
              </label>
              <input
                type="text"
                placeholder="Official owner name in registry"
                value={customFields.registrantName || ''}
                onChange={(e) => handleCustomChange('registrantName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>
          </div>
        );

      // Default fallback
      default:
        return (
          <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Service Requirements / Specific Needs
              </label>
              <input
                type="text"
                placeholder="Provide any key references or identification numbers..."
                value={customFields.specificNeed || ''}
                onChange={(e) => handleCustomChange('specificNeed', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div
      id="application-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden text-gray-900 dark:text-white transition-colors max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
              Apply For Service
            </span>
            <h2 className="text-xl font-black text-gray-900 dark:text-white">
              {serviceName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: Applicant Primary Contact */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
              Applicant Contact Details
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="app-full-name"
                  className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
                >
                  Full Name / Contact Person <span className="text-red-600">*</span>
                </label>
                <input
                  id="app-full-name"
                  type="text"
                  required
                  placeholder="e.g., Juma Rashidi Hamisi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none placeholder:text-gray-400"
                />
              </div>

              <div>
                <label
                  htmlFor="app-phone"
                  className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
                >
                  Phone Number (WhatsApp) <span className="text-red-600">*</span>
                </label>
                <input
                  id="app-phone"
                  type="tel"
                  required
                  placeholder="e.g., +255 750 272 727"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="app-email"
                className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Email Address
              </label>
              <input
                id="app-email"
                type="email"
                placeholder="e.g., info@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Section 2: Service-Specific Custom Fields */}
          {renderServiceSpecificFields()}

          {/* Section 3: Message / Additional Notes */}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <label
              htmlFor="app-message"
              className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
            >
              Additional Message or Specific Instructions
            </label>
            <textarea
              id="app-message"
              rows={3}
              placeholder="Any additional details, urgent requests, or documents to note..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:ring-2 focus:ring-red-600 focus:outline-none placeholder:text-gray-400 resize-none"
            />
          </div>

          {/* Footer Controls: Centered / Clean */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {t.actions.cancel || 'Cancel'}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-7 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wide shadow-md shadow-red-600/20 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Application</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

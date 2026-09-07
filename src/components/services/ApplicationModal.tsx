import { useState, useId, type ChangeEvent } from 'react';
import {
  X,
  CheckCircle2,
  UploadCloud,
  FileText,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Trash2,
  ShieldAlert,
  Sparkles,
  Info
} from 'lucide-react';
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
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Step 1: Personal & Contact Information
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    phone: '',
    whatsApp: '',
    email: '',
    address: '',
    notes: '',
  });

  // Step 2: Service Specific Form State
  const [serviceDetails, setServiceDetails] = useState<Record<string, any>>({});

  // Step 3: Uploaded Documents (simulated file storage with previews)
  const [documents, setDocuments] = useState<
    Array<{ name: string; size: number; type: string; dataUrl?: string }>
  >([]);

  // Step 4: Agreement
  const [agreed, setAgreed] = useState(true);

  const fileInputId = useId();

  // Helper to update specific service field
  const handleServiceDetailChange = (field: string, value: any) => {
    setServiceDetails((prev) => ({ ...prev, [field]: value }));
  };

  // Document upload handler
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newDocs: Array<{ name: string; size: number; type: string; dataUrl?: string }> = [];

    Array.from(files).forEach((file: File) => {
      // Validate file size: 10MB limit
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage(`File ${file.name} exceeds 10MB limit.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        newDocs.push({
          name: file.name,
          size: file.size,
          type: file.type,
          dataUrl: reader.result as string,
        });
        if (newDocs.length === files.length) {
          setDocuments((prev) => [...prev, ...newDocs]);
          setErrorMessage('');
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeDoc = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  // Validation before step progress
  const validateStep = (step: number): boolean => {
    setErrorMessage('');
    if (step === 1) {
      if (!personalInfo.fullName.trim()) {
        setErrorMessage('Please enter your full legal name.');
        return false;
      }
      if (!personalInfo.phone.trim()) {
        setErrorMessage('Please enter a valid telephone number.');
        return false;
      }
      if (!personalInfo.email.trim() || !personalInfo.email.includes('@')) {
        setErrorMessage('Please enter a valid email address.');
        return false;
      }
      if (!personalInfo.address.trim()) {
        setErrorMessage('Please enter your location or address (e.g., Kigamboni, Dar es Salaam).');
        return false;
      }
      return true;
    }

    if (step === 2) {
      // Validate service specifics
      if (service.code === 'rita_birth') {
        if (!serviceDetails.dob || !serviceDetails.pob || !serviceDetails.fatherName || !serviceDetails.motherName) {
          setErrorMessage('Please complete all required RITA fields: Date of Birth, Place of Birth, Father & Mother names.');
          return false;
        }
      } else if (service.code === 'tra_tin') {
        if (!serviceDetails.tinType || !serviceDetails.nidaNumber) {
          setErrorMessage('Please select TIN category and enter your NIDA/National ID number.');
          return false;
        }
      } else if (service.code === 'brela_reg') {
        if (!serviceDetails.businessNames || !serviceDetails.businessType) {
          setErrorMessage('Please provide proposed business name(s) and select the entity type.');
          return false;
        }
      } else if (service.code === 'tausi_licence') {
        if (!serviceDetails.businessName || !serviceDetails.licenceType) {
          setErrorMessage('Please enter your business trade name and licence classification.');
          return false;
        }
      } else if (service.code === 'nest_tender') {
        if (!serviceDetails.companyName || !serviceDetails.tenderTitle) {
          setErrorMessage('Please state your company name and the tender name or reference.');
          return false;
        }
      } else if (service.code === 'web_design') {
        if (!serviceDetails.projectType || !serviceDetails.desiredFeatures) {
          setErrorMessage('Please specify your website type and required features.');
          return false;
        }
      } else if (service.code === 'tz_domains') {
        if (!serviceDetails.domainName) {
          setErrorMessage('Please enter your desired domain name.');
          return false;
        }
      }
      return true;
    }

    if (step === 3) {
      // Step 3: Documents are optional or recommended, so pass
      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    setErrorMessage('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (!agreed) {
      setErrorMessage('Please confirm authorization checkbox before submitting.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const app = submitApplication(
        service,
        {
          fullName: personalInfo.fullName,
          phone: personalInfo.phone,
          whatsApp: personalInfo.whatsApp || personalInfo.phone,
          email: personalInfo.email,
          address: personalInfo.address,
        },
        {
          ...serviceDetails,
          generalNotes: personalInfo.notes,
        },
        documents
      );

      setTimeout(() => {
        setIsSubmitting(false);
        onSuccess(app);
      }, 500);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err?.message || 'Failed to submit application. Please try again.');
    }
  };

  // Render Service Specific Fields (Step 2)
  const renderServiceSpecificFields = () => {
    switch (service.code) {
      // 1. RITA Birth Certificate
      case 'rita_birth':
        return (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 text-xs text-blue-800 dark:text-blue-300 flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Please provide accurate birth facts exactly as recorded in clinic cards or hospital notifications.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Application Type *
                </label>
                <select
                  value={serviceDetails.applicationType || 'New Birth Certificate'}
                  onChange={(e) => handleServiceDetailChange('applicationType', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="New Birth Certificate">New Birth Certificate (First-time)</option>
                  <option value="Late Registration">Late Registration (Born over 10 years ago)</option>
                  <option value="Verification of Existing Certificate">Verification of Existing Certificate</option>
                  <option value="Correction / Amendment of Name">Correction / Amendment of Name</option>
                  <option value="Certified True Copy">Certified True Copy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Gender *
                </label>
                <select
                  value={serviceDetails.gender || 'Male'}
                  onChange={(e) => handleServiceDetailChange('gender', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Male">Male / Mwanamume</option>
                  <option value="Female">Female / Mwanamke</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={serviceDetails.dob || ''}
                  onChange={(e) => handleServiceDetailChange('dob', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Place of Birth (Hospital / Clinic / Town) *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Temeke Hospital, Dar es Salaam"
                  value={serviceDetails.pob || ''}
                  onChange={(e) => handleServiceDetailChange('pob', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Father’s Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Bakari Juma Mtambo"
                  value={serviceDetails.fatherName || ''}
                  onChange={(e) => handleServiceDetailChange('fatherName', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Mother’s Full Maiden Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Zubeda Said Ally"
                  value={serviceDetails.motherName || ''}
                  onChange={(e) => handleServiceDetailChange('motherName', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Region of Residence *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Dar es Salaam"
                  value={serviceDetails.region || ''}
                  onChange={(e) => handleServiceDetailChange('region', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  District & Ward *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Kigamboni, Tuangoma"
                  value={serviceDetails.districtWard || ''}
                  onChange={(e) => handleServiceDetailChange('districtWard', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        );

      // 2. TRA Services Form
      case 'tra_tin':
        return (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                A valid NIDA National ID or NIDA verification number is mandatory for TRA Taxpayer Identification registration.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  TIN Category *
                </label>
                <select
                  value={serviceDetails.tinType || 'Individual TIN'}
                  onChange={(e) => handleServiceDetailChange('tinType', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Individual TIN">Individual TIN (Personal use, driving license, bank)</option>
                  <option value="Sole Proprietor Business TIN">Sole Proprietorship Business TIN</option>
                  <option value="Company / Corporate TIN">Company / Corporate TIN</option>
                  <option value="TIN Retrieval / Lost Certificate">TIN Certificate Retrieval / Reprint</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  NIDA Number (National ID) *
                </label>
                <input
                  type="text"
                  placeholder="e.g., 19920815-11105-00001-22"
                  value={serviceDetails.nidaNumber || ''}
                  onChange={(e) => handleServiceDetailChange('nidaNumber', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Business / Trading Name (If applicable)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Rashid Logistics & Supplies"
                  value={serviceDetails.businessName || ''}
                  onChange={(e) => handleServiceDetailChange('businessName', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred TRA Tax Office Location
                </label>
                <select
                  value={serviceDetails.taxCenter || 'Temeke / Kigamboni'}
                  onChange={(e) => handleServiceDetailChange('taxCenter', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Temeke / Kigamboni">Temeke / Kigamboni Branch (Dar es Salaam)</option>
                  <option value="Ilala / Kariakoo">Ilala / Kariakoo Branch (Dar es Salaam)</option>
                  <option value="Kinondoni">Kinondoni Branch (Dar es Salaam)</option>
                  <option value="Samora Ave Main Office">Samora Ave / DIT Main Office</option>
                  <option value="Other Regional Center">Other Regional Center in Tanzania</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Existing TIN Number (If retrieving or updating)
                </label>
                <input
                  type="text"
                  placeholder="e.g., 100-234-567"
                  value={serviceDetails.existingTin || ''}
                  onChange={(e) => handleServiceDetailChange('existingTin', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>
          </div>
        );

      // 3. BRELA Form
      case 'brela_reg':
        return (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Entity Type to Register *
                </label>
                <select
                  value={serviceDetails.businessType || 'Sole Proprietor Business Name'}
                  onChange={(e) => handleServiceDetailChange('businessType', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Sole Proprietor Business Name">Business Name (Sole Proprietor / BN)</option>
                  <option value="Partnership">Partnership Firm</option>
                  <option value="Private Limited Company (Ltd)">Private Limited Company (Ltd / LLC)</option>
                  <option value="Company Limited by Guarantee (NGO/Trust)">Company Limited by Guarantee / Non-Profit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Proposed Business Name Options (in order of priority) *
                </label>
                <input
                  type="text"
                  placeholder="Option 1, Option 2, Option 3"
                  value={serviceDetails.businessNames || ''}
                  onChange={(e) => handleServiceDetailChange('businessNames', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Principal Business Activities / Scope *
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your goods, services, or industry (e.g. General merchant, IT services, civil engineering, transport)..."
                  value={serviceDetails.activities || ''}
                  onChange={(e) => handleServiceDetailChange('activities', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Number of Directors / Owners
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={serviceDetails.directorCount || 1}
                  onChange={(e) => handleServiceDetailChange('directorCount', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Registered Office Location (Plot / Street / Ward)
                </label>
                <input
                  type="text"
                  placeholder="e.g., South Beach Road, Kigamboni"
                  value={serviceDetails.officeAddress || ''}
                  onChange={(e) => handleServiceDetailChange('officeAddress', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        );

      // 4. TAUSI Licence Form
      case 'tausi_licence':
        return (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Registered Business Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., E27 Digital Hub"
                  value={serviceDetails.businessName || ''}
                  onChange={(e) => handleServiceDetailChange('businessName', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Licence Action *
                </label>
                <select
                  value={serviceDetails.licenceType || 'New Business Licence'}
                  onChange={(e) => handleServiceDetailChange('licenceType', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="New Business Licence">New Municipal Business Licence</option>
                  <option value="Annual Renewal">Annual Licence Renewal</option>
                  <option value="Change of Premise / Relocation">Change of Premise / Relocation</option>
                  <option value="Branch Licence">Additional Branch Licence</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Business Location / Local Municipal Council
                </label>
                <input
                  type="text"
                  placeholder="e.g., Kigamboni Municipal Council"
                  value={serviceDetails.municipalCouncil || ''}
                  onChange={(e) => handleServiceDetailChange('municipalCouncil', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  TRA TIN Number of Business
                </label>
                <input
                  type="text"
                  placeholder="e.g., 148-922-340"
                  value={serviceDetails.businessTin || ''}
                  onChange={(e) => handleServiceDetailChange('businessTin', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>
          </div>
        );

      // 5. NeST Tender Form
      case 'nest_tender':
        return (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Company / Bidding Entity Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Simba Engineering Ltd"
                  value={serviceDetails.companyName || ''}
                  onChange={(e) => handleServiceDetailChange('companyName', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tender Number / Reference *
                </label>
                <input
                  type="text"
                  placeholder="e.g., PA/001/2026/HQ/G/01"
                  value={serviceDetails.tenderTitle || ''}
                  onChange={(e) => handleServiceDetailChange('tenderTitle', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Procuring Entity / Ministry
                </label>
                <input
                  type="text"
                  placeholder="e.g., TANROADS, TPDC, Ministry of Health"
                  value={serviceDetails.procuringEntity || ''}
                  onChange={(e) => handleServiceDetailChange('procuringEntity', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Submission Deadline Date
                </label>
                <input
                  type="date"
                  value={serviceDetails.submissionDeadline || ''}
                  onChange={(e) => handleServiceDetailChange('submissionDeadline', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        );

      // 6. Website Design Form
      case 'web_design':
        return (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Website Type *
                </label>
                <select
                  value={serviceDetails.projectType || 'Corporate Business Website'}
                  onChange={(e) => handleServiceDetailChange('projectType', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Corporate Business Website">Corporate / Business Website</option>
                  <option value="E-commerce Store">E-commerce Online Shop (M-Pesa/Cards)</option>
                  <option value="NGO / Non-Profit Portal">NGO / Institutional Portal</option>
                  <option value="Personal Portfolio">Personal Brand / Portfolio</option>
                  <option value="Custom Web Application">Custom Web Application / System</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Domain Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., mybusiness.co.tz"
                  value={serviceDetails.preferredDomain || ''}
                  onChange={(e) => handleServiceDetailChange('preferredDomain', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Estimated Pages Needed
                </label>
                <input
                  type="text"
                  placeholder="e.g., Home, About, Services, Gallery, Contact (5-7 pages)"
                  value={serviceDetails.pagesRequired || ''}
                  onChange={(e) => handleServiceDetailChange('pagesRequired', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Budget Estimate (TZS)
                </label>
                <select
                  value={serviceDetails.budgetRange || '600,000 - 1,200,000 TZS'}
                  onChange={(e) => handleServiceDetailChange('budgetRange', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="400,000 - 800,000 TZS">400,000 - 800,000 TZS (Starter Website)</option>
                  <option value="800,000 - 1,800,000 TZS">800,000 - 1,800,000 TZS (Standard Business)</option>
                  <option value="1,800,000 - 4,000,000 TZS">1,800,000 - 4,000,000 TZS (E-commerce / Corporate)</option>
                  <option value="4,000,000+ TZS">4,000,000+ TZS (Advanced Custom Web App)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Required Features & Reference Websites *
                </label>
                <textarea
                  rows={3}
                  placeholder="List key features (e.g., WhatsApp chat button, quotation generator, contact forms, English/Swahili bilingual, reference links)..."
                  value={serviceDetails.desiredFeatures || ''}
                  onChange={(e) => handleServiceDetailChange('desiredFeatures', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>
          </div>
        );

      // 7. Hosting Form
      case 'web_hosting':
        return (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Existing or Target Domain Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., mycompany.co.tz"
                  value={serviceDetails.domain || ''}
                  onChange={(e) => handleServiceDetailChange('domain', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Hosting Tier
                </label>
                <select
                  value={serviceDetails.hostingTier || 'Business SSD (30GB)'}
                  onChange={(e) => handleServiceDetailChange('hostingTier', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Starter SSD (10GB)">Starter SSD (10GB, 5 Emails) - 150,000 TZS/yr</option>
                  <option value="Business SSD (30GB)">Business SSD (30GB, Unlimited Emails) - 280,000 TZS/yr</option>
                  <option value="Enterprise High-Traffic">Enterprise Cloud (100GB NVMe) - 550,000 TZS/yr</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Do you need migration from previous host?
                </label>
                <select
                  value={serviceDetails.migrationNeeded || 'No, Fresh Setup'}
                  onChange={(e) => handleServiceDetailChange('migrationNeeded', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="No, Fresh Setup">No, Fresh Website Setup</option>
                  <option value="Yes, Migrate Existing cPanel">Yes, Migrate from existing host (Free by E27)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Number of Business Email Accounts Needed
                </label>
                <input
                  type="text"
                  placeholder="e.g., 5 accounts (info@, sales@, hr@)"
                  value={serviceDetails.emailAccounts || ''}
                  onChange={(e) => handleServiceDetailChange('emailAccounts', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        );

      // 8. Tanzania Domain Form
      case 'tz_domains':
        return (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Desired Domain Name (without extension) *
                </label>
                <input
                  type="text"
                  placeholder="e.g., mybrand"
                  value={serviceDetails.domainName || ''}
                  onChange={(e) => handleServiceDetailChange('domainName', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Extension *
                </label>
                <select
                  value={serviceDetails.domainExtension || '.co.tz'}
                  onChange={(e) => handleServiceDetailChange('domainExtension', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                >
                  <option value=".co.tz">.co.tz (Tanzania Commercial Businesses)</option>
                  <option value=".or.tz">.or.tz (Organizations & NGOs)</option>
                  <option value=".ac.tz">.ac.tz (Colleges & Academic Institutions)</option>
                  <option value=".tz">.tz (Top Level Tanzania Direct)</option>
                  <option value=".com">.com (Global Commercial)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Registrant Name / Company Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., E27 Technologies Ltd"
                  value={serviceDetails.registrantName || ''}
                  onChange={(e) => handleServiceDetailChange('registrantName', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Registration Period
                </label>
                <select
                  value={serviceDetails.regDuration || '1 Year'}
                  onChange={(e) => handleServiceDetailChange('regDuration', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="1 Year">1 Year</option>
                  <option value="2 Years">2 Years</option>
                  <option value="3 Years">3 Years</option>
                  <option value="5 Years">5 Years</option>
                </select>
              </div>
            </div>
          </div>
        );

      // Default fallback for other online applications
      default:
        return (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Institution / Portal / Organization *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Utumishi (PSRS), TCU, University of Dar es Salaam"
                  value={serviceDetails.institution || ''}
                  onChange={(e) => handleServiceDetailChange('institution', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Position / Course / Application Goal *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Public Sector Accountant Job / Bachelor of Science"
                  value={serviceDetails.targetGoal || ''}
                  onChange={(e) => handleServiceDetailChange('targetGoal', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Specific Instructions / Portal Logins (if account already exists)
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide any application guidelines, registration numbers, index numbers, or key notes..."
                  value={serviceDetails.specialInstructions || ''}
                  onChange={(e) => handleServiceDetailChange('specialInstructions', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      id="application-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
    >
      <div
        id="application-modal-card"
        className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-white/20 text-cyan-200">
                Custom Service Application
              </span>
              <span className="text-xs text-blue-200 font-medium">Est. {service.estimatedTime}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {service.name[currentLang] || service.name.en}
            </h2>
            <p className="text-xs text-blue-100 max-w-xl">
              {service.shortDesc[currentLang] || service.shortDesc.en}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="px-6 pt-5 pb-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            <span className={currentStep >= 1 ? 'text-blue-600 dark:text-cyan-400 font-bold' : ''}>
              1. Personal Info
            </span>
            <span className={currentStep >= 2 ? 'text-blue-600 dark:text-cyan-400 font-bold' : ''}>
              2. Service Details
            </span>
            <span className={currentStep >= 3 ? 'text-blue-600 dark:text-cyan-400 font-bold' : ''}>
              3. Documents
            </span>
            <span className={currentStep >= 4 ? 'text-blue-600 dark:text-cyan-400 font-bold' : ''}>
              4. Review & Submit
            </span>
          </div>

          {/* Progress Bar Line */}
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Error Notification Bar */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Modal Form Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {/* STEP 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{t.form.personalInfo}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.form.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Amani Bakari Mtambo"
                    value={personalInfo.fullName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.form.phone} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g., +255 712 345 678"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.form.whatsApp}
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g., +255 712 345 678"
                    value={personalInfo.whatsApp}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, whatsApp: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.form.email} *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g., amani@example.com"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.form.address} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Kigamboni, Tuangoma, Dar es Salaam"
                    value={personalInfo.address}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Service Specific Details */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.form.serviceDetails}
                </h3>
                <span className="text-xs text-slate-500">Service: {service.code}</span>
              </div>
              {renderServiceSpecificFields()}
            </div>
          )}

          {/* STEP 3: Supporting Documents */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.form.supportingDocs}
              </h3>

              {/* Required documents hints for this specific service */}
              {service.requirements && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                    Recommended Checklist for {service.name[currentLang] || service.name.en}:
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                    {(service.requirements?.[currentLang] || service.requirements?.en || []).map((req, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Drag and Drop Uploader Box */}
              <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-cyan-400 rounded-2xl p-6 text-center bg-white dark:bg-slate-900 transition-colors">
                <input
                  id={fileInputId}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-2 pointer-events-none">
                  <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-cyan-400">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    Click to browse or drag and drop files here
                  </p>
                  <p className="text-xs text-slate-400">
                    {t.form.uploadInstructions}
                  </p>
                </div>
              </div>

              {/* Uploaded Documents List */}
              {documents.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Uploaded Files ({documents.length}):
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                          <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                            {doc.name}
                          </span>
                          <span className="text-slate-400">
                            ({(doc.size / 1024).toFixed(0)} KB)
                          </span>
                        </div>
                        <button
                          onClick={() => removeDoc(idx)}
                          className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                          title="Remove file"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Review and Submit */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.form.reviewSubmit}
              </h3>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs space-y-3">
                <div className="grid grid-cols-2 gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                  <div>
                    <span className="text-slate-400 block">Service</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {service.name[currentLang] || service.name.en}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Applicant</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {personalInfo.fullName}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Contact Phone</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {personalInfo.phone}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Email Address</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {personalInfo.email}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 block">Location / Address</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {personalInfo.address}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block mb-1">Service Details Provided</span>
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1 font-mono text-[11px]">
                    {Object.entries(serviceDetails).length === 0 ? (
                      <span className="text-slate-400 italic">No custom attributes entered.</span>
                    ) : (
                      Object.entries(serviceDetails).map(([key, val]) => (
                        <div key={key} className="flex justify-between gap-2">
                          <span className="text-slate-400">{key}:</span>
                          <span className="font-medium text-slate-800 dark:text-slate-200 text-right truncate">
                            {String(val)}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block">Attached Documents</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {documents.length > 0 ? `${documents.length} files attached` : 'None attached'}
                  </span>
                </div>
              </div>

              {/* Additional Notes Box */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Additional Notes or Instructions for E27 Staff
                </label>
                <textarea
                  rows={2}
                  placeholder="Any special deadlines, urgency, or notes..."
                  value={personalInfo.notes}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, notes: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              {/* Authorization agreement */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="agree-checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="agree-checkbox"
                  className="text-xs text-slate-600 dark:text-slate-400 leading-snug cursor-pointer select-none"
                >
                  {t.form.agreement}
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
          <div>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.actions.prev}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 transition-colors"
            >
              {t.actions.cancel}
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-500/20 transition-all"
              >
                <span>{t.actions.next}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs tracking-wide shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Application...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                    <span>{t.actions.submit}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

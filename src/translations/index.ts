import { Language } from '../types';

export interface TranslationSchema {
  nav: {
    home: string;
    about: string;
    services: string;
    blog: string;
    contact: string;
    track: string;
    admin: string;
    getStarted: string;
    exploreServices: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    badge: string;
    ctaPrimary: string;
    ctaSecondary: string;
    searchPlaceholder: string;
    title?: string;
    subtitle?: string;
    ctaApply?: string;
    ctaTrack?: string;
  };
  services?: {
    title: string;
    subtitle: string;
    all?: string;
    popular?: string;
    viewAll?: string;
  };
  howItWorks?: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
  };
  whyChooseUs?: {
    title: string;
    subtitle: string;
    fast?: string;
    fastDesc?: string;
    accurate?: string;
    accurateDesc?: string;
    secure?: string;
    secureDesc?: string;
    allInOne?: string;
    allInOneDesc?: string;
  };
  blog?: {
    title: string;
    subtitle: string;
  };
  contact?: {
    title: string;
    subtitle: string;
  };
  about?: {
    title: string;
    subtitle: string;
    missionTitle: string;
    missionDesc: string;
    visionTitle: string;
    visionDesc: string;
  };
  disclaimer: {
    short: string;
    full: string;
  };
  categories: {
    all: string;
    government: string;
    applications: string;
    web_digital: string;
  };
  actions: {
    applyNow: string;
    requirements: string;
    hideRequirements: string;
    learnMore: string;
    viewDetails: string;
    search: string;
    filter: string;
    reset: string;
    submit: string;
    next: string;
    prev: string;
    upload: string;
    cancel: string;
    trackStatus: string;
    reply: string;
    postComment: string;
  };
  form: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    personalInfo: string;
    serviceDetails: string;
    supportingDocs: string;
    reviewSubmit: string;
    fullName: string;
    phone: string;
    whatsApp: string;
    email: string;
    address: string;
    notes: string;
    required: string;
    optional: string;
    uploadInstructions: string;
    agreement: string;
    submitSuccess: string;
  };
  status: {
    New: string;
    Received: string;
    'Under Review': string;
    'In Progress': string;
    'Waiting for Customer': string;
    Completed: string;
    Rejected: string;
    Cancelled: string;
  };
  track: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    btnTrack: string;
    searchButton?: string;
    currentStatus: string;
    refNumber: string;
    timeline: string;
    notFound: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    ourServices: string;
    contactInfo: string;
    copyright: string;
    rights: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      services: 'Services',
      blog: 'Blog',
      contact: 'Contact Us',
      track: 'Track Application',
      admin: 'Admin Portal',
      getStarted: 'Get Started',
      exploreServices: 'Explore Services',
    },
    hero: {
      headline: 'Your Trusted Partner for Online & Digital Services',
      subheadline:
        'From government online services and business registration to websites, hosting, domains and digital solutions — E27 makes your online work simple.',
      badge: 'Independent Digital Assistance in Tanzania',
      ctaPrimary: 'Get Started',
      ctaSecondary: 'Explore Services',
      searchPlaceholder: 'Search service (e.g., TIN, RITA Birth Certificate, BRELA, Website)...',
    },
    disclaimer: {
      short: 'E27 is an independent private digital service provider and is not affiliated with or operated by the Government of Tanzania.',
      full: 'Notice: E27 is a private technological and digital consultancy located in Kigamboni, Dar es Salaam. We assist clients with guidance, paperwork preparation, online applications, and digital platform facilitation. We do not issue official state documents directly; all approvals are processed by respective state authorities.',
    },
    categories: {
      all: 'All Services',
      government: 'Government & Public Online Services',
      applications: 'Online Applications',
      web_digital: 'Website & Digital Services',
    },
    actions: {
      applyNow: 'Requirements',
      requirements: 'Requirements',
      hideRequirements: 'Hide Requirements',
      learnMore: 'Learn More',
      viewDetails: 'View Details',
      search: 'Search',
      filter: 'Filter',
      reset: 'Reset',
      submit: 'Submit Application',
      next: 'Continue to Next Step',
      prev: 'Previous Step',
      upload: 'Upload Documents',
      cancel: 'Cancel',
      trackStatus: 'Track Status',
      reply: 'Reply',
      postComment: 'Submit Comment for Review',
    },
    form: {
      step1: 'Step 1: Contact Information',
      step2: 'Step 2: Service Requirements',
      step3: 'Step 3: Document Uploads',
      step4: 'Step 4: Review & Submit',
      personalInfo: 'Personal & Contact Information',
      serviceDetails: 'Service Specific Details',
      supportingDocs: 'Supporting Documents',
      reviewSubmit: 'Review & Confirmation',
      fullName: 'Full Legal Name',
      phone: 'Phone Number',
      whatsApp: 'WhatsApp Number (for instant updates)',
      email: 'Email Address',
      address: 'Current Physical Location / Region / Ward',
      notes: 'Additional Comments / Special Instructions',
      required: 'Required',
      optional: 'Optional',
      uploadInstructions: 'Supported formats: PDF, JPG, PNG (Max 10MB per file). Click or drag and drop files here.',
      agreement: 'I confirm that all information provided is accurate and authorize E27 to facilitate this online application on my behalf.',
      submitSuccess: 'Application Submitted Successfully',
    },
    status: {
      New: 'New Application',
      Received: 'Received by E27',
      'Under Review': 'Under Review',
      'In Progress': 'In Progress',
      'Waiting for Customer': 'Waiting for Customer Info',
      Completed: 'Completed',
      Rejected: 'Rejected',
      Cancelled: 'Cancelled',
    },
    track: {
      title: 'Track Your Application Status',
      subtitle: 'Enter your unique E27 Reference Number (e.g. E27-2026-XXXX) or phone number to check live processing progress.',
      inputPlaceholder: 'Enter Reference Number or Phone Number',
      btnTrack: 'Check Status',
      currentStatus: 'Current Status',
      refNumber: 'Reference Number',
      timeline: 'Activity Timeline',
      notFound: 'No application found with this reference number. Please verify your reference or contact E27 support.',
    },
    footer: {
      description: 'E27 provides reliable online, digital and technology services for individuals, businesses and organizations in Tanzania.',
      quickLinks: 'Quick Links',
      ourServices: 'Key Services',
      contactInfo: 'Get in Touch',
      copyright: '© 2026 E27. All Rights Reserved.',
      rights: 'Simplifying Your Digital World.',
    },
  },

  sw: {
    nav: {
      home: 'Mwanzo',
      about: 'Kuhusu Sisi',
      services: 'Huduma Zetu',
      blog: 'Makala & Elimu',
      contact: 'Wasiliana Nasi',
      track: 'Fuatilia Maombi',
      admin: 'Dashibodi ya Admin',
      getStarted: 'Anza Sasa',
      exploreServices: 'Gundua Huduma',
    },
    hero: {
      headline: 'Mshirika Wako Wa Kuaminika Kwa Huduma Za Mtandaoni & Kidijitali',
      subheadline:
        'Kuanzia huduma za serikali mtandaoni na usajili wa biashara hadi tovuti, hosting, majina ya vikoa na suluhu za kidijitali — E27 inarahisisha kazi zako za mtandaoni.',
      badge: 'Mtoa Huduma Binafsi wa Kidijitali Tanzania',
      ctaPrimary: 'Anza Sasa',
      ctaSecondary: 'Gundua Huduma',
      searchPlaceholder: 'Tafuta huduma (mf. TIN, Cheti cha Kuzaliwa RITA, BRELA, Tovuti)...',
    },
    disclaimer: {
      short: 'E27 ni mtoa huduma binafsi na huru wa kidijitali na haihusiani wala kuendeshwa na Serikali ya Tanzania.',
      full: 'Taarifa Muhimu: E27 ni kampuni binafsi ya kusaidia mifumo ya kidijitali iliyopo Kigamboni, Dar es Salaam. Tunawasaidia wateja mwongozo wa kuandaa nyaraka na kufanya maombi mtandaoni. Hatuitoi nyaraka za serikali moja kwa moja; utoaji wote unafanywa na mamlaka husika.',
    },
    categories: {
      all: 'Huduma Zote',
      government: 'Huduma za Kiserikali & Umma Mtandaoni',
      applications: 'Maombi ya Mtandaoni',
      web_digital: 'Tovuti & Suluhu za Kidijitali',
    },
    actions: {
      applyNow: 'Mahitaji',
      requirements: 'Mahitaji',
      hideRequirements: 'Ficha Mahitaji',
      learnMore: 'Fahamu Zaidi',
      viewDetails: 'Angalia Maelezo',
      search: 'Tafuta',
      filter: 'Chuja',
      reset: 'Weka Upya',
      submit: 'Wasilisha Maombi',
      next: 'Endelea Hatua Inayofuata',
      prev: 'Hatua Iliyopita',
      upload: 'Pakia Nyaraka',
      cancel: 'Ghairi',
      trackStatus: 'Fuatilia Hali',
      reply: 'Jibu',
      postComment: 'Wasilisha Maoni kwa Uhakiki',
    },
    form: {
      step1: 'Hatua ya 1: Taarifa za Mawasiliano',
      step2: 'Hatua ya 2: Mahitaji ya Huduma',
      step3: 'Hatua ya 3: Kupakia Nyaraka',
      step4: 'Hatua ya 4: Uhakiki na Kuwasilisha',
      personalInfo: 'Taarifa za Kibinafsi na Mawasiliano',
      serviceDetails: 'Maelezo Mahsusi ya Huduma',
      supportingDocs: 'Nyaraka Zinazohitajika',
      reviewSubmit: 'Hakiki na Uthibitisho',
      fullName: 'Jina Kamili la Kisheria',
      phone: 'Namba ya Simu',
      whatsApp: 'Namba ya WhatsApp (kupokea taarifa za haraka)',
      email: 'Barua Pepe (Email)',
      address: 'Mahali Unapoishi / Mkoa / Wilaya / Kata',
      notes: 'Maoni ya Ziada au Maagizo Maalum',
      required: 'Inahitajika',
      optional: 'Hiari',
      uploadInstructions: 'Muundo unaoruhusiwa: PDF, JPG, PNG (Upeo 10MB kwa faili). Bofya au buruta faili hapa.',
      agreement: 'Ninathibitisha kuwa taarifa zote nilizotoa ni sahihi na ninairuhusu E27 kusimamia maombi haya kwa niaba yangu.',
      submitSuccess: 'Maombi Yamewasilishwa Kikamilifu',
    },
    status: {
      New: 'Maombi Mapya',
      Received: 'Yamepokelewa na E27',
      'Under Review': 'Yanafanyiwa Mapitio',
      'In Progress': 'Yanaendelea Kufanyiwa Kazi',
      'Waiting for Customer': 'Kusubiri Taarifa za Mteja',
      Completed: 'Yamekamilika',
      Rejected: 'Yamekataliwa',
      Cancelled: 'Yameghairiwa',
    },
    track: {
      title: 'Fuatilia Hali ya Maombi Yako',
      subtitle: 'Ingiza Nambari ya Kumbukumbu ya E27 (mf. E27-2026-XXXX) au namba ya simu kuona hatua iliyofikiwa.',
      inputPlaceholder: 'Ingiza Nambari ya Kumbukumbu au Simu',
      btnTrack: 'Kagua Hali',
      currentStatus: 'Hali ya Sasa',
      refNumber: 'Nambari ya Kumbukumbu',
      timeline: 'Mwenendo wa Kazi',
      notFound: 'Hakuna maombi yaliyopatikana kwa nambari hii. Tafadhali hakiki kumbukumbu yako au wasiliana na kituo chetu.',
    },
    footer: {
      description: 'E27 inatoa huduma za kuaminika za mtandaoni, kidijitali na teknolojia kwa watu binafsi, biashara na taasisi nchini Tanzania.',
      quickLinks: 'Viungo vya Haraka',
      ourServices: 'Huduma Kuu',
      contactInfo: 'Wasiliana Nasi',
      copyright: '© 2026 E27. Haki Zote Zimehifadhiwa.',
      rights: 'Kurahisisha Ulimwengu Wako wa Kidijitali.',
    },
  },

  zh: {
    nav: {
      home: '首页',
      about: '关于我们',
      services: '核心服务',
      blog: '行业博客',
      contact: '联系我们',
      track: '查询申请进度',
      admin: '管理后台',
      getStarted: '立即开始',
      exploreServices: '浏览服务',
    },
    hero: {
      headline: '您值得信赖的坦桑尼亚在线与数字化服务伙伴',
      subheadline:
        '从政府政务在线申请与企业注册，到网站定制设计、服务器托管、坦桑尼亚域名及IT数字化解决方案 — E27 让您的在线业务变得简单顺畅。',
      badge: '坦桑尼亚独立数字化专业服务机构',
      ctaPrimary: '立即开始',
      ctaSecondary: '浏览服务',
      searchPlaceholder: '搜索服务（例如：TIN税号、RITA出生证、BRELA公司注册、网站）...',
    },
    disclaimer: {
      short: 'E27 是一家独立的私营数字技术服务公司，不隶属于坦桑尼亚政府部门。',
      full: '声明：E27 位于坦桑尼亚达累斯萨拉姆基甘博尼（Kigamboni），是一家独立的数字化协助服务机构。我们协助客户整理材料、在线递交和技术托管。官方证件最终由坦桑尼亚各法定主管机构审批发放。',
    },
    categories: {
      all: '所有服务',
      government: '政府与公共在线代办服务',
      applications: '各类在线申请',
      web_digital: '网站设计与数字化解决方案',
    },
    actions: {
      applyNow: '所需材料 (Requirements)',
      requirements: '所需材料与要求',
      hideRequirements: '收起材料',
      learnMore: '了解详情',
      viewDetails: '查看细节',
      search: '搜索',
      filter: '筛选',
      reset: '重置',
      submit: '提交申请',
      next: '下一步',
      prev: '上一步',
      upload: '上传附件',
      cancel: '取消',
      trackStatus: '查询进度',
      reply: '回复',
      postComment: '提交审核评论',
    },
    form: {
      step1: '步骤 1：联系人基本信息',
      step2: '步骤 2：业务具体需求',
      step3: '步骤 3：上传相关证明文件',
      step4: '步骤 4：确认与正式提交',
      personalInfo: '申请人信息与联系方式',
      serviceDetails: '业务详细资料',
      supportingDocs: '支持文件上传',
      reviewSubmit: '资料核对与授权',
      fullName: '法定全名',
      phone: '联系电话',
      whatsApp: 'WhatsApp号码（用于即时沟通）',
      email: '电子邮箱',
      address: '常住地址 / 地区 / 街道',
      notes: '附加说明或特殊要求',
      required: '必填',
      optional: '选填',
      uploadInstructions: '支持格式：PDF, JPG, PNG（单文件不超过10MB）。点击或拖拽文件至此处。',
      agreement: '本人确认所提供的一切信息均真实准确，并授权 E27 代为办理该项在线申请事宜。',
      submitSuccess: '申请已成功提交',
    },
    status: {
      New: '新申请已建立',
      Received: 'E27已接收',
      'Under Review': '材料审核中',
      'In Progress': '正在办理中',
      'Waiting for Customer': '等待客户补充信息',
      Completed: '已圆满完成',
      Rejected: '已驳回',
      Cancelled: '已取消',
    },
    track: {
      title: '实时查询您的业务办理进度',
      subtitle: '输入您的专属 E27 申请编号（例如 E27-2026-XXXX）或登记手机号码即可实时跟进。',
      inputPlaceholder: '请输入申请编号或联系电话',
      btnTrack: '立即查询',
      currentStatus: '当前办理状态',
      refNumber: '专属申请编号',
      timeline: '办理进度时间线',
      notFound: '未找到相关申请记录，请核对编号或直接联系 E27 客服团队。',
    },
    footer: {
      description: 'E27 为坦桑尼亚的个人、企业和机构提供值得信赖的在线代办、网站开发与IT数字化技术服务。',
      quickLinks: '快速链接',
      ourServices: '核心业务',
      contactInfo: '联络方式',
      copyright: '© 2026 E27. 版权所有。',
      rights: '简化您的数字化世界。',
    },
  },

  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      services: 'Services',
      blog: 'Blog & Guides',
      contact: 'Contact',
      track: 'Suivi de Dossier',
      admin: 'Espace Admin',
      getStarted: 'Commencer',
      exploreServices: 'Explorer les Services',
    },
    hero: {
      headline: 'Votre Partenaire de Confiance pour les Services Numériques',
      subheadline:
        'Des démarches gouvernementales et création d’entreprise aux sites internet, hébergements, noms de domaine et solutions IT — E27 simplifie votre univers numérique.',
      badge: 'Assistance Numérique Indépendante en Tanzanie',
      ctaPrimary: 'Commencer',
      ctaSecondary: 'Explorer les Services',
      searchPlaceholder: 'Rechercher un service (ex: TIN, Acte RITA, BRELA, Site Web)...',
    },
    disclaimer: {
      short: 'E27 est un prestataire privé indépendant et n’est ni affilié ni géré par le gouvernement de Tanzanie.',
      full: 'Avis : E27 est une agence numérique privée située à Kigamboni, Dar es Salaam. Nous accompagnons nos clients dans la préparation des dossiers et les démarches en ligne. Les documents officiels sont délivrés exclusivement par les autorités tanzaniennes compétentes.',
    },
    categories: {
      all: 'Tous les Services',
      government: 'Démarches Publiques & Gouvernementales',
      applications: 'Candidatures & Inscriptions en Ligne',
      web_digital: 'Création Web & Solutions Numériques',
    },
    actions: {
      applyNow: 'Prérequis (Requirements)',
      requirements: 'Prérequis & Documents',
      hideRequirements: 'Masquer',
      learnMore: 'En Savoir Plus',
      viewDetails: 'Détails du Service',
      search: 'Rechercher',
      filter: 'Filtrer',
      reset: 'Réinitialiser',
      submit: 'Soumettre le Dossier',
      next: 'Étape Suivante',
      prev: 'Étape Précédente',
      upload: 'Téléverser Documents',
      cancel: 'Annuler',
      trackStatus: 'Suivre l’Avancement',
      reply: 'Répondre',
      postComment: 'Envoyer pour Modération',
    },
    form: {
      step1: 'Étape 1 : Coordonnées',
      step2: 'Étape 2 : Détails du Service',
      step3: 'Étape 3 : Pièces Justificatives',
      step4: 'Étape 4 : Révision et Soumission',
      personalInfo: 'Informations Personnelles & Contact',
      serviceDetails: 'Informations Spécifiques',
      supportingDocs: 'Documents Justificatifs',
      reviewSubmit: 'Vérification & Confirmation',
      fullName: 'Nom Complet',
      phone: 'Téléphone',
      whatsApp: 'Numéro WhatsApp',
      email: 'Adresse Email',
      address: 'Lieu de Résidence / Région / Quartier',
      notes: 'Notes et Instructions Complémentaires',
      required: 'Requis',
      optional: 'Optionnel',
      uploadInstructions: 'Formats acceptés : PDF, JPG, PNG (Max 10 Mo). Cliquez ou glissez vos fichiers ici.',
      agreement: 'Je certifie l’exactitude des informations fournies et mandate E27 pour effectuer cette démarche en ligne.',
      submitSuccess: 'Votre Dossier a été Soumis avec Succès',
    },
    status: {
      New: 'Nouveau Dossier',
      Received: 'Reçu par E27',
      'Under Review': 'En Cours d’Examen',
      'In Progress': 'En Traitement',
      'Waiting for Customer': 'En Attente d’Informations Client',
      Completed: 'Finalisé avec Succès',
      Rejected: 'Rejeté',
      Cancelled: 'Annulé',
    },
    track: {
      title: 'Suivre l’État de Votre Dossier',
      subtitle: 'Entrez votre référence unique E27 (ex: E27-2026-XXXX) ou votre numéro de téléphone pour voir l’état d’avancement.',
      inputPlaceholder: 'Référence du dossier ou Téléphone',
      btnTrack: 'Vérifier l’État',
      currentStatus: 'Statut Actuel',
      refNumber: 'Numéro de Référence',
      timeline: 'Historique des Actions',
      notFound: 'Aucun dossier correspondant à cette référence. Veuillez vérifier vos données ou contacter notre assistance.',
    },
    footer: {
      description: 'E27 propose des services en ligne fiables et des solutions technologiques pour particuliers et entreprises en Tanzanie.',
      quickLinks: 'Liens Rapides',
      ourServices: 'Services Clés',
      contactInfo: 'Coordonnées',
      copyright: '© 2026 E27. Tous Droits Réservés.',
      rights: 'Simplifier votre univers numérique.',
    },
  },

  de: {
    nav: {
      home: 'Startseite',
      about: 'Über Uns',
      services: 'Dienstleistungen',
      blog: 'Blog & Ratgeber',
      contact: 'Kontakt',
      track: 'Status Prüfen',
      admin: 'Admin-Bereich',
      getStarted: 'Jetzt Starten',
      exploreServices: 'Dienste Entdecken',
    },
    hero: {
      headline: 'Ihr Zuverlässiger Partner für Online- & Digitale Dienste',
      subheadline:
        'Von behördlichen Online-Diensten und Unternehmensregistrierungen bis hin zu Webdesign, Hosting, Domains und IT-Lösungen — E27 vereinfacht Ihren digitalen Alltag.',
      badge: 'Unabhängiger Digitaldienstleister in Tansania',
      ctaPrimary: 'Jetzt Starten',
      ctaSecondary: 'Dienste Entdecken',
      searchPlaceholder: 'Dienst suchen (z. B. TIN, Geburtsurkunde RITA, BRELA, Website)...',
    },
    disclaimer: {
      short: 'E27 ist ein unabhängiger privater Dienstleister und nicht Teil der Regierung von Tansania.',
      full: 'Hinweis: E27 ist ein privates IT- und Beratungsunternehmen in Kigamboni, Daressalam. Wir unterstützen Kunden bei der Zusammenstellung von Unterlagen und der Online-Abwicklung. Die Erteilung amtlicher Dokumente obliegt den zuständigen staatlichen Behörden Tansanias.',
    },
    categories: {
      all: 'Alle Dienste',
      government: 'Behördliche & Öffentliche Online-Dienste',
      applications: 'Online-Bewerbungen & Anträge',
      web_digital: 'Webdesign & Digitale Lösungen',
    },
    actions: {
      applyNow: 'Voraussetzungen (Requirements)',
      requirements: 'Voraussetzungen',
      hideRequirements: 'Ausblenden',
      learnMore: 'Mehr Erfahren',
      viewDetails: 'Details Ansehen',
      search: 'Suchen',
      filter: 'Filtern',
      reset: 'Zurücksetzen',
      submit: 'Antrag Einreichen',
      next: 'Nächster Schritt',
      prev: 'Vorheriger Schritt',
      upload: 'Dokumente Hochladen',
      cancel: 'Abbrechen',
      trackStatus: 'Status Verfolgen',
      reply: 'Antworten',
      postComment: 'Kommentar Zur Prüfung Senden',
    },
    form: {
      step1: 'Schritt 1: Kontaktdaten',
      step2: 'Schritt 2: Dienstdetails',
      step3: 'Schritt 3: Dokumente Hochladen',
      step4: 'Schritt 4: Prüfen & Absenden',
      personalInfo: 'Persönliche Daten & Kontakt',
      serviceDetails: 'Spezifische Angaben zum Auftrag',
      supportingDocs: 'Erforderliche Nachweise',
      reviewSubmit: 'Überprüfung & Bestätigung',
      fullName: 'Vollständiger Name',
      phone: 'Telefonnummer',
      whatsApp: 'WhatsApp-Nummer (für Status-Updates)',
      email: 'E-Mail-Adresse',
      address: 'Wohnort / Region / Bezirk',
      notes: 'Zusätzliche Hinweise & Anmerkungen',
      required: 'Erforderlich',
      optional: 'Optional',
      uploadInstructions: 'Formate: PDF, JPG, PNG (Max. 10 MB pro Datei). Klicken oder Datei hierher ziehen.',
      agreement: 'Ich bestätige die Richtigkeit aller Angaben und beauftrage E27 mit der Durchführung dieses Online-Antrags.',
      submitSuccess: 'Antrag Erfolgreich Eingereicht',
    },
    status: {
      New: 'Neuer Antrag',
      Received: 'Eingegangen bei E27',
      'Under Review': 'Wird Geprüft',
      'In Progress': 'In Bearbeitung',
      'Waiting for Customer': 'Warten auf Kundenangaben',
      Completed: 'Erfolgreich Abgeschlossen',
      Rejected: 'Abgelehnt',
      Cancelled: 'Storniert',
    },
    track: {
      title: 'Auftragsstatus Live Verfolgen',
      subtitle: 'Geben Sie Ihre persönliche E27-Referenznummer (z. B. E27-2026-XXXX) oder Telefonnummer ein, um den Fortschritt einzusehen.',
      inputPlaceholder: 'Referenznummer oder Telefonnummer eingeben',
      btnTrack: 'Status Prüfen',
      currentStatus: 'Aktueller Status',
      refNumber: 'Referenznummer',
      timeline: 'Bearbeitungsverlauf',
      notFound: 'Kein Eintrag zu dieser Referenznummer gefunden. Bitte prüfen Sie Ihre Eingabe oder kontaktieren Sie unseren Kundenservice.',
    },
    footer: {
      description: 'E27 bietet zuverlässige digitale Dienste und Weblösungen für Privatpersonen und Unternehmen in Tansania.',
      quickLinks: 'Schnellzugriff',
      ourServices: 'Hauptleistungen',
      contactInfo: 'Kontakt',
      copyright: '© 2026 E27. Alle Rechte Vorbehalten.',
      rights: 'Ihre digitale Welt vereinfachen.',
    },
  },
};

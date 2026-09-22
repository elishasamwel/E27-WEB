import { ServiceItem, BlogPost, ServiceApplication, BlogComment, WebsiteSettings, CustomerProfile } from '../types';

export const initialServices: ServiceItem[] = [
  // 1. Cheti cha Kuzaliwa — RITA
  {
    id: 'srv-rita-birth',
    category: 'government',
    code: 'rita_birth',
    name: {
      sw: 'Cheti cha Kuzaliwa — RITA',
      en: 'Cheti cha Kuzaliwa — RITA',
      zh: 'RITA 出生证明 (Birth Certificate)',
      fr: 'Acte de Naissance — RITA',
      de: 'Geburtsurkunde — RITA',
    },
    shortDesc: {
      sw: 'Msaada wa maombi mapya ya cheti cha kuzaliwa, uhakiki, marekebisho, na nakala zilizoidhinishwa RITA.',
      en: 'Assistance with new birth certificate applications, verification, and certified copies via RITA.',
      zh: '协助办理坦桑尼亚 RITA 新生儿与补办出生证明在线核验及公证。',
      fr: 'Aide aux démarches d’acte de naissance et vérifications auprès de la RITA.',
      de: 'Unterstützung bei Geburtsurkunden-Erstanträgen und Beglaubigungen über RITA.',
    },
    fullDesc: {
      sw: 'Tunasaidia wateja kufuata mfumo mzima wa RITA mtandaoni. Kuanzia kuandaa taarifa za wazazi, barua ya serikali ya mtaa, kadi ya kliniki hadi kuwasilisha maombi yaliyohakikiwa.',
      en: 'We assist clients through the entire official RITA online e-portal, verifying parent identification, clinical documentation, and uploading clean digital scans.',
      zh: '指导通过 RITA 电子政务系统递交出生登记，协助整理父母证件、出生证明扫描件并跟进审核。',
      fr: 'Assistance complète pour l’obtention de l’acte de naissance officiel via le portail RITA.',
      de: 'Komplette Begleitung des RITA-Onlineantragsverfahrens für tansanische Geburtsurkunden.',
    },
    icon: 'FileText',
    estimatedTime: '3 - 7 Business Days',
    popular: true,
    active: true,
    requirements: {
      sw: [
        'NIDA/NIN inapohitajika',
        'Taarifa kamili za mhusika',
        'Taarifa za wazazi kwa usajili wa kuzaliwa',
        'Namba ya simu',
        'Email',
        'Nakala/scan za nyaraka zinazohitajika',
      ],
      en: [
        'NIDA/NIN where required',
        'Full details of the applicant / subject',
        'Parents’ information for birth registration',
        'Active phone number',
        'Email address',
        'Copies/scans of required supporting documents',
      ],
      zh: [
        'NIDA/NIN 身份证号（适用时）',
        '当事人完整个人资料',
        '父母双方出生登记信息',
        '常用有效联系电话',
        '电子邮箱',
        '所需证明文件的扫描件/清晰复印件',
      ],
      fr: [
        'NIDA/NIN si nécessaire',
        'Informations complètes de l’intéressé(e)',
        'Informations des parents pour l’enregistrement',
        'Numéro de téléphone actif',
        'Adresse email',
        'Copies/scans des documents justificatifs requis',
      ],
      de: [
        'NIDA/NIN falls erforderlich',
        'Vollständige Angaben zur betroffenen Person',
        'Angaben zu den Eltern für die Geburtsregistrierung',
        'Gültige Telefonnummer',
        'E-Mail-Adresse',
        'Scans/Kopien der erforderlichen Nachweise',
      ],
    },
  },

  // 2. Cheti cha Kifo — RITA
  {
    id: 'srv-rita-death',
    category: 'government',
    code: 'rita_death',
    name: {
      sw: 'Cheti cha Kifo — RITA',
      en: 'Cheti cha Kifo — RITA',
      zh: 'RITA 死亡证明 (Death Certificate)',
      fr: 'Acte de Décès — RITA',
      de: 'Sterbeurkunde — RITA',
    },
    shortDesc: {
      sw: 'Mwongozo na uwasilishaji wa usajili wa cheti rasmi cha kifo kupitia mfumo wa RITA.',
      en: 'Guidance and filing for official death certificate registration with RITA.',
      zh: '协助在 RITA 官方系统进行死亡登记与正式死亡证明申领。',
      fr: 'Enregistrement officiel et accompagnement pour acte de décès via RITA.',
      de: 'Begleitung und Abwicklung der offiziellen Sterbefallregistrierung bei RITA.',
    },
    fullDesc: {
      sw: 'Utaratibu wa haraka na mwongozo sahihi wa kupata cheti cha kifo kwa ajili ya mirathi, bima na masuala ya kisheria kupitia mfumo wa RITA.',
      en: 'Efficient handling of death certificate documentation for inheritance, insurance claims, and legal estate affairs through the RITA electronic gateway.',
      zh: '用于遗产继承、保险理赔及司法事务的坦桑尼亚官方死亡证明办理协助。',
      fr: 'Prise en charge des démarches pour l’obtention d’actes de décès pour successions et assurances.',
      de: 'Zuverlässige Bearbeitung von Sterbeurkunden für Erbangelegenheiten und behördliche Nachweise.',
    },
    icon: 'FileCheck2',
    estimatedTime: '5 - 10 Business Days',
    popular: false,
    active: true,
    requirements: {
      sw: [
        'Taarifa za marehemu',
        'Death notification',
        'Burial permit/nyaraka husika',
        'Taarifa za ndugu/mtoa taarifa',
        'Namba ya simu',
        'Email',
        'Scans za nyaraka',
      ],
      en: [
        'Deceased person’s details',
        'Death notification',
        'Burial permit / relevant burial documents',
        'Informant / next of kin details',
        'Active phone number',
        'Email address',
        'Scans of supporting documents',
      ],
      zh: [
        '逝者完整信息资料',
        '医院死亡通知书 (Death notification)',
        '安葬许可证 (Burial permit) 或相关证明',
        '申报亲属/直系亲属基本资料',
        '联系电话',
        '电子邮箱',
        '所有证明文件清晰扫描件',
      ],
      fr: [
        'Informations concernant le défunt',
        'Notification de décès (Death notification)',
        'Permis d’inhumer / documents funéraires',
        'Informations du déclarant / proche parent',
        'Numéro de téléphone',
        'Adresse email',
        'Scans des documents justificatifs',
      ],
      de: [
        'Angaben zur verstorbenen Person',
        'Ärztliche Todesbescheinigung (Death notification)',
        'Bestattungserlaubnis (Burial permit) oder Nachweise',
        'Angaben zum Antragsteller/Hinterbliebenen',
        'Telefonnummer',
        'E-Mail-Adresse',
        'Dokumentenscans der Nachweise',
      ],
    },
  },

  // 3. Kusajili Jina la Biashara — BRELA
  {
    id: 'srv-brela-name',
    category: 'government',
    code: 'brela_name',
    name: {
      sw: 'Kusajili Jina la Biashara — BRELA',
      en: 'Kusajili Jina la Biashara — BRELA',
      zh: 'BRELA 商号/企业名称注册',
      fr: 'Enregistrement de Nom Commercial — BRELA',
      de: 'Geschäftsnamen-Registrierung — BRELA',
    },
    shortDesc: {
      sw: 'Usajili wa jina la biashara (Sole Proprietorship) kupitia mfumo wa BRELA ORS kwa uhakika.',
      en: 'Official business name registration (sole proprietorship) through the BRELA ORS portal.',
      zh: '坦桑尼亚 BRELA 系统独资个体商号名称查询与正式登记。',
      fr: 'Enregistrement de raison individuelle / nom commercial via BRELA ORS.',
      de: 'Gewerbliche Namensregistrierung für Einzelunternehmer über BRELA ORS.',
    },
    fullDesc: {
      sw: 'Sajili jina la biashara yako kisheria ili upate cheti rasmi kutoka BRELA. Tunakusaidia uhakiki wa jina linalokubalika na uwasilishaji sahihi kwenye mfumo.',
      en: 'Formalize your trade name legally with BRELA. We assist with name availability search, address compliance, and official certificate issuance.',
      zh: '在坦桑尼亚合法设立个人商业商号，完成线上名称核准、经营地址备案并获取 BRELA 官方商号证书。',
      fr: 'Formalisez le nom de votre commerce avec l’obtention du certificat officiel BRELA.',
      de: 'Rechtssichere Registrierung Ihres Firmennamens mit offiziellem BRELA-Zertifikat.',
    },
    icon: 'Building2',
    estimatedTime: '2 - 4 Business Days',
    popular: true,
    active: true,
    requirements: {
      sw: [
        'Mwombaji awe na miaka 18+',
        'NIN',
        'Simu iliyosajiliwa',
        'Email binafsi',
        'Anuani ya biashara',
        'Anuani ya makazi',
        'Jina la biashara linalokubalika',
      ],
      en: [
        'Applicant must be 18+ years of age',
        'National Identification Number (NIN)',
        'Registered active phone number',
        'Personal email address',
        'Physical business address',
        'Residential address',
        'Acceptable / compliant business name proposal',
      ],
      zh: [
        '申请人须年满 18 周岁及以上',
        '国民身份识别号 (NIN / NIDA)',
        '已实名注册的常用联系电话',
        '个人常用电子邮箱',
        '实际经营办公地址',
        '个人居住常住地址',
        '符合法定规范且未被占用的备选商号名称',
      ],
      fr: [
        'Le demandeur doit avoir 18 ans ou plus',
        'Numéro NIN (NIDA)',
        'Numéro de téléphone enregistré',
        'Adresse email personnelle',
        'Adresse physique du commerce',
        'Adresse de résidence',
        'Nom commercial conforme et disponible',
      ],
      de: [
        'Antragsteller muss mindestens 18 Jahre alt sein',
        'NIN-Nationalidentifikationsnummer',
        'Registrierte aktive Telefonnummer',
        'Persönliche E-Mail-Adresse',
        'Gewerbliche Geschäftsadresse',
        'Wohnanschrift',
        'Zulässiger und verfügbarer Firmenname',
      ],
    },
  },

  // 4. Kusajili Kampuni — BRELA
  {
    id: 'srv-brela-company',
    category: 'government',
    code: 'brela_company',
    name: {
      sw: 'Kusajili Kampuni — BRELA',
      en: 'Kusajili Kampuni — BRELA',
      zh: 'BRELA 有限责任公司设立与注册',
      fr: 'Création de Société — BRELA',
      de: 'Gesellschaftsgründung (Ltd) — BRELA',
    },
    shortDesc: {
      sw: 'Usajili kamili wa kampuni (Limited Company) BRELA, Katiba (MEMARTS), wanahisa na wakurugenzi.',
      en: 'Complete Limited Company incorporation with BRELA, MEMARTS drafting, shareholder and director filings.',
      zh: '坦桑尼亚有限责任公司（Ltd）全流程设立，含章程草拟、董事股东申报与公司证书。',
      fr: 'Constitution complète de société à responsabilité limitée avec statuts et immatriculation BRELA.',
      de: 'Komplette Gründung einer Gesellschaft mit beschränkter Haftung (Ltd) bei BRELA.',
    },
    fullDesc: {
      sw: 'Unda kampuni imara kisheria. Tunaratibu taarifa za wanahisa, wakurugenzi, mtaji wa hisa (Share capital), Katiba ya Kampuni (MEMARTS) na fomu zote zinazohitajika hadi kupata Cheti cha Incorporation.',
      en: 'Form an official corporate entity in Tanzania. We prepare and verify details for shareholders, directors, share capital, memorandum & articles of association (MEMARTS), and all statutory forms until your Certificate of Incorporation is issued.',
      zh: '协助起草全套合规公司章程（MEMARTS），登记股东、董事、法定股本、注册地址及主营范围，获颁坦桑尼亚正规公司执照。',
      fr: 'Enregistrez votre société avec statuts (MEMARTS), capital social, directeurs et actionnaires auprès du registre national.',
      de: 'Erstellung der Satzung (MEMARTS), Erfassung von Gesellschaftern, Geschäftsführern und Stammkapital bis zur Eintragung.',
    },
    icon: 'Building2',
    estimatedTime: '3 - 7 Business Days',
    popular: true,
    active: true,
    requirementGroups: {
      sw: [
        {
          title: 'Personal Information',
          items: ['NIN', 'Simu', 'Email', 'Address'],
        },
        {
          title: 'Shareholders',
          items: ['Full names', 'NIN/passport', 'Address', 'Shareholding %'],
        },
        {
          title: 'Directors',
          items: ['Full names', 'NIN/passport', 'TIN inapohitajika', 'Address', 'Occupation'],
        },
        {
          title: 'Company',
          items: [
            'Proposed company names',
            'Business activities/objects',
            'Registered office',
            'Share capital',
            'Memorandum & Articles',
            'Forms zinazohitajika',
          ],
        },
      ],
      en: [
        {
          title: 'Personal Information',
          items: ['NIN (National ID Number)', 'Phone number', 'Email address', 'Physical address'],
        },
        {
          title: 'Shareholders',
          items: ['Full legal names', 'NIN or Passport copy', 'Physical address', 'Shareholding percentage (%)'],
        },
        {
          title: 'Directors',
          items: ['Full legal names', 'NIN or Passport copy', 'TIN where required', 'Physical address', 'Occupation / Profession'],
        },
        {
          title: 'Company Details',
          items: [
            'Proposed company names (3 alternatives)',
            'Business activities and objectives',
            'Registered office location',
            'Authorized share capital structure',
            'Memorandum & Articles of Association (MEMARTS)',
            'Required statutory BRELA forms',
          ],
        },
      ],
      zh: [
        {
          title: '个人基本信息 (Personal Information)',
          items: ['NIN 身份证号', '联系电话', '电子邮箱', '地址'],
        },
        {
          title: '股东信息 (Shareholders)',
          items: ['股东法定全名', 'NIN 或外国护照原件扫描件', '常住地址', '持股比例 (%)'],
        },
        {
          title: '董事信息 (Directors)',
          items: ['董事法定全名', 'NIN 或护照', 'TIN税号（适用时）', '常住地址', '职业/职务'],
        },
        {
          title: '公司设立要素 (Company)',
          items: [
            '拟定备选公司英文名称',
            '主营业务范围与经营宗旨',
            '公司法定注册地址',
            '注册股本金结构',
            '公司章程与大纲 (Memorandum & Articles)',
            '官方规定的法定表格 (Forms)',
          ],
        },
      ],
      fr: [
        {
          title: 'Informations Personnelles',
          items: ['NIN', 'Téléphone', 'Email', 'Adresse'],
        },
        {
          title: 'Actionnaires (Shareholders)',
          items: ['Noms complets', 'NIN ou passeport', 'Adresse', 'Pourcentage de parts (%)'],
        },
        {
          title: 'Administrateurs (Directors)',
          items: ['Noms complets', 'NIN ou passeport', 'Numéro TIN si requis', 'Adresse', 'Profession'],
        },
        {
          title: 'Société (Company)',
          items: [
            'Noms proposés pour la société',
            'Objet social et activités',
            'Siège social enregistré',
            'Capital social',
            'Statuts (Memorandum & Articles)',
            'Formulaires réglementaires requis',
          ],
        },
      ],
      de: [
        {
          title: 'Persönliche Daten',
          items: ['NIN-Nummer', 'Telefon', 'E-Mail', 'Adresse'],
        },
        {
          title: 'Gesellschafter (Shareholders)',
          items: ['Vollständiger Name', 'NIN oder Reisepass', 'Adresse', 'Geschäftsanteil in Prozent (%)'],
        },
        {
          title: 'Geschäftsführer (Directors)',
          items: ['Vollständiger Name', 'NIN oder Reisepass', 'TIN falls erforderlich', 'Adresse', 'Berufsbezeichnung'],
        },
        {
          title: 'Unternehmensangaben (Company)',
          items: [
            'Vorschläge für Firmennamen',
            'Unternehmensgegenstand / Aktivitäten',
            'Eingetragener Firmensitz',
            'Stammkapitalstruktur',
            'Satzung (Memorandum & Articles)',
            'Erforderliche behördliche Formulare',
          ],
        },
      ],
    },
    requirements: {
      sw: [
        'Personal information: NIN, Simu, Email, Address',
        'Shareholders: Full names, NIN/passport, Address, Shareholding %',
        'Directors: Full names, NIN/passport, TIN inapohitajika, Address, Occupation',
        'Company: Proposed company names, Business activities/objects, Registered office, Share capital, Memorandum & Articles, Forms zinazohitajika',
      ],
      en: [
        'Personal information: NIN, Phone, Email, Address',
        'Shareholders: Full names, NIN/passport, Address, Shareholding %',
        'Directors: Full names, NIN/passport, TIN where required, Address, Occupation',
        'Company: Proposed company names, Business activities/objects, Registered office, Share capital, Memorandum & Articles, Required forms',
      ],
      zh: [
        '个人基本信息：NIN、联系电话、电子邮箱、常住地址',
        '股东资料：全名、NIN/护照、地址、持股比例 %',
        '董事资料：全名、NIN/护照、TIN税号（适用时）、地址、职业',
        '公司要素：拟定名称、经营范围、注册办公地、股本结构、公司章程、法定表格',
      ],
      fr: [
        'Informations personnelles : NIN, Téléphone, Email, Adresse',
        'Actionnaires : Noms complets, NIN/passeport, Adresse, Pourcentage (%)',
        'Directeurs : Noms complets, NIN/passeport, TIN si requis, Adresse, Profession',
        'Société : Dénominations proposées, Activités, Siège social, Capital, Statuts, Formulaires requis',
      ],
      de: [
        'Persönliche Daten: NIN, Telefon, E-Mail, Adresse',
        'Gesellschafter: Vollständige Namen, NIN/Reisepass, Adresse, Anteil %',
        'Geschäftsführer: Vollständige Namen, NIN/Reisepass, TIN falls nötig, Adresse, Beruf',
        'Gesellschaft: Vorgeschlagene Namen, Tätigkeitsbereich, Firmensitz, Stammkapital, Satzung, Formulare',
      ],
    },
  },

  // 5. Partnership Registration
  {
    id: 'srv-partnership-reg',
    category: 'government',
    code: 'partnership_reg',
    name: {
      sw: 'Partnership Registration',
      en: 'Partnership Registration',
      zh: '合伙企业注册 (Partnership Registration)',
      fr: 'Enregistrement de Société en Nom Collectif (Partnership)',
      de: 'Partnerschaftsgesellschaft (Partnership Registration)',
    },
    shortDesc: {
      sw: 'Usajili rasmi wa biashara ya ubia (Partnership) kati ya wabia wawili au zaidi kisheria.',
      en: 'Official legal registration of a business partnership between two or more partners.',
      zh: '两名或两名以上合伙人共同出资设立的合伙企业法定注册代办。',
      fr: 'Immatriculation légale d’un partenariat commercial entre deux ou plusieurs associés.',
      de: 'Offizielle Registrierung einer geschäftlichen Personengesellschaft / Partnerschaft.',
    },
    fullDesc: {
      sw: 'Sajili ubia wenu wa kibiashara kwa weledi. Tunasaidia kuandaa taarifa za mbia wa 1, mbia wa 2, jina la ubia, shughuli za kibiashara, anwani na makubaliano ya ubia (Partnership Agreement).',
      en: 'Establish a solid commercial partnership. We organize complete partner credentials, business scope, physical premises, and partnership deed filings.',
      zh: '规范整理合伙人一、合伙人二身份凭证、合伙商号、主营业务活动、注册地址及合伙协议（Partnership Agreement）。',
      fr: 'Créez votre société en nom collectif avec l’ensemble des pièces d’identité des partenaires et le contrat d’association.',
      de: 'Rechtssichere Begründung einer geschäftlichen Partnerschaft inklusive Partnerangaben und Gesellschaftervertrag.',
    },
    icon: 'Briefcase',
    estimatedTime: '3 - 5 Business Days',
    popular: false,
    active: true,
    requirementGroups: {
      sw: [
        {
          title: 'Partner 1',
          items: ['Partner 1 full name', 'NIN/passport', 'Phone', 'Email', 'Address'],
        },
        {
          title: 'Partner 2',
          items: ['Partner 2 full name', 'NIN/passport', 'Phone', 'Email', 'Address'],
        },
        {
          title: 'Partnership Details',
          items: [
            'Partnership name',
            'Business activities',
            'Business address',
            'Partnership agreement',
          ],
        },
      ],
      en: [
        {
          title: 'Partner 1 Details',
          items: ['Full name', 'NIN / Passport copy', 'Active phone number', 'Email address', 'Physical address'],
        },
        {
          title: 'Partner 2 Details',
          items: ['Full name', 'NIN / Passport copy', 'Active phone number', 'Email address', 'Physical address'],
        },
        {
          title: 'Partnership Structure',
          items: [
            'Partnership business name',
            'Approved business activities',
            'Official business address',
            'Partnership agreement deed',
          ],
        },
      ],
      zh: [
        {
          title: '合伙人一资料 (Partner 1)',
          items: ['合伙人全名', 'NIN 身份证 / 护照', '联系电话', '电子邮箱', '常住地址'],
        },
        {
          title: '合伙人二资料 (Partner 2)',
          items: ['合伙人全名', 'NIN 身份证 / 护照', '联系电话', '电子邮箱', '常住地址'],
        },
        {
          title: '合伙企业要素 (Partnership Details)',
          items: ['合伙企业名称', '拟经营业务活动', '经营办公地址', '合伙协议书 (Partnership agreement)'],
        },
      ],
      fr: [
        {
          title: 'Associé 1 (Partner 1)',
          items: ['Nom complet', 'NIN/passeport', 'Téléphone', 'Email', 'Adresse'],
        },
        {
          title: 'Associé 2 (Partner 2)',
          items: ['Nom complet', 'NIN/passeport', 'Téléphone', 'Email', 'Adresse'],
        },
        {
          title: 'Détails du Partenariat',
          items: [
            'Nom de la société / partnership',
            'Activités commerciales',
            'Adresse professionnelle',
            'Accord d’association (Partnership agreement)',
          ],
        },
      ],
      de: [
        {
          title: 'Partner 1',
          items: ['Vollständiger Name', 'NIN/Reisepass', 'Telefon', 'E-Mail', 'Adresse'],
        },
        {
          title: 'Partner 2',
          items: ['Vollständiger Name', 'NIN/Reisepass', 'Telefon', 'E-Mail', 'Adresse'],
        },
        {
          title: 'Partnerschaftsdetails',
          items: [
            'Name der Partnerschaft',
            'Geschäftstätigkeit',
            'Geschäftsadresse',
            'Partnerschaftsvertrag (Partnership agreement)',
          ],
        },
      ],
    },
    requirements: {
      sw: [
        'Partner 1 full name',
        'NIN/passport (Partner 1 & 2)',
        'Phone & Email (Partner 1 & 2)',
        'Address (Partner 1 & 2)',
        'Partner 2 full name',
        'Partnership name',
        'Business activities',
        'Business address',
        'Partnership agreement',
      ],
      en: [
        'Partner 1: Full name, NIN/passport, Phone, Email, Address',
        'Partner 2: Full name, NIN/passport, Phone, Email, Address',
        'Partnership name',
        'Business activities',
        'Business address',
        'Partnership agreement',
      ],
      zh: [
        '合伙人 1：法定全名、NIN/护照、电话、邮箱、常住地址',
        '合伙人 2：法定全名、NIN/护照、电话、邮箱、常住地址',
        '合伙企业专属商号名称',
        '经营业务活动描述',
        '实际商业注册地址',
        '正式合伙协议 (Partnership agreement)',
      ],
      fr: [
        'Associé 1 : Nom complet, NIN/passeport, Téléphone, Email, Adresse',
        'Associé 2 : Nom complet, NIN/passeport, Téléphone, Email, Adresse',
        'Nom du partnership',
        'Activités commerciales',
        'Adresse physique',
        'Accord de partenariat (Partnership agreement)',
      ],
      de: [
        'Partner 1: Vollständiger Name, NIN/Reisepass, Telefon, E-Mail, Adresse',
        'Partner 2: Vollständiger Name, NIN/Reisepass, Telefon, E-Mail, Adresse',
        'Name der Partnerschaft',
        'Geschäftszweck / Aktivitäten',
        'Geschäftsadresse',
        'Partnerschaftsvereinbarung',
      ],
    },
  },

  // 6. TIN Number — TRA
  {
    id: 'srv-tra-tin',
    category: 'government',
    code: 'tra_tin',
    name: {
      sw: 'TIN Number — TRA',
      en: 'TIN Number — TRA',
      zh: 'TRA 纳税人识别号 (TIN Number)',
      fr: 'Numéro TIN — TRA',
      de: 'TIN Steuernummer — TRA',
    },
    shortDesc: {
      sw: 'Usajili wa TIN ya mtu binafsi au biashara kupitia TRA na upatikanaji wa cheti.',
      en: 'Individual and business Taxpayer Identification Number (TIN) registration with TRA.',
      zh: '坦桑尼亚税务局（TRA）个人与企业纳税识别号 (TIN) 极速线上申领。',
      fr: 'Obtention de numéro d’identification fiscale (TIN) auprès de la TRA.',
      de: 'Beantragung der persönlichen oder gewerblichen Steuernummer (TIN) bei der TRA.',
    },
    fullDesc: {
      sw: 'Pata namba yako ya TIN ya TRA kwa urahisi kwa ajili ya kufungua akaunti ya benki, leseni ya biashara, pasipoti na huduma zingine za kifedha Tanzania.',
      en: 'Obtaining your Taxpayer Identification Number (TIN) is mandatory for banking, business licensing, driving licenses, and trade in Tanzania. We lodge complete digital applications.',
      zh: 'TIN税号是坦桑尼亚开立银行账户、申领驾照、护照及开展一切商业贸易活动的法定必备证件。',
      fr: 'Le TIN est indispensable pour vos démarches bancaires, permis de conduire et activités en Tanzanie.',
      de: 'Die TIN ist obligatorisch für Bankkonten, Gewerbelizenzen und geschäftliche Transaktionen in Tansania.',
    },
    icon: 'Landmark',
    estimatedTime: '24 - 48 Hours',
    popular: true,
    active: true,
    requirements: {
      sw: [
        'NIN/identification',
        'Full name',
        'Date/place of birth',
        'Address',
        'Phone',
        'Email',
        'Business information ikiwa TIN ni ya biashara',
        'Supporting documents kulingana na application',
      ],
      en: [
        'NIN / identification document',
        'Full legal name',
        'Date and place of birth',
        'Physical address',
        'Active phone number',
        'Email address',
        'Business information (if applying for a Business TIN)',
        'Supporting documents depending on the specific application',
      ],
      zh: [
        'NIN 国民身份证号或合法身份证明',
        '申请人法定全名',
        '出生日期及出生地点',
        '常住居住/办公地址',
        '常用联系电话',
        '电子邮箱',
        '企业相关信息（若申办企业类 TIN 税号）',
        '依据具体申请类型所要求的基础佐证附件',
      ],
      fr: [
        'NIN ou document d’identification',
        'Nom complet',
        'Date et lieu de naissance',
        'Adresse physique',
        'Numéro de téléphone',
        'Adresse email',
        'Informations sur l’entreprise si TIN professionnel',
        'Documents justificatifs selon le type de demande',
      ],
      de: [
        'NIN oder Identitätsnachweis',
        'Vollständiger Name',
        'Geburtsdatum und Geburtsort',
        'Wohnanschrift',
        'Telefonnummer',
        'E-Mail-Adresse',
        'Unternehmensangaben (falls Firmen-TIN beantragt wird)',
        'Erforderliche Begleitdokumente je nach Antragsart',
      ],
    },
  },

  // 7. Business Licence
  {
    id: 'srv-business-licence',
    category: 'government',
    code: 'business_licence',
    name: {
      sw: 'Business Licence',
      en: 'Business Licence',
      zh: '营业执照办理 (Business Licence)',
      fr: 'Licence Commerciale (Business Licence)',
      de: 'Gewerbelizenz (Business Licence)',
    },
    shortDesc: {
      sw: 'Maombi ya leseni ya biashara ya halmashauri/wizara (TAUSI), uhakiki wa kodi na nyaraka.',
      en: 'Local government and ministry business licence issuance, tax clearance linkage, and municipal permits.',
      zh: '坦桑尼亚地方政府（TAUSI）及部委各行业营业执照新办与年审换发。',
      fr: 'Délivrance de licences commerciales locales et ministérielles en Tanzanie.',
      de: 'Beantragung kommunaler und ministerieller Gewerbelizenzen (TAUSI) in Tansania.',
    },
    fullDesc: {
      sw: 'Epuka kufanya biashara bila leseni halali. Tunakuandalia nyaraka za BRELA, TIN, Tax Clearance, mkataba wa pango (Lease Agreement) na kuwasilisha kwenye mfumo wa TAUSI.',
      en: 'Operate legally with a valid trading license. We verify business incorporation documents, TIN, tax clearance certificates, lease agreements, and file through TAUSI.',
      zh: '协助在坦桑尼亚地方各区政府合规取得正式营业执照，协调完税证明、房屋租赁合同及行业特别许可审核。',
      fr: 'Exercez votre activité en toute légalité en obtenant votre licence d’exploitation municipale.',
      de: 'Fristgerechte Erlangung Ihrer Gewerbegenehmigung mit allen Nachweisen und Steuerbescheinigungen.',
    },
    icon: 'ShieldCheck',
    estimatedTime: '2 - 5 Business Days',
    popular: true,
    active: true,
    requirementGroups: {
      sw: [
        {
          title: 'Nyaraka Kuu za Biashara',
          items: [
            'Certificate of Incorporation au Business Registration Certificate',
            'Extract inapohitajika',
            'TIN',
            'Tax Clearance inapohitajika',
            'Memorandum & Articles kwa kampuni',
          ],
        },
        {
          title: 'Proof of Business Premises',
          items: [
            'Lease agreement',
            'Title deed',
            'au document inayokubalika',
          ],
        },
      ],
      en: [
        {
          title: 'Core Business Registration Documents',
          items: [
            'Certificate of Incorporation or Business Registration Certificate',
            'BRELA Extract where required',
            'Taxpayer Identification Number (TIN)',
            'Tax Clearance Certificate where required',
            'Memorandum & Articles of Association (for companies)',
          ],
        },
        {
          title: 'Proof of Business Premises',
          items: [
            'Lease agreement',
            'Title deed',
            'Or any legally acceptable premises proof',
          ],
        },
      ],
      zh: [
        {
          title: '核心企业资质文件',
          items: [
            '公司注册证书或商号登记证明 (Certificate of Incorporation / Registration)',
            'BRELA 官方档案摘要 (Extract，适用时)',
            'TIN 税务识别号',
            '完税清算证明 (Tax Clearance，适用时)',
            '公司章程大纲 (Memorandum & Articles，针对公司)',
          ],
        },
        {
          title: '营业场地合法证明 (Proof of business premises)',
          items: [
            '场地租赁合同 (Lease agreement)',
            '房产地契 (Title deed)',
            '或其他官方认可的场地权属文件',
          ],
        },
      ],
      fr: [
        {
          title: 'Documents d’Enregistrement',
          items: [
            'Certificat d’incorporation ou d’enregistrement commercial',
            'Extrait BRELA si nécessaire',
            'Numéro TIN',
            'Attestation de conformité fiscale (Tax Clearance) si nécessaire',
            'Statuts (Memorandum & Articles) pour les sociétés',
          ],
        },
        {
          title: 'Preuve du Local Commercial',
          items: [
            'Contrat de bail (Lease agreement)',
            'Titre de propriété (Title deed)',
            'Ou tout document recevable',
          ],
        },
      ],
      de: [
        {
          title: 'Grundlegende Gewerbedokumente',
          items: [
            'Certificate of Incorporation oder Business Registration Certificate',
            'Handelsregisterauszug (Extract) falls erforderlich',
            'TIN-Steuernummer',
            'Steuerliche Unbedenklichkeitsbescheinigung (Tax Clearance)',
            'Satzung (Memorandum & Articles) bei Kapitalgesellschaften',
          ],
        },
        {
          title: 'Nachweis der Geschäftsräume',
          items: [
            'Mietvertrag (Lease agreement)',
            'Eigentumsnachweis (Title deed)',
            'Oder ein behördlich anerkanntes Dokument',
          ],
        },
      ],
    },
    requirements: {
      sw: [
        'Certificate of Incorporation au Business Registration Certificate',
        'Extract inapohitajika',
        'TIN',
        'Tax Clearance inapohitajika',
        'Memorandum & Articles kwa kampuni',
        'Proof of business premises (Lease agreement, Title deed, au document inayokubalika)',
      ],
      en: [
        'Certificate of Incorporation or Business Registration Certificate',
        'Extract where required',
        'TIN',
        'Tax Clearance where required',
        'Memorandum & Articles for company',
        'Proof of business premises (Lease agreement, Title deed, or acceptable document)',
      ],
      zh: [
        '公司设立执照或商号证书 (Certificate of Incorporation / Registration)',
        'BRELA 官方档案 Extract（需要时）',
        'TIN 企业纳税识别号',
        '完税证明 (Tax Clearance，需要时)',
        '公司章程 (Memorandum & Articles)',
        '经营场所证明 (租赁合同、产权证或受认可凭证)',
      ],
      fr: [
        'Certificat d’incorporation ou d’enregistrement',
        'Extrait si nécessaire',
        'Numéro TIN',
        'Attestation de régularité fiscale (Tax Clearance)',
        'Statuts pour société',
        'Preuve de local commercial (bail, titre de propriété ou document accepté)',
      ],
      de: [
        'Gründungsurkunde oder Gewerbeanmeldung',
        'Auszug falls erforderlich',
        'TIN',
        'Steuerliche Bescheinigung falls erforderlich',
        'Satzung für Kapitalgesellschaften',
        'Nachweis der Geschäftsräume (Mietvertrag, Eigentumsurkunde etc.)',
      ],
    },
  },

  // 8. NeST Registration
  {
    id: 'srv-nest-reg',
    category: 'government',
    code: 'nest_reg',
    name: {
      sw: 'NeST Registration',
      en: 'NeST Registration',
      zh: 'NeST 政府采购系统注册',
      fr: 'Enregistrement NeST (Marchés Publics)',
      de: 'NeST E-Procurement Registrierung',
    },
    shortDesc: {
      sw: 'Usajili wa wazabuni kwenye Mfumo wa Taifa wa Ununuzi wa Umma (NeST) kwa ajili ya zabuni za serikali.',
      en: 'Supplier and contractor vendor onboarding onto the National e-Procurement System of Tanzania (NeST).',
      zh: '坦桑尼亚国家电子政府采购门户（NeST）供应商合规入驻与招标资质备案。',
      fr: 'Inscription des fournisseurs sur la plateforme nationale des marchés publics tanzaniens.',
      de: 'Registrierung als autorisierter Lieferant im staatlichen Ausschreibungsportal NeST.',
    },
    fullDesc: {
      sw: 'Shirikiana na serikali na taasisi zake kwa kupata zabuni halali. Tunakusaidia kusajili kampuni yako kwenye NeST, kuunganisha TIN, Leseni, wasifu wa kampuni na nyaraka zote za kisheria.',
      en: 'Position your enterprise to win lucrative government and public tenders. We manage full onboarding to NeST, ensuring business categories, licences, bank credentials, and compliance documents are perfectly linked.',
      zh: '协助中坦各类企业完成 NeST 电子招标采购系统账号开通、资质审查、经营类目关联与标书投标准备。',
      fr: 'Accédez aux appels d’offres gouvernementaux en certifiant votre profil d’entreprise sur NeST.',
      de: 'Ermöglicht Ihrem Unternehmen die Teilnahme an staatlichen Ausschreibungen in ganz Tansania.',
    },
    icon: 'Briefcase',
    estimatedTime: '3 - 5 Business Days',
    popular: false,
    active: true,
    requirements: {
      sw: [
        'Company/Business registration certificate',
        'TIN',
        'Business Licence',
        'Company profile',
        'Business address',
        'Directors/owners information',
        'Contact person',
        'Email',
        'Phone',
        'Business lines/categories',
        'Relevant licences/permits',
        'Bank/payment information inapohitajika',
        'Tax/compliance documents inapohitajika',
      ],
      en: [
        'Company / Business registration certificate',
        'Taxpayer Identification Number (TIN)',
        'Valid Business Licence',
        'Company profile document',
        'Physical business address',
        'Directors / owners information',
        'Designated contact person',
        'Official email address',
        'Official phone number',
        'Registered business lines and procurement categories',
        'Relevant professional licences or sector permits',
        'Bank account / payment information where required',
        'Tax clearance and compliance documents where required',
      ],
      zh: [
        '公司注册执照或商号证明 (Company / Business registration certificate)',
        'TIN 企业税务识别号',
        '有效营业执照 (Business Licence)',
        '企业简介/公司 Profile 文件',
        '实际经营商业地址',
        '董事及主要股东身份信息',
        '指定联系人姓名',
        '官方联络邮箱',
        '官方联络电话',
        '拟申报的供货业务门类与采购行业分类',
        '行业特定运营许可/资质证书',
        '银行开户与支付结算信息（需要时）',
        '税务合规证明及社会保险凭单（需要时）',
      ],
      fr: [
        'Certificat d’enregistrement de la société / entreprise',
        'Numéro TIN',
        'Licence commerciale en cours de validité',
        'Profil de l’entreprise (Company profile)',
        'Adresse physique de l’entreprise',
        'Informations des directeurs / propriétaires',
        'Personne de contact désignée',
        'Adresse email officielle',
        'Numéro de téléphone officiel',
        'Catégories et secteurs d’activités',
        'Licences ou permis sectoriels applicables',
        'Informations bancaires si nécessaire',
        'Documents de conformité fiscale si nécessaire',
      ],
      de: [
        'Gewerbeanmeldung oder Gründungsurkunde',
        'TIN-Steuernummer',
        'Gültige Gewerbelizenz',
        'Unternehmensprofil (Company profile)',
        'Geschäftsanschrift',
        'Angaben zu Geschäftsführern/Eigentümern',
        'Benannte Ansprechperson',
        'Offizielle E-Mail-Adresse',
        'Offizielle Telefonnummer',
        'Geschäftsbereiche und Vergabekategorien',
        'Erforderliche behördliche Fachlizenzen',
        'Bank- und Zahlungsinformationen falls nötig',
        'Steuerliche Unbedenklichkeitsbescheinigung',
      ],
    },
  },

  // 9. Local Domain Registration
  {
    id: 'srv-local-domain',
    category: 'web_digital',
    code: 'local_domain',
    name: {
      sw: 'Local Domain Registration',
      en: 'Local Domain Registration',
      zh: '坦桑尼亚本地域名注册 (.co.tz / .tz)',
      fr: 'Enregistrement de Nom de Domaine Local (.tz)',
      de: 'Lokale Domain-Registrierung (.tz)',
    },
    shortDesc: {
      sw: 'Usajili wa majina ya vikoa vya Tanzania (.co.tz, .or.tz, .tz), usanidi wa DNS na SSL.',
      en: 'Official .co.tz, .or.tz, and .tz country-code domain registration, DNS, nameservers, and SSL.',
      zh: '坦桑尼亚国家顶级域名 (.co.tz / .tz) 注册、DNS智能解析与免费安全证书。',
      fr: 'Enregistrement de noms de domaine nationaux tanzaniens avec gestion DNS et SSL.',
      de: 'Offizielle Registrierung tansanischer Länderendungen (.co.tz, .tz) mit DNS-Management.',
    },
    fullDesc: {
      sw: 'Miliki utambulisho rasmi wa Tanzania mtandaoni. Tunakusajilia kikoa cha .co.tz au .tz kupitia tzNIC, kuweka DNS, Nameservers, SSL na mfumo wa kuhuisha (renewal) bila usumbufu.',
      en: 'Build authentic local trust with customers in Tanzania. We provide instant domain registration, DNS management, secure nameservers, domain renewal tracking, customer accounts, and SSL security.',
      zh: '在坦桑尼亚商业市场树立权威信誉。支持 .co.tz, .or.tz, .go.tz, .tz 全系列本土后缀实时开通，提供 DNS 控制台、名称服务器解析及续费保障。',
      fr: 'Valorisez votre ancrage local en Tanzanie avec une extension officielle .co.tz sécurisée par SSL.',
      de: 'Schützen Sie Ihren Markennamen in Tansania mit einer offiziellen .co.tz oder .tz Domain.',
    },
    icon: 'Globe',
    estimatedTime: '2 - 24 Hours',
    popular: true,
    active: true,
    requirements: {
      sw: [
        'Domain registrar/reseller account',
        'DNS management',
        'Nameservers',
        'Domain search system',
        'Domain renewal system',
        'SSL',
        'Customer account',
      ],
      en: [
        'Domain registrar / reseller account',
        'DNS management configuration',
        'Nameservers setup',
        'Domain search verification',
        'Domain renewal system details',
        'SSL security certificate',
        'Customer account profile',
      ],
      zh: [
        '域名注册局/分销商专属账户 (Domain registrar/reseller account)',
        'DNS 解析管理配置 (DNS management)',
        '名称服务器指向 (Nameservers)',
        '域名可用性查询与核名 (Domain search system)',
        '域名到期续费管理 (Domain renewal system)',
        'SSL 安全加密证书 (SSL)',
        '客户认证管理账户 (Customer account)',
      ],
      fr: [
        'Compte bureau d’enregistrement / revendeur',
        'Gestion DNS',
        'Serveurs de noms (Nameservers)',
        'Système de recherche de nom de domaine',
        'Système de renouvellement',
        'Certificat de sécurité SSL',
        'Compte client',
      ],
      de: [
        'Registrar-/Wiederverkäufer-Konto',
        'DNS-Verwaltung',
        'Nameserver-Konfiguration',
        'Domain-Verfügbarkeitsprüfung',
        'Domain-Verlängerungssystem',
        'SSL-Verschlüsselung',
        'Kundenkonto',
      ],
    },
  },

  // 10. website design and managemnt
  {
    id: 'srv-web-design-mgmt',
    category: 'web_digital',
    code: 'web_design_mgmt',
    name: {
      sw: 'website design and managemnt',
      en: 'Website Design and Management',
      zh: '企业网站定制设计与日常运维管理',
      fr: 'Conception et Gestion de Sites Web',
      de: 'Website-Design und Management',
    },
    shortDesc: {
      sw: 'Ubunifu, ujenzi na usimamizi wa tovuti za kisasa kwa biashara, kampuni na chapa binafsi.',
      en: 'Modern website design, custom software development, hosting, and full ongoing management.',
      zh: '为企业、外贸及机构量身打造现代化响应式网站、系统集成与全天候日常运营维护。',
      fr: 'Création de sites web professionnels, intégration de solutions et gestion continue.',
      de: 'Professionelles Webdesign, maßgeschneiderte Entwicklung und ganzheitliche Betreuung.',
    },
    fullDesc: {
      sw: 'Inua biashara yako mtandaoni kwa tovuti yenye mwonekano wa kisasa, kasi ya juu na usalama. E27 inakusimamia kila hatua: kuanzia usanifu, maudhui, fomu, malipo ya simu, hadi usimamizi na masasisho ya kila mwezi.',
      en: 'Transform your brand presence with blazing-fast, responsive, and SEO-optimized websites built by E27 in Kigamboni. We handle page structuring, visual branding, WhatsApp integrations, payment gateways, and monthly management.',
      zh: '由 E27 资深工程师团队打造，兼具国际水准审美与本地极速访问体验。涵盖页面架构、视觉主视觉、手机端自适应、WhatsApp 客户咨询组件、在线支付及长期安全技术维护。',
      fr: 'Maximisez votre visibilité numérique avec des sites web ultra-rapides, élégants et pris en charge de A à Z.',
      de: 'Stärken Sie Ihre digitale Identität mit schnellen, sicheren und suchmaschinenoptimierten Weblösungen inklusive fortlaufender Wartung.',
    },
    icon: 'Laptop',
    estimatedTime: '5 - 14 Business Days',
    popular: true,
    active: true,
    requirements: {
      sw: [
        'Taarifa za biashara/kampuni na malengo ya mradi',
        'Jina la kikoa (Domain) linalopendekezwa na mpangilio wa hosting',
        'Muundo wa kurasa zinazohitajika (Home, About, Services, Contact, n.k.)',
        'Nyenzo za chapa: Nembo (Logo), rangi, picha bora',
        'Maandishi na maudhui ya kurasa',
        'Mifumo maalum (WhatsApp chat, fomu za maoni, duka la mtandaoni, malipo, SEO)',
        'Msimamizi wa mawasiliano kwa ajili ya usimamizi na masasisho',
      ],
      en: [
        'Business / company details & project objectives',
        'Proposed domain name & hosting preference',
        'Structure of required pages (Home, About, Services, Contact, etc.)',
        'Branding assets: High-resolution logo, color palette, company images',
        'Written page text and content',
        'Special required features (WhatsApp chat, inquiry form, catalog/shop, mobile payments, SEO)',
        'Designated contact administrator for ongoing management and updates',
      ],
      zh: [
        '企业/机构基本资料及网站设立目标说明',
        '拟绑定的专属域名与服务器托管偏好',
        '各栏目与页面架构规划（首页、关于我们、业务服务、联系我们等）',
        '品牌视觉素材：矢量高清 LOGO、品牌标准主色调、企业实景/产品高清图',
        '各页面文案草案与产品业务说明',
        '特定业务功能需求（WhatsApp 实时客服悬浮窗、留言询盘表单、在线商城/支付接口、SEO基础优化）',
        '负责日常运维对接与内容更新的指定管理员联络信息',
      ],
      fr: [
        'Informations sur l’entreprise et objectifs du projet',
        'Nom de domaine souhaité et choix d’hébergement',
        'Arborescence des pages requises (Accueil, À propos, Services, Contact, etc.)',
        'Éléments de marque : Logo haute définition, charte graphique, photos professionnelles',
        'Textes et contenus rédigés pour chaque page',
        'Fonctionnalités spécifiques (Bouton WhatsApp, formulaire de contact, boutique, paiements, SEO)',
        'Contact de l’administrateur pour la gestion et les mises à jour',
      ],
      de: [
        'Unternehmensdaten und Zielsetzung des Webprojekts',
        'Wunschdomain und Hosting-Präferenzen',
        'Struktur der gewünschten Seiten (Startseite, Über uns, Leistungen, Kontakt etc.)',
        'Marken-Assets: Hochauflösendes Logo, Farbpalette, professionelle Fotos',
        'Inhaltstexte für die jeweiligen Seiten',
        'Spezifische Funktionsanforderungen (WhatsApp-Button, Kontaktformular, Shop, Zahlungsabwicklung, SEO)',
        'Benannter Administrator für laufende Betreuung und Updates',
      ],
    },
  },
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'post-rita-guide-2026',
    slug: 'how-to-apply-for-birth-certificate-in-tanzania-rita',
    title: {
      en: 'Step-by-Step Guide: How to Apply for a Birth Certificate with RITA Tanzania (2026)',
      sw: 'Mwongozo Hatua kwa Hatua: Jinsi ya Kuomba Cheti cha Kuzaliwa Kupitia RITA Tanzania (2026)',
      zh: '2026全流程指南：如何在线申请坦桑尼亚 RITA 出生证明',
      fr: 'Guide Étape par Étape : Obtenir un Acte de Naissance RITA en Tanzanie (2026)',
      de: 'Schritt-für-Schritt: Beantragung der RITA-Geburtsurkunde in Tansania (2026)',
    },
    excerpt: {
      en: 'A comprehensive walkthrough detailing the required documentation, hospital birth notifications, WEO introduction letters, and avoiding common rejection pitfalls on the RITA portal.',
      sw: 'Mwongozo kamili unaoeleza nyaraka zinazohitajika, kadi ya kliniki, barua ya Mtendaji wa Kata, na jinsi ya kuepuka makosa yanayorudisha maombi nyuma.',
      zh: '详尽梳理医院出生记录核查、居委会证明开具及在线电子平台填报要领，助您一次性顺利获批。',
      fr: 'Tout ce qu’il faut savoir sur les pièces exigées, les attestations de quartier et les astuces pour réussir votre démarche RITA.',
      de: 'Umfassender Leitfaden zu Voraussetzungen, Unterlagen und der Vermeidung typischer Fehler beim RITA-Onlineportal.',
    },
    content: {
      en: `Applying for an official birth certificate in Tanzania is a critical step for obtaining a NIDA identity card, securing a passport, enrolling in university, or traveling internationally.

### 1. Essential Prerequisites
Before starting your online application, assemble these core documents:
- **Notification of Birth** issued by the medical officer where the birth occurred, or a recognized child health immunization clinic card.
- **Parents' Valid Identification**: National ID (NIDA), Voter's registration card, or valid Passport.
- **Ward Executive Officer (WEO) Introduction Letter** verifying place of residence and family lineage.
- **Recent Digital Passport Photo** with clean light background.

### 2. The Verification Workflow
For applicants born before 1980 or late registrations, an affidavit or sworn statement in front of an authorized magistrate may be requested. Our E27 facilitation team reviews each document before portal submission to ensure that names, dates, and locations match exactly across all submitted records.

### 3. Processing Times and Collection
Standard processing typically takes between 3 to 10 working days depending on registration category and age. Once approved, the certified certificate can be collected or dispatched directly to your designated district center.`,
      sw: `Kupata cheti rasmi cha kuzaliwa nchini Tanzania ni hatua muhimu sana kwa ajili ya kupata kitambulisho cha NIDA, pasipoti ya kusafiria, kujiunga na chuo au fursa za ajira.

### 1. Nyaraka Muhimu Zinazohitajika
Kabla ya kuanza maombi, hakikisha una vielelezo hivi:
- **Taarifa ya hospitali (Notification of Birth)** au kadi ya kliniki ya chanjo ya mtoto.
- **Vitambulisho halali vya wazazi**: Kitambulisho cha NIDA, kitambulisho cha mpiga kura au Pasipoti.
- **Barua ya Utambulisho kutoka kwa Afisa Mtendaji wa Kata (WEO)**.
- **Picha ya pasipoti (Passport size)** ya kidijitali yenye mandhari meupe.

### 2. Ukaguzi na Uhakiki
Kwa wale waliozaliwa miaka ya nyuma bila kadi ya kliniki, maelezo ya kiapo (Affidavit) mbele ya hakimu yanaweza kuhitajika. Timu ya E27 hukagua majina na herufi zote kabla ya kuwasilisha maombi ili kuzuia maombi kukataliwa.`,
      zh: `在坦桑尼亚申领正式的 RITA 出生证明，是后续申办国家身份证（NIDA）、出国护照、大学深造或购置不动产的前提基础。

### 1. 核心材料准备清单
- 医疗机构出具的官方出生告知书（Notification of Birth）或儿童健康免疫卡；
- 父母双方有效法定身份证明（NIDA 身份证、选民卡或外国护照原件扫描件）；
- 所属行政区/街道办事处（WEO）开具的常住人口亲属关系介绍信；
- 标准白底数码护照照片。

### 2. 姓名拼写与档案核实
若出生年限较早未保留诊所原始记录，需依法向当地法官申请宣誓说明书。E27 专业团队在递交官方系统前，会细致校对拼写一致性，避免因字母差异导致打回延误。`,
      fr: `L'obtention d'un acte de naissance auprès de la RITA est indispensable pour toute démarche administrative en Tanzanie (NIDA, passeport, études). Préparez vos pièces justificatives soigneusement.`,
      de: `Eine offizielle RITA-Geburtsurkunde ist der Schlüssel für NIDA-Ausweise, Reisepässe und behördliche Anerkennung in Tansania. Wir begleiten den Vorbereitungsprozess transparent.`,
    },
    category: 'Government Services',
    author: 'E27 Legal & Documentation Team',
    publishedAt: '2026-08-15',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    featured: true,
    views: 1420,
    tags: ['RITA', 'BirthCertificate', 'Tanzania', 'NIDA'],
    published: true,
  },
  {
    id: 'post-tra-tin-guide-2026',
    slug: 'how-to-get-tin-number-in-tanzania-tra',
    title: {
      en: 'How to Get Your Individual & Business TIN Number in Tanzania: Complete TRA Guide',
      sw: 'Jinsi ya Kupata Namba ya TIN ya Mtu Binafsi na Biashara: Mwongozo Kamili wa TRA',
      zh: '坦桑尼亚国税局（TRA）个人与企业 TIN 税号申办全解',
      fr: 'Comment Obtenir Son Numéro TIN (TRA) en Tanzanie : Le Guide Complet',
      de: 'So erhalten Sie Ihre TIN-Steuernummer in Tansania: Vollständiger TRA-Leitfaden',
    },
    excerpt: {
      en: 'Learn how to register for a Taxpayer Identification Number (TIN) with TRA, what documents you need, and how long the process takes.',
      sw: 'Fahamu hatua za kusajili Namba ya Utambulisho wa Mlipakodi (TIN) ya TRA, nyaraka zinazohitajika na muda unaochukua.',
      zh: '从个人 TIN 电子申请到企业商号关联申报，解析坦桑尼亚税务合规与税号办理全要点。',
      fr: 'Tout comprendre sur le numéro d’identification fiscale de la TRA pour les particuliers et entrepreneurs.',
      de: 'Erfahren Sie alles über Beantragung, Unterlagen und Bearbeitungszeiten für die tansanische TIN-Steuernummer.',
    },
    content: {
      en: `A Taxpayer Identification Number (TIN) is a unique 9-digit identification issued by the Tanzania Revenue Authority (TRA).

### Why Do You Need a TIN?
- Opening a commercial or corporate bank account in Tanzania.
- Registering a motor vehicle or acquiring a driving license.
- Operating any formal commercial entity or professional service.
- Applying for land title deeds or foreign trade clearances.

### Requirements for Individual TIN
- An active **NIDA National ID card** or valid NIDA digital verification number.
- Registered mobile number matching your NIDA record.
- Current residential physical address.

### Upgrading to a Business TIN
If you register a business name or company through BRELA, you must link your individual TIN with the business entity and submit a lease agreement of the business premises to receive the dedicated Business TIN certificate.`,
      sw: `Namba ya Utambulisho wa Mlipakodi (TIN) ni namba ya kipekee ya tarakimu 9 inayotolewa na Mamlaka ya Mapato Tanzania (TRA).

### Kwa Nini Unahitaji TIN?
- Kufungua akaunti ya benki ya biashara au ya binafsi.
- Kupata leseni ya udereva au kusajili chombo cha moto.
- Kufanya biashara yoyote halali nchini Tanzania.
- Kupata hati za viwanja na nyumba.

### Mahitaji ya TIN ya Mtu Binafsi
- Namba au Kitambulisho cha NIDA.
- Namba ya simu iliyosajiliwa kwa jina lako.
- Anwani unapoishi sasa.`,
      zh: `TIN 是坦桑尼亚税务局颁发的 9 位唯一税务识别代号，是进行一切商业交易的立足之本。申请个人税号须持有 NIDA 证明，办理企业税号则须配合营业场地租赁协议一同申报。`,
      fr: `Le numéro TIN est votre identifiant fiscal obligatoire auprès de la TRA pour toute activité économique en Tanzanie.`,
      de: `Die TIN ist die zentrale Steuernummer der Tanzania Revenue Authority für alle geschäftlichen und steuerlichen Transaktionen.`,
    },
    category: 'Tax & Compliance',
    author: 'E27 Tax Advisory Group',
    publishedAt: '2026-08-28',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    views: 980,
    tags: ['TRA', 'TIN', 'Tax', 'Compliance'],
    published: true,
  },
  {
    id: 'post-brela-company-registration',
    slug: 'brela-company-registration-process-tanzania',
    title: {
      en: 'How to Register a Company in Tanzania on BRELA ORS Portal (Fast & Compliant)',
      sw: 'Jinsi ya Kusajili Kampuni nchini Tanzania Kupitia Mfumo wa BRELA ORS',
      zh: '坦桑尼亚 BRELA ORS 系统公司注册与法律合规实务操作',
      fr: 'Enregistrement de Société sur le Portail BRELA ORS en Tanzanie',
      de: 'Unternehmensgründung in Tansania über das BRELA ORS-Portal',
    },
    excerpt: {
      en: 'Discover the differences between registering a Business Name vs. a Limited Company (Ltd), MEMARTS preparation, and post-incorporation checklist.',
      sw: 'Fahamu tofauti kati ya kusajili Jina la Biashara na Kampuni ya Dhima Yenye Kikomo (Ltd), maandalizi ya Katiba ya Kampuni na hatua za kufuata baada ya kupata cheti.',
      zh: '独资商号与股份有限公司的区别、公司章程起草以及设立后的税务准入全套实战干货。',
      fr: 'Différences entre nom commercial et SARL/SA, statuts MEMARTS et démarches post-immatriculation.',
      de: 'Wegweiser zur Wahl der passenden Unternehmensform (Einzelunternehmen vs. Ltd) und Satzungserstellung bei BRELA.',
    },
    content: {
      en: `Starting a formal business entity in Tanzania gives your enterprise legal recognition, the capacity to bid for tenders, and limited liability protection.

### Step 1: Business Name vs Limited Company
- **Business Name (Sole Proprietorship / Partnership)**: Simpler setup, lower ongoing statutory filings, but full personal liability for business debts.
- **Limited Liability Company (LLC / Ltd)**: Independent legal entity, shields personal assets, mandatory minimum of two shareholders/directors.

### Step 2: Name Reservation on BRELA
We submit three chosen names in order of preference. BRELA verifies that no conflicting entity holds the identical trademark or name.

### Step 3: MEMARTS Preparation
The Memorandum and Articles of Association articulate share allocation, director authorities, and registered business objects. E27 assists founders with professionally structured clauses.`,
      sw: `Kusajili biashara nchini Tanzania kunakupa uhalali wa kisheria, fursa ya kuomba zabuni kubwa za serikali na taasisi, pamoja na kujenga heshima kwa wateja wako.`,
      zh: `通过 BRELA ORS 设立合法实体是开拓坦桑尼亚及东非共同体市场的首要步骤。有限责任公司（Ltd）能够有效隔离股东个人资产风险并赋予参与招投标资格。`,
      fr: `Créez une entité juridique reconnue en Tanzanie pour rassurer vos investisseurs et partenaires commerciaux.`,
      de: `Der Schritt in die formelle Wirtschaft Tansanias bietet rechtliche Sicherheit und Zugang zu institutionellen Aufträgen.`,
    },
    category: 'Business Registration',
    author: 'E27 Corporate Services',
    publishedAt: '2026-09-01',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    views: 1150,
    tags: ['BRELA', 'CompanyRegistration', 'ORS', 'Business'],
    published: true,
  },
  {
    id: 'post-web-design-importance',
    slug: 'why-your-tanzanian-business-needs-a-website-2026',
    title: {
      en: 'Why Every Tanzanian Business Needs a Professional Website in 2026',
      sw: 'Kwa Nini Kila Biashara nchini Tanzania Inahitaji Tovuti ya Kisasa mwaka 2026',
      zh: '为什么坦桑尼亚本土企业在2026年必须拥有独立专业官网？',
      fr: 'Pourquoi Toute Entreprise en Tanzanie Doit Avoir un Site Web en 2026',
      de: 'Warum jedes tansanische Unternehmen 2026 eine professionelle Website braucht',
    },
    excerpt: {
      en: 'Moving beyond social media: how a dedicated website with a .co.tz domain establishes credibility, captures Google traffic, and automates client inquiries.',
      sw: 'Kuvuka mipaka ya mitandao ya kijamii: jinsi tovuti rasmi yenye jina la .co.tz inavyojenga uaminifu na kuleta wateja wapya kupitia Google.',
      zh: '摆脱单一依赖社交媒体的局限，解析独立官网结合 .co.tz 本地域名对于打造跨国品牌公信力与全天候获客的关键价值。',
      fr: 'Pourquoi les réseaux sociaux ne suffisent plus et comment un site web professionnel propulse votre croissance.',
      de: 'Mehr als Social Media: Wie eine eigene Website mit lokaler Domain Vertrauen schafft und automatisierte Anfragen generiert.',
    },
    content: {
      en: `While Instagram and WhatsApp are powerful sales channels in Tanzania, serious corporate clients, procurement officers, and international partners search on Google before doing business.

### 1. The Power of a .co.tz Domain
A local Tanzanian domain communicates that you are anchored in the country, legally accountable, and easily reachable in places like Dar es Salaam, Arusha, or Mwanza.

### 2. Google Search Dominance
When potential clients in Kigamboni or Kariakoo search for your specific services, an SEO-optimized website puts your phone number and address right in front of them.

### 3. Professional Email Addresses
Sending proposals from info@yourcompany.co.tz instantly sets you apart from amateur competitors using generic Gmail addresses.`,
      sw: `Ingawa Instagram na WhatsApp zinasaidia sana kuuza bidhaa nchini Tanzania, wateja wakubwa, mashirika na makampuni ya nje hutafuta biashara kwenye Google kabla ya kufanya makubaliano. Tovuti rasmi ndiyo kitambulisho kikuu cha ofisi yako kidijitali.`,
      zh: `社交媒体固然在坦桑尼亚拥有广泛受众，但当机构买家、跨国合作伙伴与中资企业寻找合规供应商时，拥有专属独立品牌官网和专业企业邮箱是必不可少的诚信标尺。`,
      fr: `Un site internet dédié apporte la légitimité nécessaire pour décrocher des contrats auprès de clients d'envergure.`,
      de: `Eine maßgeschneiderte Website mit eigener Domain ist die beste Visitenkarte für wachsende Unternehmen in Ostafrika.`,
    },
    category: 'Technology & Web',
    author: 'E27 Web Solutions Team',
    publishedAt: '2026-09-04',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    featured: false,
    views: 840,
    tags: ['WebDesign', 'Hosting', 'Domains', 'Tanzania'],
    published: true,
  },
];

export const initialComments: BlogComment[] = [
  {
    id: 'comm-101',
    postId: 'post-rita-guide-2026',
    authorName: 'Juma Hassan',
    authorEmail: 'juma.hassan@example.com',
    content: 'Habari E27! Niliomba cheti cha kuzaliwa kwa mtoto wangu lakini hospitali iliyozaliwa ilifungwa. Je, barua ya Mtendaji wa Kata pekee inatosha?',
    createdAt: '2026-08-20T10:30:00Z',
    status: 'approved',
    likes: 4,
    replies: [
      {
        id: 'comm-101-rep-1',
        postId: 'post-rita-guide-2026',
        parentId: 'comm-101',
        authorName: 'E27 Support Team',
        authorEmail: 'support@e27.co.tz',
        content: 'Habari Juma! Ndio, ikiwa hospitali ilifungwa, tunakuongoza kuandaa kiapo cha kisheria (Affidavit) pamoja na barua ya Mtendaji wa Kata (WEO) na cheti cha chanjo/ubatizo. Maombi yataenda vizuri kabisa!',
        createdAt: '2026-08-20T11:15:00Z',
        status: 'approved',
        likes: 7,
      },
    ],
  },
  {
    id: 'comm-102',
    postId: 'post-tra-tin-guide-2026',
    authorName: 'Grace Makena',
    authorEmail: 'grace.makena@example.com',
    content: 'Thank you for this clear article. Does an individual TIN expire if I do not do business for one year?',
    createdAt: '2026-08-30T14:20:00Z',
    status: 'approved',
    likes: 3,
    replies: [
      {
        id: 'comm-102-rep-1',
        postId: 'post-tra-tin-guide-2026',
        parentId: 'comm-102',
        authorName: 'E27 Tax Specialist',
        authorEmail: 'support@e27.co.tz',
        content: 'An individual TIN is permanent and never expires in Tanzania. However, if linked to a registered business entity, you must submit annual Nil returns to avoid statutory default flags.',
        createdAt: '2026-08-30T15:00:00Z',
        status: 'approved',
        likes: 5,
      },
    ],
  },
  {
    id: 'comm-103',
    postId: 'post-brela-company-registration',
    authorName: 'David Chen',
    authorEmail: 'david.chen@consultant.com',
    content: 'Can foreign citizens be 100% shareholders of a Tanzanian limited company, or is a local director mandatory?',
    createdAt: '2026-09-02T09:12:00Z',
    status: 'pending', // Pending moderation in admin
    likes: 1,
  },
  {
    id: 'comm-104',
    postId: 'post-web-design-importance',
    authorName: 'Amina Selemani',
    authorEmail: 'amina.store@gmail.com',
    content: 'Nahitaji tovuti ya kuuza nguo na viatu mtandaoni. Je, inaweza kuunganishwa na malipo ya M-Pesa na Lipa Namba?',
    createdAt: '2026-09-05T16:45:00Z',
    status: 'pending', // Pending moderation in admin
    likes: 2,
  },
];

export const initialApplications: ServiceApplication[] = [
  {
    id: 'E27-2026-1042',
    serviceId: 'srv-rita-birth',
    serviceCode: 'rita_birth',
    serviceName: 'RITA Birth Certificate Services',
    customerName: 'Amani Bakari Mtambo',
    customerPhone: '+255 712 345 678',
    customerWhatsApp: '+255 712 345 678',
    customerEmail: 'amani.mtambo@example.com',
    customerAddress: 'Kigamboni, Tuangoma, Dar es Salaam',
    submittedAt: '2026-09-03T08:15:00Z',
    updatedAt: '2026-09-05T14:20:00Z',
    status: 'In Progress',
    formData: {
      dob: '1998-04-12',
      pob: 'Temeke Hospital, Dar es Salaam',
      gender: 'Male',
      fatherName: 'Bakari Juma Mtambo',
      motherName: 'Zubeda Said Ally',
      nationality: 'Tanzanian',
      region: 'Dar es Salaam',
      district: 'Kigamboni',
      ward: 'Tuangoma',
      applicationType: 'New Application',
      extraNotes: 'Needs urgent verification for upcoming university scholarship passport application.',
    },
    documents: [
      {
        id: 'doc-1',
        name: 'Clinic_Birth_Card_Amani.pdf',
        size: 1450000,
        type: 'application/pdf',
        uploadedAt: '2026-09-03T08:14:00Z',
      },
      {
        id: 'doc-2',
        name: 'WEO_Intro_Letter_Tuangoma.jpg',
        size: 820000,
        type: 'image/jpeg',
        uploadedAt: '2026-09-03T08:14:30Z',
      },
    ],
    adminNotes: 'Documents uploaded to RITA gateway. Tracking code verified with district registrar.',
    history: [
      {
        id: 'h-1',
        timestamp: '2026-09-03T08:15:00Z',
        status: 'New',
        note: 'Application received via E27 online portal.',
        actor: 'system',
      },
      {
        id: 'h-2',
        timestamp: '2026-09-03T11:00:00Z',
        status: 'Received',
        note: 'Assigned to Documentation Specialist for preliminary inspection.',
        actor: 'admin',
      },
      {
        id: 'h-3',
        timestamp: '2026-09-04T09:30:00Z',
        status: 'Under Review',
        note: 'Hospital birth ledger cross-referenced with Temeke health archives.',
        actor: 'admin',
      },
      {
        id: 'h-4',
        timestamp: '2026-09-05T14:20:00Z',
        status: 'In Progress',
        note: 'Submitted to RITA national portal. Pending certification seal.',
        actor: 'admin',
      },
    ],
  },
  {
    id: 'E27-2026-1043',
    serviceId: 'srv-tra-tin',
    serviceCode: 'tra_tin',
    serviceName: 'TRA TIN Registration & Tax Services',
    customerName: 'Fatma Salum Rashid',
    customerPhone: '+255 784 998 877',
    customerWhatsApp: '+255 784 998 877',
    customerEmail: 'fatma.rashid@biztanzania.com',
    customerAddress: 'Kigamboni, Ferry, Dar es Salaam',
    submittedAt: '2026-09-05T11:45:00Z',
    updatedAt: '2026-09-06T10:00:00Z',
    status: 'Completed',
    formData: {
      nidaNumber: '19920815-11105-00001-22',
      tinType: 'Individual & Business Sole Proprietor',
      businessName: 'Rashid Logistics & Fresh Fish Supplies',
      businessCategory: 'Wholesale & Retail Transport',
      location: 'Kigamboni Ferry Market Area',
      taxCenter: 'TRA Temeke / Kigamboni Branch',
    },
    documents: [
      {
        id: 'doc-3',
        name: 'NIDA_Card_Fatma.pdf',
        size: 960000,
        type: 'application/pdf',
        uploadedAt: '2026-09-05T11:43:00Z',
      },
    ],
    adminNotes: 'TIN generated: 148-922-340. Certificate sent via WhatsApp & Email to customer.',
    history: [
      {
        id: 'h-5',
        timestamp: '2026-09-05T11:45:00Z',
        status: 'New',
        note: 'Online submission completed.',
        actor: 'system',
      },
      {
        id: 'h-6',
        timestamp: '2026-09-05T14:00:00Z',
        status: 'In Progress',
        note: 'Processed on TRA Taxpayer Portal.',
        actor: 'admin',
      },
      {
        id: 'h-7',
        timestamp: '2026-09-06T10:00:00Z',
        status: 'Completed',
        note: 'TIN Certificate issued and dispatched.',
        actor: 'admin',
      },
    ],
  },
  {
    id: 'E27-2026-1044',
    serviceId: 'srv-web-design',
    serviceCode: 'web_design',
    serviceName: 'Professional Website Design & Development',
    customerName: 'Kigamboni Marine Safari Tours',
    customerPhone: '+255 755 123 456',
    customerWhatsApp: '+255 755 123 456',
    customerEmail: 'info@kigambonisafari.co.tz',
    customerAddress: 'South Beach Road, Kigamboni, Dar es Salaam',
    submittedAt: '2026-09-06T15:30:00Z',
    updatedAt: '2026-09-06T15:30:00Z',
    status: 'New',
    formData: {
      companyName: 'Kigamboni Marine Safari Tours Ltd',
      websiteType: 'Tourism & Booking Web Application',
      pagesRequired: 'Home, About Us, Boat Tours, Snorkeling Packages, Gallery, Online Booking, Contact',
      preferredDomain: 'kigambonitours.co.tz',
      hostingRequired: 'Yes, High-Speed SSD Hosting + Business Emails',
      features: 'Online inquiry form, currency converter (TZS/USD), WhatsApp live chat widget',
      budgetRange: '1,200,000 - 2,500,000 TZS',
      deadline: 'Within 2 Weeks',
    },
    documents: [
      {
        id: 'doc-4',
        name: 'Brand_Logo_KigamboniTours.png',
        size: 512000,
        type: 'image/png',
        uploadedAt: '2026-09-06T15:28:00Z',
      },
    ],
    adminNotes: 'Initial brief reviewed. Scheduled consultation call on WhatsApp for mockups.',
    history: [
      {
        id: 'h-8',
        timestamp: '2026-09-06T15:30:00Z',
        status: 'New',
        note: 'Website development project proposal submitted.',
        actor: 'system',
      },
    ],
  },
];

export const initialCustomers: CustomerProfile[] = [
  {
    id: 'cust-1',
    fullName: 'Amani Bakari Mtambo',
    email: 'amani.mtambo@example.com',
    phone: '+255 712 345 678',
    whatsApp: '+255 712 345 678',
    address: 'Kigamboni, Tuangoma, Dar es Salaam',
    createdAt: '2026-09-03',
    totalApplications: 1,
  },
  {
    id: 'cust-2',
    fullName: 'Fatma Salum Rashid',
    email: 'fatma.rashid@biztanzania.com',
    phone: '+255 784 998 877',
    whatsApp: '+255 784 998 877',
    address: 'Kigamboni, Ferry, Dar es Salaam',
    createdAt: '2026-09-05',
    totalApplications: 1,
  },
  {
    id: 'cust-3',
    fullName: 'Kigamboni Marine Safari Tours',
    email: 'info@kigambonisafari.co.tz',
    phone: '+255 755 123 456',
    whatsApp: '+255 755 123 456',
    address: 'South Beach Road, Kigamboni, Dar es Salaam',
    createdAt: '2026-09-06',
    totalApplications: 1,
  },
];

export const initialSettings: WebsiteSettings = {
  brandName: 'E27',
  tagline: 'Simplifying Your Digital World.',
  phone: '0714530815',
  whatsApp: '0714530815',
  email: 'elishasamwel27@gmail.com',
  supportEmail: 'elishasamwel27@gmail.com',
  location: 'Kijichi, Kigamboni, Dar es Salaam, Tanzania',
  officeHours: 'Monday - Saturday: 8:00 AM - 6:00 PM EAT | Sunday: Closed',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15846.549247012356!2d39.3080!3d-6.8750!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c48b2649060b9%3A0x6b74cb2e448bdf1b!2sKijichi%2C%20Dar%20es%20Salaam%2C%20Tanzania!5e0!3m2!1sen!2stz!4v1700000000000!5m2!1sen!2stz',
  socials: {
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    whatsappCommunity: '',
  },
  disclaimer: 'E27 is an independent private digital service provider and is not affiliated with, sponsored by, or operated by the Government of Tanzania. All official certificates and permits are processed and issued solely by respective state authorities.',
};

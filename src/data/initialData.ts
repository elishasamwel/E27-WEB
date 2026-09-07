import { ServiceItem, BlogPost, ServiceApplication, BlogComment, WebsiteSettings, CustomerProfile } from '../types';

export const initialServices: ServiceItem[] = [
  // 1. RITA Birth Certificate
  {
    id: 'srv-rita-birth',
    category: 'government',
    code: 'rita_birth',
    name: {
      en: 'RITA Birth Certificate Services',
      sw: 'Huduma za Vyeti vya Kuzaliwa RITA',
      zh: 'RITA 坦桑尼亚出生证明代办与核验',
      fr: 'Services d’Acte de Naissance RITA',
      de: 'RITA Geburtsurkunden-Dienstleistungen',
    },
    shortDesc: {
      en: 'Assistance with new birth certificate applications, verification, corrections, and certified copies.',
      sw: 'Msaada wa maombi mapya ya cheti cha kuzaliwa, uhakiki, marekebisho, na nakala zilizoidhinishwa.',
      zh: '协助新出生证明申请、官方真实性核验、信息更正及公证副本申领。',
      fr: 'Aide pour demande d’acte de naissance, vérification, correction et copies conformes.',
      de: 'Unterstützung bei Erstanträgen für Geburtsurkunden, Verifizierung und beglaubigten Kopien.',
    },
    fullDesc: {
      en: 'We assist Tanzanian citizens with the entire RITA (Registration Insolvency and Trusteeship Agency) online application portal workflow. From compiling clinic cards, baptismal cards, local government introduction letters to submitting verified digital applications.',
      sw: 'Tunasaidia wananchi kufuata mfumo mzima wa RITA mtandaoni. Kuanzia kuandaa kadi ya kliniki, kadi ya ubatizo, barua ya serikali ya mtaa hadi kuwasilisha maombi yaliyohakikiwa.',
      zh: '我们为坦桑尼亚公民及外籍在坦人士提供 RITA 机构在线出生证申请指导与流程代办，协助整理诊所登记卡、受洗证、地方政府介绍信及电子申报。',
      fr: 'Nous accompagnons les demandeurs dans le portail en ligne de la RITA pour les certificats de naissance avec vérification minutieuse des pièces requises.',
      de: 'Wir begleiten den gesamten RITA-Onlineantragsprozess für tansanische Geburtsurkunden von der Dokumentenvorbereitung bis zur Einreichung.',
    },
    icon: 'FileText',
    estimatedTime: '3 - 7 Business Days',
    popular: true,
    active: true,
    requirements: {
      en: ['Applicant Birth Clinic Card or Hospital Notification', 'Parents’ Identification (NIDA / Voter / Passport)', 'Ward Executive Officer (WEO) Introduction Letter', 'Passport-size digital photo'],
      sw: ['Kadi ya Kliniki au Taarifa ya Hospitali', 'Vitambulisho vya Wazazi (NIDA / Mpiga Kura / Pasipoti)', 'Barua ya Mtendaji wa Kata (WEO)', 'Picha ndogo (Passport size) ya kidijitali'],
      zh: ['出生医院证明或诊所出生卡', '父母双方有效身份证明（NIDA / 选民证 / 护照）', '当地街道办/居委会介绍信', '白底数码护照照片'],
      fr: ['Carnet de clinique de naissance ou attestation hospitalière', 'Pièces d’identité des parents (NIDA / Passeport)', 'Lettre d’introduction du chef de quartier', 'Photo d’identité numérique'],
      de: ['Geburtsnachweis der Klinik/des Krankenhauses', 'Ausweisdokumente der Eltern (NIDA / Pass)', 'Einführungsschreiben der lokalen Bezirksverwaltung', 'Passfoto im Digitalformat'],
    },
  },

  // 2. RITA Death Certificate
  {
    id: 'srv-rita-death',
    category: 'government',
    code: 'rita_death',
    name: {
      en: 'RITA Death Certificate Application',
      sw: 'Maombi ya Cheti cha Kifo RITA',
      zh: 'RITA 死亡证明登记与申请',
      fr: 'Demande d’Acte de Décès RITA',
      de: 'RITA Sterbeurkunden-Antrag',
    },
    shortDesc: {
      en: 'Guidance and filing for official death certificate registration with RITA.',
      sw: 'Mwongozo na uwasilishaji wa usajili wa cheti rasmi cha kifo kupitia mfumo wa RITA.',
      zh: '指导并协助在 RITA 官方系统进行死亡登记与正式死亡证明申请。',
      fr: 'Enregistrement officiel et accompagnement pour acte de décès via RITA.',
      de: 'Begleitung und Abwicklung der offiziellen Sterbefallregistrierung bei RITA.',
    },
    fullDesc: {
      en: 'Efficient handling of death certificate documentation for inheritance, insurance claims, and legal estate affairs through the RITA electronic gateway.',
      sw: 'Utaratibu wa haraka wa kupata cheti cha kifo kwa ajili ya mirathi, bima na masuala ya kisheria kupitia mfumo wa RITA.',
      zh: '用于遗产继承、保险理赔及司法事务的坦桑尼亚官方死亡证明加急协助。',
      fr: 'Prise en charge des démarches pour l’obtention d’actes de décès pour successions et assurances.',
      de: 'Zuverlässige Bearbeitung von Sterbeurkunden für Erbangelegenheiten und behördliche Nachweise.',
    },
    icon: 'FileCheck2',
    estimatedTime: '5 - 10 Business Days',
    popular: false,
    active: true,
    requirements: {
      en: ['Hospital burial permit or cause of death notification', 'Deceased person’s NIDA or national ID copy', 'Informant/Next of kin identification', 'Local government endorsement'],
      sw: ['Kibali cha mazishi au taarifa ya hospitali', 'Nakala ya kitambulisho cha marehemu (NIDA)', 'Kitambulisho cha mtoa taarifa/mrithi', 'Barua ya serikali ya mtaa'],
      zh: ['医院死亡通知书或安葬许可', '逝者有效身份证件', '申报亲属或直系亲属有效身份证件', '所属社区证明'],
      fr: ['Permis d’inhumer ou déclaration de décès', 'Pièce d’identité du défunt (NIDA)', 'Pièce d’identité du déclarant / ayant droit', 'Attestation de l’autorité locale'],
      de: ['Ärztliche Todesbescheinigung oder Bestattungserlaubnis', 'Ausweiskopie der verstorbenen Person', 'Ausweis des Antragstellers/Hinterbliebenen', 'Bestätigung der lokalen Behörde'],
    },
  },

  // 3. TRA TIN Applications
  {
    id: 'srv-tra-tin',
    category: 'government',
    code: 'tra_tin',
    name: {
      en: 'TRA TIN Registration & Tax Services',
      sw: 'Usajili wa TIN ya TRA & Huduma za Kodi',
      zh: 'TRA 坦桑尼亚税务局 TIN 税号申请与申报',
      fr: 'Attribution de Numéro TIN (TRA) & Fiscalité',
      de: 'TRA Steuernummer (TIN) & Steuerberatung',
    },
    shortDesc: {
      en: 'Individual TIN, business TIN registration, TIN certificate retrieval, and tax registration assistance.',
      sw: 'Usajili wa TIN ya mtu binafsi au biashara, kurejesha cheti cha TIN, na usaidizi wa usajili wa kodi.',
      zh: '个人与企业 TIN 税号申办、税号证书遗失找回、税务合规登记代办。',
      fr: 'Obtention de numéro d’identification fiscale (TIN) personnel ou société auprès de la TRA.',
      de: 'Beantragung persönlicher und gewerblicher Steuernummern (TIN) bei der Tanzania Revenue Authority.',
    },
    fullDesc: {
      en: 'Obtaining your Taxpayer Identification Number (TIN) is essential for banking, driving licenses, passport applications, and operating businesses in Tanzania. We prepare and lodge complete filings on the TRA Taxpayer Portal.',
      sw: 'Kupata Namba ya Utambulisho wa Mlipakodi (TIN) ni muhimu kwa akaunti ya benki, leseni ya udereva, pasipoti na kuendesha biashara nchini Tanzania. Tunakuandalia na kuwasilisha maombi mtandaoni.',
      zh: 'TIN税号是坦桑尼亚开立银行账户、申请驾照、护照及开展一切商业活动的法定义务凭证。我们协助快速递交 TRA 门户审核。',
      fr: 'Le TIN est indispensable pour les comptes bancaires, permis et activités commerciales en Tanzanie. Nous nous chargeons de la saisie sur le portail TRA.',
      de: 'Die TIN ist obligatorisch für Bankkonten, Führerscheine und Firmen in Tansania. Wir begleiten den digitalen Portalantrag.',
    },
    icon: 'Landmark',
    estimatedTime: '24 - 48 Hours',
    popular: true,
    active: true,
    requirements: {
      en: ['National Identity Card (NIDA) or NIDA number', 'Active phone number & email address', 'Physical address & lease agreement or proof of premises', 'Business name registration certificate (if Business TIN)'],
      sw: ['Kitambulisho cha NIDA au namba ya NIDA', 'Namba ya simu inayopatikana na email', 'Anwani halisi ya makazi au mkataba wa pango', 'Cheti cha usajili wa jina la biashara (kwa TIN ya biashara)'],
      zh: ['NIDA 国民身份证或清晰电子号码', '常用联系手机与电子邮箱', '实际办公或常住地址（含租赁合同）', '营业执照/商号证书（如申请企业税号）'],
      fr: ['Carte d’identité NIDA ou numéro NIDA', 'Numéro de téléphone actif & email', 'Adresse physique / contrat de bail', 'Certificat d’enregistrement d’entreprise (le cas échéant)'],
      de: ['NIDA-Nationalausweis oder NIDA-Nummer', 'Gültige Telefonnummer & E-Mail-Adresse', 'Standortadresse / Mietnachweis', 'Gewerbeanmeldung (falls Firmen-TIN)'],
    },
  },

  // 4. TAUSI Business Licence
  {
    id: 'srv-tausi-licence',
    category: 'government',
    code: 'tausi_licence',
    name: {
      en: 'TAUSI Business Licence Portal',
      sw: 'Leseni za Biashara Kupitia TAUSI',
      zh: 'TAUSI 地方政府营业执照申请与年检',
      fr: 'Licence Commerciale via Portail TAUSI',
      de: 'TAUSI Gewerbelizenz der Stadtverwaltung',
    },
    shortDesc: {
      en: 'New municipal business licence applications, annual renewals, and municipal clearance in Tanzania.',
      sw: 'Maombi mapya ya leseni ya biashara ya halmashauri, kuhuisha leseni za mwaka na idhini za halmashauri.',
      zh: '坦桑尼亚市政厅 TAUSI 系统营业执照首次申请、年度更新换发及市政合规。',
      fr: 'Demande et renouvellement de licences commerciales municipales en Tanzanie.',
      de: 'Neubeantragung und Verlängerung kommunaler Gewerbelizenzen über das TAUSI-System.',
    },
    fullDesc: {
      en: 'Avoid disruptions and penalties for trading without a valid local government license. We coordinate sector classification, fire inspection readiness, tax clearance linkage, and municipal permit processing via TAUSI.',
      sw: 'Epuka usumbufu na adhabu za kufanya biashara bila leseni halali ya halmashauri. Tunakusaidia uainishaji wa sekta, maandalizi ya ukaguzi na uwasilishaji kwenye mfumo wa TAUSI.',
      zh: '协助在坦桑尼亚地方行政区（如达累斯萨拉姆各区）顺利申请或年审营业执照，规避合规风险与行政处罚。',
      fr: 'Évitez les amendes pour défaut de licence. Nous préparons et soumettons votre dossier sur TAUSI.',
      de: 'Gewerbegenehmigungen für Daressalam und ganz Tansania fristgerecht über TAUSI beantragen.',
    },
    icon: 'ShieldCheck',
    estimatedTime: '2 - 5 Business Days',
    popular: true,
    active: true,
    requirements: {
      en: ['BRELA Certificate of Registration / Incorporation', 'TRA Business Tax Identification Number (TIN)', 'Tax Clearance Certificate', 'Premises Lease Agreement or Title Deed'],
      sw: ['Cheti cha Usajili cha BRELA', 'TIN ya Biashara ya TRA', 'Cheti cha Uthibitisho wa Kodi (Tax Clearance)', 'Mkataba wa pango la ofisi/fremu'],
      zh: ['BRELA 公司注册证书或商号登记证明', '企业 TRA 税务识别号 (TIN)', '税务合规完税证明 (Tax Clearance)', '营业场地租赁合同或产权文件'],
      fr: ['Certificat d’enregistrement BRELA', 'Numéro TIN de l’entreprise', 'Attestation de régularité fiscale', 'Bail commercial'],
      de: ['BRELA Registrierungsurkunde', 'Firmen-TIN der TRA', 'Steuerliche Unbedenklichkeitsbescheinigung', 'Mietvertrag der Geschäftsräume'],
    },
  },

  // 5. BRELA Business & Company Registration
  {
    id: 'srv-brela-reg',
    category: 'government',
    code: 'brela_reg',
    name: {
      en: 'BRELA Company & Business Registration',
      sw: 'Usajili wa Majina ya Biashara & Makampuni BRELA',
      zh: 'BRELA 坦桑尼亚企业注册局公司与商号登记',
      fr: 'Enregistrement de Société BRELA (ORS)',
      de: 'BRELA Unternehmensgründung & Firmenregister',
    },
    shortDesc: {
      en: 'Sole proprietorship, partnership, limited company (Ltd) incorporation, name searches, and annual returns.',
      sw: 'Usajili wa biashara binafsi, ubia, kampuni ya dhima yenye kikomo (Ltd), utafutaji wa majina na marejesho ya mwaka.',
      zh: '独资商号、合伙企业及有限责任公司（LLC/Ltd）全流程设立，含核名、章程起草及年报申报。',
      fr: 'Création d’entreprise individuelle, SARL/Société anonyme et dépôt annuel sur BRELA ORS.',
      de: 'Gründung von Einzelunternehmen, Partnerschaften und Limited-Gesellschaften im tansanischen Handelsregister.',
    },
    fullDesc: {
      en: 'Turn your entrepreneurial dream into a recognized legal entity. We draft Memorandum & Articles of Association (MEMARTS), reserve approved company names, submit director documentation, and secure official BRELA certificates.',
      sw: 'Fanya wazo lako la kibiashara liwe taasisi ya kisheria. Tunatayarisha Katiba ya Kampuni (MEMARTS), kuhifadhi majina ya biashara, kusajili wakurugenzi na kupata cheti rasmi kutoka BRELA.',
      zh: '全套起草公司章程（MEMARTS）、预留核准公司名称、登记董事股东信息，并通过 BRELA ORS 电子政务系统获取官方正规营业注册执照。',
      fr: 'Formalisez votre activité avec la rédaction des statuts (MEMARTS) et l’immatriculation complète au registre BRELA.',
      de: 'Rechtssichere Gründung nach tansanischem Gesellschaftsrecht inklusive Satzungserstellung und BRELA-Urkunde.',
    },
    icon: 'Building2',
    estimatedTime: '3 - 7 Business Days',
    popular: true,
    active: true,
    requirements: {
      en: ['3 preferred business or company names', 'Director(s) and shareholder(s) NIDA / Passports', 'Physical office address & contact details', 'Core business objectives and sector details'],
      sw: ['Majina 3 unayopendekeza kwa ajili ya biashara', 'Vitambulisho vya wakurugenzi na wanahisa (NIDA / Pasipoti)', 'Anwani ya ofisi na mawasiliano', 'Shughuli kuu za kibiashara'],
      zh: ['拟定 3 个公司备选英文名称', '董事及股东身份证明（NIDA身份证或外国护照原件扫描件）', '公司注册办公地址与联络信息', '拟经营范围及主营业务描述'],
      fr: ['3 propositions de dénominations', 'Pièces d’identité des administrateurs et actionnaires', 'Adresse du siège social', 'Objet social et activités prévues'],
      de: ['3 Wunsch-Firmennamen', 'Ausweise der Geschäftsführer und Gesellschafter', 'Anschrift des Firmensitzes', 'Beschreibung des Geschäftszwecks'],
    },
  },

  // 6. NeST Government Tenders
  {
    id: 'srv-nest-tender',
    category: 'government',
    code: 'nest_tender',
    name: {
      en: 'NeST Government Tender Portal Services',
      sw: 'Huduma za Zabuni za Serikali Kupitia NeST',
      zh: 'NeST 坦桑尼亚国家电子政府采购与投标协助',
      fr: 'Portail des Marchés Publics NeST',
      de: 'NeST Staatliche Ausschreibungen & E-Procurement',
    },
    shortDesc: {
      en: 'Supplier vendor registration, tender bidding assistance, compliance audit, and document packaging on NeST.',
      sw: 'Usajili wa wazabuni, msaada wa kuomba zabuni, ukaguzi wa nyaraka na uwasilishaji wa zabuni kwenye NeST.',
      zh: '政府供应商资质入库、标书编制审查、联合体资格及在 NeST 系统内一键投标准备。',
      fr: 'Enregistrement fournisseur, préparation et soumission d’appels d’offres sur le système NeST.',
      de: 'Registrierung als staatlicher Zulieferer und Einreichung von Ausschreibungsunterlagen auf NeST.',
    },
    fullDesc: {
      en: 'Compete for lucrative government contracts with confidence. We help businesses register as authorized suppliers on the National e-Procurement System of Tanzania (NeST), assemble compliant bidding packs, and navigate e-tendering portals.',
      sw: 'Shiriki katika zabuni za serikali kwa ujasiri. Tunakusaidia kusajili kampuni yako kama msambazaji kwenye mfumo wa NeST, kuandaa nyaraka za zabuni na kuwasilisha mtandaoni.',
      zh: '协助中坦企业入驻坦桑尼亚国家电子政府采购门户（NeST），规范整理资质包、保函及标书文件，提升中标合规率。',
      fr: 'Accédez aux marchés publics tanzaniens grâce à notre accompagnement spécialisé sur le portail NeST.',
      de: 'Unterstützung bei der Zulassung und Angebotserstellung für staatliche Vergabeverfahren in Tansania.',
    },
    icon: 'Briefcase',
    estimatedTime: '3 - 5 Business Days',
    popular: false,
    active: true,
    requirements: {
      en: ['Valid Tax Clearance & Business Licence', 'BRELA Company Certificate & Annual Return receipt', 'TIN Certificate & VAT registration (if applicable)', 'Bank reference letter & Audited financial accounts'],
      sw: ['Leseni ya biashara na Tax Clearance halali', 'Cheti cha BRELA na risiti ya marejesho ya mwaka', 'Cheti cha TIN na cheti cha VAT (kama kinatumika)', 'Barua ya benki na hesabu za fedha zilizokaguliwa'],
      zh: ['有效营业执照及完税证明 (Tax Clearance)', 'BRELA 公司注册文件及最新年度报备收据', 'TIN 及增值税 (VAT) 证明', '银行资信证明及近年审计报告'],
      fr: ['Attestation fiscale & licence à jour', 'Extrait d’enregistrement BRELA', 'Certificat TIN et TVA', 'Attestation bancaire & états financiers'],
      de: ['Gültige Steuerbescheinigung & Gewerbelizenz', 'BRELA Firmenunterlagen', 'TIN & ggf. Mehrwertsteuerbescheinigung', 'Bankbestätigung & Jahresabschluss'],
    },
  },

  // 7. Online Job Applications
  {
    id: 'srv-app-jobs',
    category: 'applications',
    code: 'online_jobs',
    name: {
      en: 'Online Job & PSRS Applications',
      sw: 'Maombi ya Ajira Mtandaoni & PSRS (Utumishi)',
      zh: '求职申请与公务员招聘门户申报 (PSRS/Ajira Portal)',
      fr: 'Candidatures en Ligne & Portail PSRS',
      de: 'Online-Bewerbungen & Öffentlicher Dienst (PSRS)',
    },
    shortDesc: {
      en: 'Professional account setup, CV formatting, credential uploads, and job application submissions on Ajira Portal and private firms.',
      sw: 'Kuunda akaunti ya Utumishi (PSRS), kurekebisha CV, kupakia vyeti na kutuma maombi ya ajira kwa ufasaha.',
      zh: '协助坦桑尼亚公共服务委员会（Utumishi）求职系统账号设立、简历精修、学历证明上传及合规投递。',
      fr: 'Optimisation de CV, profil sur le portail Ajira / PSRS et soumission de candidatures.',
      de: 'Erstellung und Einreichung von Bewerbungsunterlagen auf dem tanzanischen Stellenportal PSRS.',
    },
    fullDesc: {
      en: 'Stand out from thousands of applicants. We ensure your CV, NIDA details, academic transcripts, and professional certificates are meticulously mapped to job specifications without technical rejections.',
      sw: 'Kuwa mbele ya maelfu ya waombaji. Tunahakikisha CV yako, namba ya NIDA na vyeti vyako vinapakiwa kwa usahihi kulingana na vigezo vya kazi bila kukataliwa na mfumo.',
      zh: '确保您的申请材料符合坦桑尼亚政府部门及外企人力资源审查规范，杜绝因格式或文件不符导致的系统自动淘汰。',
      fr: 'Maximisez vos chances d’embauche avec des dossiers impeccables et conformes aux exigences du portail gouvernemental.',
      de: 'Fehlerfreie Einreichung Ihrer Qualifikationsnachweise und Lebensläufe für tansanische Stellenausschreibungen.',
    },
    icon: 'GraduationCap',
    estimatedTime: '24 - 48 Hours',
    popular: true,
    active: true,
    requirements: {
      en: ['Up-to-date Curriculum Vitae (CV) in Word or PDF', 'Academic certificates (Form IV, VI, Degree/Diploma)', 'NIDA number and birth certificate', 'Referees’ contact numbers & cover letter details'],
      sw: ['Wasifu wa kazi (CV) ya sasa', 'Vyeti vya kitaaluma (Kidato cha IV, VI, Diploma/Shahada)', 'Namba ya NIDA na cheti cha kuzaliwa', 'Mawasiliano ya wadhamini na maelezo ya barua ya maombi'],
      zh: ['最新电子简历（Word/PDF格式）', '相关毕业证书与学位证明扫描件', 'NIDA 身份证明及出生证', '推荐人联络方式及自荐信要点'],
      fr: ['CV actualisé', 'Diplômes académiques et attestations', 'Numéro NIDA et certificat de naissance', 'Coordonnées des référents et lettre de motivation'],
      de: ['Aktueller Lebenslauf', 'Zeugnisse und Bildungsnachweise', 'NIDA-Nummer und Geburtsurkunde', 'Referenzkontakte und Anschreiben'],
    },
  },

  // 8. College & University Admissions
  {
    id: 'srv-app-college',
    category: 'applications',
    code: 'online_college',
    name: {
      en: 'College & University Admissions (TCU / NACTE)',
      sw: 'Maombi ya Vyuo Vikuu na Vyuo vya Kati (TCU/NACTE)',
      zh: '坦桑尼亚高校与职业学院在线志愿填报 (TCU / NACTE)',
      fr: 'Inscriptions Universitaires & Instituts (TCU/NACTE)',
      de: 'Hochschul- & College-Zulassungen (TCU/NACTE)',
    },
    shortDesc: {
      en: 'Assistance with university selection, NACTE diploma applications, HESLB student loan portal registration.',
      sw: 'Msaada wa kuchagua vyuo, maombi ya ngazi ya stashahada (NACTE), na maombi ya mkopo wa elimu ya juu (HESLB).',
      zh: '协助高等教育委员会（TCU）、技术培训局（NACTE）院校选报及 HESLB 助学贷款在线申报。',
      fr: 'Accompagnement pour l’admission en université et demandes de bourses étudiantes HESLB.',
      de: 'Unterstützung bei Studienplatzbewerbungen und Studienkreditanträgen (HESLB) in Tansania.',
    },
    fullDesc: {
      en: 'Guidance through college admission windows. We evaluate your cluster points, configure admissions profiles, submit prioritized choices, and monitor confirmation lists.',
      sw: 'Mwongozo katika madirisha ya udahili. Tunakagua alama zako, kusanidi mfumo wa maombi, kuwasilisha machaguo yako na kufuatilia majina yaliyopokelewa.',
      zh: '精准分析高考及预科成绩组合，协助报考达累斯萨拉姆大学（UDSM）等知名院校，全程跟进录取名单公布。',
      fr: 'Facilitez votre admission dans les facultés et universités de premier plan avec nos conseils d’experts.',
      de: 'Gezielte Studienplatzvergabe und fristgerechte Einreichung für tansanische Hochschulen.',
    },
    icon: 'BookOpen',
    estimatedTime: '24 - 48 Hours',
    popular: false,
    active: true,
    requirements: {
      en: ['Form IV (CSEE) and Form VI (ACSEE) index numbers', 'Birth certificate copy', 'Active applicant phone and email', 'Preferred courses and institutions list'],
      sw: ['Namba za mtihani za Kidato cha IV na VI', 'Nakala ya cheti cha kuzaliwa', 'Simu na barua pepe ya mwombaji', 'Orodha ya kozi na vyuo unavyopendelea'],
      zh: ['中学四年级 (CSEE) 及六年级 (ACSEE) 考号', '出生证扫描件', '考生本人常用手机号与邮箱', '意向报考专业及目标高校意愿排序'],
      fr: ['Numéros d’examen Form IV et VI', 'Copie de l’acte de naissance', 'Coordonnées de l’étudiant', 'Liste des filières souhaitées'],
      de: ['Prüfungsnummern der Sekundarstufe', 'Geburtsurkunde', 'Kontaktdaten des Bewerbers', 'Liste der Wunschstudiengänge'],
    },
  },

  // 9. Website Design
  {
    id: 'srv-web-design',
    category: 'web_digital',
    code: 'web_design',
    name: {
      en: 'Professional Website Design & Development',
      sw: 'Ubunifu na Ujenzi wa Tovuti za Kisasa',
      zh: '高端企业网站定制开发与移动端适配',
      fr: 'Création de Sites Internet Professionnels',
      de: 'Professionelles Webdesign & Weblösungen',
    },
    shortDesc: {
      en: 'Custom websites for businesses, companies, NGOs, e-commerce stores, and personal brands with modern mobile responsiveness.',
      sw: 'Tovuti za kisasa kwa biashara, kampuni, mashirika (NGO), maduka ya mtandaoni na chapa binafsi zinazofaa simu.',
      zh: '为企业、外贸商户、NGO机构及个人定制高水准响应式品牌官网、外贸多语言站点与电商平台。',
      fr: 'Sites web sur mesure pour entreprises, ONG, boutiques e-commerce et marques personnelles.',
      de: 'Individuelle Webseiten für Unternehmen, NGOs und Online-Shops mit modernstem Responsive Design.',
    },
    fullDesc: {
      en: 'Empower your Tanzanian and international market presence with blazing-fast, secure, and SEO-optimized websites built by E27. From corporate portals to integrated payment solutions (M-Pesa / Tigo Pesa / Airtel Money / Cards).',
      sw: 'Inua biashara yako kwa tovuti yenye kasi ya juu, usalama na inayopatikana kirahisi kwenye Google. Inajumuisha mifumo ya malipo ya simu kama M-Pesa na kadi.',
      zh: '由 E27 资深工程师打造兼具国际设计审美与本地移动网速优化的现代化品牌网站，支持手机极速访问、谷歌 SEO 友好架构及非洲主流移动钱包集成。',
      fr: 'Donnez une visibilité maximale à votre entreprise avec des sites ultra-rapides, élégants et optimisés pour le référencement.',
      de: 'Verleihen Sie Ihrem Unternehmen eine starke digitale Identität mit schnellen, sicheren und suchmaschinenoptimierten Webseiten.',
    },
    icon: 'Laptop',
    estimatedTime: '5 - 14 Business Days',
    popular: true,
    active: true,
    requirements: {
      en: ['Company logo and branding assets (colors, fonts)', 'Text content for pages (About, Services, Team)', 'High-resolution images or photo gallery', 'Desired website features (e.g. contact form, chat, store)'],
      sw: ['Nembo ya kampuni (Logo) na rangi za chapa', 'Maelezo ya kurasa za tovuti (Kuhusu, Huduma)', 'Picha zenye muonekano mzuri', 'Mahitaji maalum ya tovuti (mf. fomu, duka la mtandaoni)'],
      zh: ['公司 LOGO 矢量源文件及品牌主色调', '网站各页面文案草案（关于我们、核心业务等）', '高清晰度企业或产品配图', '所需核心功能需求列表（如询盘表单、在线客服、商城结算等）'],
      fr: ['Logo et charte graphique', 'Textes des pages clés', 'Photos haute définition', 'Spécifications des fonctionnalités requises'],
      de: ['Firmenlogo und CI-Vorgaben', 'Inhaltstexte für Hauptseiten', 'Hochauflösendes Bildmaterial', 'Gewünschte Funktionsanforderungen'],
    },
  },

  // 10. Website Hosting & Maintenance
  {
    id: 'srv-web-hosting',
    category: 'web_digital',
    code: 'web_hosting',
    name: {
      en: 'Fast Cloud Web Hosting & Maintenance',
      sw: 'Huduma za Hosting ya Tovuti & Utunzaji',
      zh: '极速云主机服务器托管与网站运维',
      fr: 'Hébergement Web Haute Performance & Maintenance',
      de: 'Highspeed Cloud-Webhosting & Wartungsservice',
    },
    shortDesc: {
      en: 'Ultra-reliable 99.9% uptime SSD cloud hosting, cPanel management, automated backups, and 24/7 security updates.',
      sw: 'Hosting ya kuaminika kwa 99.9% kwenye SSD, mfumo wa cPanel, nakala rudufu (backups) na ulinzi wa kila siku.',
      zh: '提供 99.9% 高可用 SSD 极速主机、cPanel 管理、自动每日备份、免费 SSL 证书及全天候防攻击监测。',
      fr: 'Hébergement cloud SSD haute disponibilité avec cPanel, sauvegardes automatiques et certificats SSL gratuits.',
      de: 'Ausfallsicheres SSD-Cloudhosting mit 99,9 % Uptime-Garantie, cPanel, Backups und SSL-Verschlüsselung.',
    },
    fullDesc: {
      en: 'Keep your web assets protected, swift, and updated. We manage server configurations, DNS routing, database performance tuning, malware scanning, and content updates.',
      sw: 'Weka tovuti yako salama na yenye kasi. Tunahusika na usanidi wa seva, kuboresha database, ukaguzi wa virusi na kusasisha taarifa mara kwa mara.',
      zh: '让您的企业网站常年稳定畅行。E27 提供服务器运维、域名 DNS 智能解析、防恶意软件注入、数据库调优及定期技术补丁升级。',
      fr: 'Une solution clé en main pour un site toujours accessible, sécurisé et bénéficiant des dernières mises à jour.',
      de: 'Sorgenfreier Rundum-Service für Ihre Webpräsenz inklusive Performance-Optimierung und Sicherheits-Monitoring.',
    },
    icon: 'Server',
    estimatedTime: 'Instant Setup (Within 2 Hours)',
    popular: true,
    active: true,
    requirements: {
      en: ['Current domain name or desired new domain', 'Estimated storage requirement (GB)', 'Number of business email accounts needed', 'Backup & CMS preference (e.g. WordPress, Custom)'],
      sw: ['Jina la kikoa unachotumia au unachotaka', 'Kiwango cha nafasi unachohitaji (GB)', 'Idadi ya barua pepe za biashara', 'Mfumo unaotumia (mf. WordPress au mfumo maalum)'],
      zh: ['现有域名或计划绑定的新域名', '预计网站所需存储容量（GB）', '所需企业专属邮箱账户数量', '网站采用的内容管理系统（如 WordPress 等）'],
      fr: ['Nom de domaine existant ou souhaité', 'Espace de stockage estimé', 'Nombre d’adresses emails requises', 'CMS utilisé'],
      de: ['Bestehende oder gewünschte Domain', 'Geschätzter Speicherbedarf', 'Anzahl geschäftlicher E-Mail-Postfächer', 'Genutztes CMS-System'],
    },
  },

  // 11. Tanzania Local Domains (.co.tz, .or.tz, .tz)
  {
    id: 'srv-tz-domains',
    category: 'web_digital',
    code: 'tz_domains',
    name: {
      en: 'Tanzania Local Domains (.co.tz, .or.tz, .tz)',
      sw: 'Usajili wa Majina ya Vikoa vya Tanzania (.co.tz)',
      zh: '坦桑尼亚本土顶级域名注册 (.co.tz / .or.tz / .ac.tz / .tz)',
      fr: 'Enregistrement de Noms de Domaine Tanzaniens (.co.tz)',
      de: 'Tansania Länderdomains (.co.tz, .or.tz, .tz)',
    },
    shortDesc: {
      en: 'Official .co.tz, .or.tz, .ac.tz, and .tz domain registration with tzNIC certified registry standards.',
      sw: 'Usajili rasmi wa majina ya vikoa ya .co.tz, .or.tz, .ac.tz, na .tz kulingana na viwango vya tzNIC.',
      zh: '协助通过 tzNIC 注册专属坦桑尼亚商业与机构后缀域名，树立本地化权威信誉。',
      fr: 'Enregistrez votre extension tanzanienne officielle pour renforcer votre ancrage local.',
      de: 'Offizielle Registrierung tansanischer Länderendungen über tzNIC-zertifizierte Standards.',
    },
    fullDesc: {
      en: 'Build authentic local trust with customers in Tanzania. A .co.tz or .tz domain boosts your local search ranking on Google Tanzania and establishes your organization’s national presence.',
      sw: 'Jenga imani na wateja wa ndani ya Tanzania. Kikoa cha .co.tz kinaongeza uwezekano wa biashara yako kuonekana zaidi kwenye Google Tanzania na kutambulika kisheria.',
      zh: '在坦桑尼亚商业竞争中建立本土地缘信任感。.co.tz 域名能极大增强网站在坦桑尼亚 Google 本地搜索结果中的权重，是正规商业拓展的标志。',
      fr: 'Un nom de domaine en .co.tz valorise votre entreprise auprès de vos clients et partenaires tanzaniens.',
      de: 'Etablieren Sie lokale Glaubwürdigkeit in Tansania mit einer offiziellen .co.tz oder .tz Internetadresse.',
    },
    icon: 'Globe',
    estimatedTime: '2 - 24 Hours',
    popular: true,
    active: true,
    requirements: {
      en: ['Preferred domain name spelling', 'Organization or individual registrant name', 'Registrant contact email & phone number', 'Desired registration duration (1 - 5 Years)'],
      sw: ['Jina la kikoa unalotaka', 'Jina la mmiliki wa kikoa au kampuni', 'Email na namba ya simu ya mmiliki', 'Muda wa usajili (Mwaka 1 - 5)'],
      zh: ['拟申请的域名拼写与备选方案', '域名持有人个人姓名或注册企业法定全称', '管理员联络邮箱及手机号', '预付注册年限（1 至 5 年）'],
      fr: ['Orthographe exacte du nom de domaine', 'Nom du titulaire ou de la société', 'Email et téléphone du contact', 'Durée d’enregistrement'],
      de: ['Wunschdomain-Schreibweise', 'Name des Inhabers oder Unternehmens', 'Kontaktdaten für das Whois-Register', 'Registrierungszeitraum (1-5 Jahre)'],
    },
  },

  // 12. Business Email & Google Workspace
  {
    id: 'srv-biz-email',
    category: 'web_digital',
    code: 'biz_email',
    name: {
      en: 'Professional Business Email Setup',
      sw: 'Barua Pepe Rasmi za Biashara (Business Email)',
      zh: '企业专属商务邮箱与办公协同系统配置',
      fr: 'Adresses Emails Professionnelles Personnalisées',
      de: 'Geschäftliche E-Mail-Adressen & Unternehmenspostfächer',
    },
    shortDesc: {
      en: 'Brand your communication with @yourcompany.co.tz, Google Workspace, Outlook 365, and anti-spam protocols.',
      sw: 'Fanya mawasiliano yako yawe ya kitaalamu na barua pepe ya @kampuniyako.co.tz, Google Workspace na ulinzi dhidi ya spam.',
      zh: '配置带企业域名的专属电子邮箱（如 info@yourcompany.co.tz），支持手机客户端同步及企业级垃圾邮件防护。',
      fr: 'Professionnalisez vos échanges avec des adresses @votre-entreprise.co.tz et suite bureautique.',
      de: 'Etablieren Sie seriöse Kundenkommunikation mit eigenen E-Mail-Adressen unter Ihrer Wunschdomain.',
    },
    fullDesc: {
      en: 'Stop sending client quotes and contracts from generic gmail.com or yahoo.com accounts. We configure DKIM, SPF, and DMARC DNS records to ensure 100% email deliverability into client inboxes.',
      sw: 'Acha kutuma mikataba na bei kwa wateja kwa kutumia akaunti za bure kama gmail. Tunatengeneza barua pepe za kisasa zenye ulinzi wa hali ya juu wa DNS.',
      zh: '告别使用个人免费邮箱向客户报价的非专业形象。E27 全面配置 SPF、DKIM、DMARC 邮件反垃圾权威记录，确保邮件直达客户收件箱不进垃圾箱。',
      fr: 'Gagnez en crédibilité auprès de vos clients avec des messageries d’entreprise sécurisées.',
      de: 'Sichere Unternehmenskommunikation mit modernsten DNS-Authentifizierungsmethoden gegen Phishing und Spam.',
    },
    icon: 'Mail',
    estimatedTime: '24 Hours',
    popular: false,
    active: true,
    requirements: {
      en: ['Your domain name (or we can register one)', 'List of desired email addresses (e.g. info@, sales@, ceo@)', 'Current mail provider (if migrating existing emails)'],
      sw: ['Jina la kikoa chako (au tunaweza kukusajilia)', 'Orodha ya majina ya barua pepe (mf. info@, sales@)', 'Mfumo unaotumia sasa (kama unahamisha barua pepe za zamani)'],
      zh: ['已持有的公司域名（或委托 E27 同步代办注册）', '需开通的企业邮箱前缀名单（如 info@, sales@, gm@ 等）', '原有邮件系统提供商信息（如涉及旧邮件历史迁移）'],
      fr: ['Votre nom de domaine', 'Liste des adresses à créer', 'Prestataire actuel en cas de migration'],
      de: ['Ihre Domain', 'Liste der gewünschten Postfach-Namen', 'Bisheriger Anbieter bei Migration'],
    },
  },

  // 13. SEO & Google Business Profile Setup
  {
    id: 'srv-seo-google',
    category: 'web_digital',
    code: 'seo_google',
    name: {
      en: 'Local SEO & Google Business Profile Setup',
      sw: 'Usanidi wa Google Business & Kuonekana kwenye Google',
      zh: 'Google 本地商家地图入驻与全网 SEO 优化',
      fr: 'Référencement SEO & Fiche Google Business',
      de: 'Lokales SEO & Google Unternehmensprofil-Optimierung',
    },
    shortDesc: {
      en: 'Get your shop or office listed on Google Maps, Dar es Salaam local searches, and first-page organic rankings.',
      sw: 'Weka ofisi au duka lako lionekane kwenye Ramani ya Google (Google Maps) na kurasa za kwanza za utafutaji.',
      zh: '协助在谷歌地图（Google Maps）官方认证实体商户门店，优化坦桑尼亚本地关键词搜索首屏展现。',
      fr: 'Faites figurer votre entreprise sur Google Maps et en première page des recherches locales.',
      de: 'Werden Sie auf Google Maps und bei lokalen Suchanfragen in Daressalam sofort von Neukunden gefunden.',
    },
    fullDesc: {
      en: 'When potential clients search for your services in Kigamboni, Ilala, Kinondoni, or across Tanzania, ensure your business appears with verified phone numbers, reviews, operating hours, and turn-by-turn navigation.',
      sw: 'Wateja wanapotafuta huduma zako Kigamboni au popote Tanzania, hakikisha biashara yako inajitokeza ikiwa na namba ya simu, ramani, saa za kazi na maoni mazuri.',
      zh: '精准触达达累斯萨拉姆及坦桑尼亚各大省份的意向客户，完善营业时间、服务清单、认证电话与高质量真实客户好评沉淀。',
      fr: 'Générez des appels et des visites physiques en optimisant votre présence géographique sur Google.',
      de: 'Steigern Sie Ihre Kundenfrequenz durch vollständige Profileinträge mit Öffnungszeiten und Rezensionen.',
    },
    icon: 'Search',
    estimatedTime: '3 - 5 Business Days',
    popular: false,
    active: true,
    requirements: {
      en: ['Accurate business location in Dar es Salaam or Tanzania', 'Business phone number & official hours', 'Photos of physical office, storefront, or products', 'List of top keywords or services offered'],
      sw: ['Eneo halisi la biashara Dar es Salaam au Tanzania', 'Namba ya simu ya biashara na saa za kazi', 'Picha za ofisi, fremu au bidhaa zako', 'Orodha ya huduma kuu unazotoa'],
      zh: ['实际经营地理位置门牌号及地图坐标', '官方联络电话及标准对外营业时间', '公司招牌、办公前台或实体门店实景照片', '重点推广的核心产品或服务关键词'],
      fr: ['Adresse physique exacte en Tanzanie', 'Téléphone et horaires', 'Photos des locaux ou de la vitrine', 'Mots-clés cibles'],
      de: ['Genaue Geschäftsadresse in Tansania', 'Telefonnummer und Öffnungszeiten', 'Fotos der Geschäftsräume', 'Wichtigste Suchbegriffe'],
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
  phone: '+255 750 272 727',
  whatsApp: '+255 750 272 727',
  email: 'info@e27.co.tz',
  supportEmail: 'support@e27.co.tz',
  location: 'Kigamboni, Dar es Salaam, Tanzania',
  officeHours: 'Monday - Saturday: 8:00 AM - 6:00 PM EAT | Sunday: Closed',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.49202517855!2d39.3000!3d-6.8400!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c490a618e9507%3A0xb36ef20728c77e2e!2sKigamboni%2C%20Dar%20es%20Salaam%2C%20Tanzania!5e0!3m2!1sen!2stz!4v1700000000000!5m2!1sen!2stz',
  socials: {
    facebook: 'https://facebook.com/e27tanzania',
    instagram: 'https://instagram.com/e27_digital',
    twitter: 'https://x.com/e27tanzania',
    linkedin: 'https://linkedin.com/company/e27-digital-services',
    whatsappCommunity: 'https://chat.whatsapp.com/E27TanzaniaOfficial',
  },
  disclaimer: 'E27 is an independent private digital service provider and is not affiliated with, sponsored by, or operated by the Government of Tanzania. All official certificates and permits are processed and issued solely by respective state authorities.',
};

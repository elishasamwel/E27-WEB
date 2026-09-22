export type Language = 'en' | 'sw' | 'zh' | 'fr' | 'de';

export type ServiceCategory = 
  | 'government'
  | 'applications'
  | 'web_digital';

export interface RequirementGroup {
  title?: string;
  items: string[];
}

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  code: string; // e.g., 'rita_birth', 'tra_tin', 'brela_company'
  name: Record<Language, string>;
  shortDesc: Record<Language, string>;
  fullDesc: Record<Language, string>;
  icon: string; // lucide icon identifier
  estimatedTime: string;
  requirements: Record<Language, string[]>;
  requirementGroups?: Record<Language, RequirementGroup[]>;
  popular?: boolean;
  active: boolean;
}

export type ApplicationStatus = 
  | 'New'
  | 'Received'
  | 'Under Review'
  | 'In Progress'
  | 'Waiting for Customer'
  | 'Completed'
  | 'Rejected'
  | 'Cancelled';

export interface ApplicationDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  dataUrl?: string; // base64 or storage url
  uploadedAt: string;
}

export interface ApplicationHistoryLog {
  id: string;
  timestamp: string;
  status: ApplicationStatus;
  note: string;
  actor: 'system' | 'customer' | 'admin';
}

export interface ServiceApplication {
  id: string; // Reference e.g. E27-2026-9812
  serviceId: string;
  serviceCode: string;
  serviceName: string;
  customerName: string;
  customerPhone: string;
  customerWhatsApp: string;
  customerEmail: string;
  customerAddress: string;
  submittedAt: string;
  updatedAt: string;
  status: ApplicationStatus;
  formData: Record<string, any>;
  details?: Record<string, any>;
  documents: ApplicationDocument[];
  adminNotes: string;
  history: ApplicationHistoryLog[];
}

export interface CustomerProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  whatsApp: string;
  address: string;
  createdAt: string;
  totalApplications: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  content: Record<Language, string>;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  featured?: boolean;
  views: number;
  tags?: string[];
  published?: boolean;
}

export type CommentStatus = 'pending' | 'approved' | 'rejected' | 'hidden';

export interface BlogComment {
  id: string;
  postId: string;
  parentId?: string | null; // for replies
  authorName: string;
  authorEmail: string;
  content: string;
  createdAt: string;
  status: CommentStatus;
  likes: number;
  replies?: BlogComment[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt: string;
  read: boolean;
  status: 'new' | 'replied' | 'archived';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'application' | 'comment' | 'message' | 'system';
  timestamp: string;
  read: boolean;
  linkId?: string;
}

export interface WebsiteSettings {
  brandName: string;
  tagline: string;
  phone: string;
  whatsApp: string;
  email: string;
  supportEmail: string;
  location: string;
  officeHours: string;
  mapEmbedUrl: string;
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    whatsappCommunity: string;
  };
  disclaimer: string;
}

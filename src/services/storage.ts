import {
  ServiceItem,
  BlogPost,
  BlogComment,
  ServiceApplication,
  CustomerProfile,
  ContactMessage,
  NotificationItem,
  WebsiteSettings,
  ApplicationStatus,
  CommentStatus,
} from '../types';
import {
  initialServices,
  initialBlogPosts,
  initialComments,
  initialApplications,
  initialCustomers,
  initialSettings,
} from '../data/initialData';

const STORAGE_KEYS = {
  SERVICES: 'e27_services',
  BLOG_POSTS: 'e27_blog_posts',
  COMMENTS: 'e27_comments',
  APPLICATIONS: 'e27_applications',
  CUSTOMERS: 'e27_customers',
  MESSAGES: 'e27_messages',
  NOTIFICATIONS: 'e27_notifications',
  SETTINGS: 'e27_settings',
  ADMIN_AUTH: 'e27_admin_auth',
  THEME: 'e27_theme',
  LANG: 'e27_lang',
};

// Safe JSON parser
function safeParse<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (err) {
    console.error(`Failed to parse storage item ${key}`, err);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('e27_storage_updated', { detail: { key } }));
  } catch (err) {
    console.error(`Failed to save to storage ${key}`, err);
  }
}

// Ensure initial seed
export function initializeStorage(): void {
  const CURRENT_DATA_VERSION = 'v4_kijichi_no_social_links';
  if (localStorage.getItem('e27_data_ver') !== CURRENT_DATA_VERSION) {
    safeSet(STORAGE_KEYS.SERVICES, initialServices);
    safeSet(STORAGE_KEYS.SETTINGS, initialSettings);
    localStorage.setItem('e27_data_ver', CURRENT_DATA_VERSION);
  } else {
    if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
      safeSet(STORAGE_KEYS.SERVICES, initialServices);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      safeSet(STORAGE_KEYS.SETTINGS, initialSettings);
    }
  }
  if (!localStorage.getItem(STORAGE_KEYS.BLOG_POSTS)) {
    safeSet(STORAGE_KEYS.BLOG_POSTS, initialBlogPosts);
  }
  if (!localStorage.getItem(STORAGE_KEYS.COMMENTS)) {
    safeSet(STORAGE_KEYS.COMMENTS, initialComments);
  }
  if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
    safeSet(STORAGE_KEYS.APPLICATIONS, initialApplications);
  }
  if (!localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) {
    safeSet(STORAGE_KEYS.CUSTOMERS, initialCustomers);
  }
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    safeSet(STORAGE_KEYS.SETTINGS, initialSettings);
  }
  if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
    const sampleMsg: ContactMessage[] = [
      {
        id: 'msg-1',
        name: 'Baraka Joseph',
        email: 'baraka@gmail.com',
        phone: '+255 718 112 233',
        subject: 'Inquiry about BRELA Company Registration cost',
        message: 'Hello E27 team, I want to register a company with 2 directors. Can you explain the full process and fees for Kigamboni branch?',
        submittedAt: '2026-09-06T14:10:00Z',
        read: false,
        status: 'new',
      },
    ];
    safeSet(STORAGE_KEYS.MESSAGES, sampleMsg);
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    const initialNotifs: NotificationItem[] = [
      {
        id: 'notif-1',
        title: 'New Service Application',
        message: 'New application for Website Design received from Kigamboni Marine Safari Tours.',
        type: 'application',
        timestamp: '2026-09-06T15:30:00Z',
        read: false,
        linkId: 'E27-2026-1044',
      },
      {
        id: 'notif-2',
        title: 'Blog Comment Awaiting Moderation',
        message: 'David Chen left a comment on "BRELA Company Registration" awaiting review.',
        type: 'comment',
        timestamp: '2026-09-02T09:12:00Z',
        read: false,
        linkId: 'comm-103',
      },
    ];
    safeSet(STORAGE_KEYS.NOTIFICATIONS, initialNotifs);
  }
}

// ----------------- SERVICES -----------------
export function getServices(): ServiceItem[] {
  const list = safeParse<ServiceItem[]>(STORAGE_KEYS.SERVICES, initialServices);
  return (list || []).map((s) => ({
    ...s,
    requirements: s.requirements || { en: [], sw: [], zh: [], fr: [], de: [] },
  }));
}

export function saveService(service: ServiceItem): void {
  const list = getServices();
  const index = list.findIndex((s) => s.id === service.id);
  if (index >= 0) {
    list[index] = service;
  } else {
    list.unshift(service);
  }
  safeSet(STORAGE_KEYS.SERVICES, list);
}

export function deleteService(serviceId: string): void {
  const list = getServices().filter((s) => s.id !== serviceId);
  safeSet(STORAGE_KEYS.SERVICES, list);
}

// ----------------- APPLICATIONS -----------------
export function getApplications(): ServiceApplication[] {
  const list = safeParse<ServiceApplication[]>(STORAGE_KEYS.APPLICATIONS, initialApplications);
  return (list || []).map((app) => ({
    ...app,
    documents: app.documents || [],
    formData: app.formData || app.details || {},
    details: app.details || app.formData || {},
  }));
}

export function getApplicationById(refOrId: string): ServiceApplication | undefined {
  const clean = refOrId.trim().toUpperCase();
  const list = getApplications();
  return list.find(
    (app) =>
      app.id.toUpperCase() === clean ||
      app.customerPhone.replace(/\s+/g, '') === clean.replace(/\s+/g, '') ||
      app.customerEmail.toLowerCase() === refOrId.trim().toLowerCase()
  );
}

export function generateApplicationRef(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `E27-2026-${randomNum}`;
}

export function submitApplication(
  service: ServiceItem,
  customerData: {
    fullName: string;
    phone: string;
    whatsApp: string;
    email: string;
    address: string;
  },
  formData: Record<string, any>,
  documents: Array<{ name: string; size: number; type: string; dataUrl?: string }>
): ServiceApplication {
  const list = getApplications();
  const refNumber = generateApplicationRef();
  const now = new Date().toISOString();

  const newApp: ServiceApplication = {
    id: refNumber,
    serviceId: service.id,
    serviceCode: service.code,
    serviceName: service.name.en,
    customerName: customerData.fullName,
    customerPhone: customerData.phone,
    customerWhatsApp: customerData.whatsApp || customerData.phone,
    customerEmail: customerData.email,
    customerAddress: customerData.address,
    submittedAt: now,
    updatedAt: now,
    status: 'New',
    formData: formData || {},
    details: formData || {},
    documents: (documents || []).map((doc, i) => ({
      id: `doc-${Date.now()}-${i}`,
      name: doc.name,
      size: doc.size,
      type: doc.type,
      dataUrl: doc.dataUrl,
      uploadedAt: now,
    })),
    adminNotes: 'Application registered online. Awaiting document validation by E27 processing team.',
    history: [
      {
        id: `h-${Date.now()}`,
        timestamp: now,
        status: 'New',
        note: `Online application submitted by customer for ${service.name.en}.`,
        actor: 'customer',
      },
    ],
  };

  list.unshift(newApp);
  safeSet(STORAGE_KEYS.APPLICATIONS, list);

  // Also update customer directory
  syncCustomer(customerData);

  // Push notification for Admin
  addNotification({
    id: `notif-${Date.now()}`,
    title: 'New Service Application Received',
    message: `${customerData.fullName} submitted a request for ${service.name.en} (Ref: ${refNumber}).`,
    type: 'application',
    timestamp: now,
    read: false,
    linkId: refNumber,
  });

  return newApp;
}

export function updateApplicationStatus(
  appId: string,
  newStatus: ApplicationStatus,
  adminNote?: string
): ServiceApplication | null {
  const list = getApplications();
  const index = list.findIndex((a) => a.id === appId);
  if (index === -1) return null;

  const app = list[index];
  const now = new Date().toISOString();
  app.status = newStatus;
  app.updatedAt = now;
  if (adminNote) {
    app.adminNotes = adminNote;
  }

  app.history.unshift({
    id: `h-${Date.now()}`,
    timestamp: now,
    status: newStatus,
    note: adminNote || `Status updated to ${newStatus} by administrator.`,
    actor: 'admin',
  });

  list[index] = app;
  safeSet(STORAGE_KEYS.APPLICATIONS, list);

  addNotification({
    id: `notif-${Date.now()}`,
    title: `Application ${appId} Status Changed`,
    message: `Application for ${app.customerName} marked as "${newStatus}".`,
    type: 'application',
    timestamp: now,
    read: false,
    linkId: appId,
  });

  return app;
}

// ----------------- CUSTOMERS -----------------
export function getCustomers(): CustomerProfile[] {
  return safeParse<CustomerProfile[]>(STORAGE_KEYS.CUSTOMERS, initialCustomers);
}

function syncCustomer(data: { fullName: string; email: string; phone: string; whatsApp: string; address: string }): void {
  const customers = getCustomers();
  const existingIndex = customers.findIndex(
    (c) => c.email.toLowerCase() === data.email.toLowerCase() || c.phone === data.phone
  );

  if (existingIndex >= 0) {
    customers[existingIndex].totalApplications += 1;
    customers[existingIndex].address = data.address || customers[existingIndex].address;
    customers[existingIndex].whatsApp = data.whatsApp || customers[existingIndex].whatsApp;
  } else {
    customers.unshift({
      id: `cust-${Date.now()}`,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      whatsApp: data.whatsApp || data.phone,
      address: data.address,
      createdAt: new Date().toISOString().split('T')[0],
      totalApplications: 1,
    });
  }
  safeSet(STORAGE_KEYS.CUSTOMERS, customers);
}

// ----------------- BLOG POSTS -----------------
export function getBlogPosts(): BlogPost[] {
  const posts = safeParse<BlogPost[]>(STORAGE_KEYS.BLOG_POSTS, initialBlogPosts);
  return (posts || []).map((p) => ({
    ...p,
    tags: p.tags || [],
    published: p.published !== false,
  }));
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug || p.id === slug);
}

export function saveBlogPost(post: BlogPost): void {
  const posts = getBlogPosts();
  const index = posts.findIndex((p) => p.id === post.id);
  if (index >= 0) {
    posts[index] = post;
  } else {
    posts.unshift(post);
  }
  safeSet(STORAGE_KEYS.BLOG_POSTS, posts);
}

export function deleteBlogPost(id: string): void {
  const posts = getBlogPosts().filter((p) => p.id !== id);
  safeSet(STORAGE_KEYS.BLOG_POSTS, posts);
}

// ----------------- BLOG COMMENTS -----------------
export function getComments(postId?: string): BlogComment[] {
  const all = safeParse<BlogComment[]>(STORAGE_KEYS.COMMENTS, initialComments);
  if (!postId) return all;
  return all.filter((c) => c.postId === postId);
}

export function submitComment(
  postId: string,
  authorName: string,
  authorEmail: string,
  content: string,
  parentId?: string
): BlogComment {
  const all = getComments();
  const now = new Date().toISOString();

  const newComment: BlogComment = {
    id: `comm-${Date.now()}`,
    postId,
    parentId: parentId || null,
    authorName,
    authorEmail,
    content,
    createdAt: now,
    status: 'pending', // Pending approval by default for anti-spam & moderation
    likes: 0,
  };

  if (parentId) {
    // If it's a reply to an existing comment
    const parent = all.find((c) => c.id === parentId);
    if (parent) {
      if (!parent.replies) parent.replies = [];
      parent.replies.push(newComment);
    }
  } else {
    all.unshift(newComment);
  }

  safeSet(STORAGE_KEYS.COMMENTS, all);

  // Notify admin for moderation
  addNotification({
    id: `notif-${Date.now()}`,
    title: 'New Comment Awaiting Approval',
    message: `${authorName} posted a comment on blog post that requires moderation.`,
    type: 'comment',
    timestamp: now,
    read: false,
    linkId: newComment.id,
  });

  return newComment;
}

export function updateCommentStatus(commentId: string, status: CommentStatus): void {
  const all = getComments();

  // Look in root comments or nested replies
  for (const c of all) {
    if (c.id === commentId) {
      c.status = status;
      break;
    }
    if (c.replies) {
      const reply = c.replies.find((r) => r.id === commentId);
      if (reply) {
        reply.status = status;
        break;
      }
    }
  }

  safeSet(STORAGE_KEYS.COMMENTS, all);
}

export function deleteComment(commentId: string): void {
  let all = getComments().filter((c) => c.id !== commentId);
  all = all.map((c) => {
    if (c.replies) {
      return {
        ...c,
        replies: c.replies.filter((r) => r.id !== commentId),
      };
    }
    return c;
  });
  safeSet(STORAGE_KEYS.COMMENTS, all);
}

// ----------------- CONTACT MESSAGES -----------------
export function getContactMessages(): ContactMessage[] {
  return safeParse<ContactMessage[]>(STORAGE_KEYS.MESSAGES, []);
}

export function submitContactMessage(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): ContactMessage {
  const messages = getContactMessages();
  const now = new Date().toISOString();

  const msg: ContactMessage = {
    id: `msg-${Date.now()}`,
    ...data,
    submittedAt: now,
    read: false,
    status: 'new',
  };

  messages.unshift(msg);
  safeSet(STORAGE_KEYS.MESSAGES, messages);

  addNotification({
    id: `notif-${Date.now()}`,
    title: 'New Contact Message',
    message: `${data.name} sent an inquiry: "${data.subject}"`,
    type: 'message',
    timestamp: now,
    read: false,
    linkId: msg.id,
  });

  return msg;
}

export function markMessageRead(id: string): void {
  const messages = getContactMessages();
  const target = messages.find((m) => m.id === id);
  if (target) {
    target.read = true;
    safeSet(STORAGE_KEYS.MESSAGES, messages);
  }
}

// ----------------- NOTIFICATIONS -----------------
export function getNotifications(): NotificationItem[] {
  return safeParse<NotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, []);
}

export function addNotification(notif: NotificationItem): void {
  const notifs = getNotifications();
  notifs.unshift(notif);
  safeSet(STORAGE_KEYS.NOTIFICATIONS, notifs.slice(0, 50));
}

export function markNotificationRead(id: string): void {
  const notifs = getNotifications();
  const target = notifs.find((n) => n.id === id);
  if (target) {
    target.read = true;
    safeSet(STORAGE_KEYS.NOTIFICATIONS, notifs);
  }
}

export function clearAllNotifications(): void {
  safeSet(STORAGE_KEYS.NOTIFICATIONS, []);
}

// ----------------- SETTINGS -----------------
export function getSettings(): WebsiteSettings {
  return safeParse<WebsiteSettings>(STORAGE_KEYS.SETTINGS, initialSettings);
}

export function updateSettings(settings: WebsiteSettings): void {
  safeSet(STORAGE_KEYS.SETTINGS, settings);
}

// ----------------- AUTHENTICATION -----------------
export function isAdminLoggedIn(): boolean {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
}

export function adminLogin(secret: string): boolean {
  // Default master pass for E27 Admin is "e27admin2026" or "admin123"
  if (secret === 'e27admin2026' || secret === 'admin123' || secret === 'e27') {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
    window.dispatchEvent(new CustomEvent('e27_storage_updated', { detail: { key: STORAGE_KEYS.ADMIN_AUTH } }));
    return true;
  }
  return false;
}

export function adminLogout(): void {
  localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  window.dispatchEvent(new CustomEvent('e27_storage_updated', { detail: { key: STORAGE_KEYS.ADMIN_AUTH } }));
}

// Convenient Aliases & Functional Helpers
export function getCommentsByPostId(postId: string): BlogComment[] {
  return getComments(postId);
}

export function addComment(postId: string, authorName: string, authorEmail: string, content: string): BlogComment {
  return submitComment(postId, authorName, authorEmail, content);
}

export function approveComment(id: string): void {
  updateCommentStatus(id, 'approved');
}

export function rejectComment(id: string): void {
  updateCommentStatus(id, 'rejected');
}

export function addContactMessage(name: string, phone: string, email: string, subject: string, message: string): ContactMessage {
  return submitContactMessage({ name, phone, email, subject, message });
}

export function saveServices(services: ServiceItem[]): void {
  safeSet(STORAGE_KEYS.SERVICES, services);
}

export function saveBlogPosts(posts: BlogPost[]): void {
  safeSet(STORAGE_KEYS.BLOG_POSTS, posts);
}

export function setAdminLoggedIn(val: boolean): void {
  if (val) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
  } else {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }
  window.dispatchEvent(new CustomEvent('e27_storage_updated', { detail: { key: STORAGE_KEYS.ADMIN_AUTH } }));
}

export function logoutAdmin(): void {
  adminLogout();
}

export function saveSettings(settings: WebsiteSettings): void {
  updateSettings(settings);
}


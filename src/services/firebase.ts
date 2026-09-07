/**
 * E27 Firebase Integration Architecture & Configuration
 * 
 * This module defines the Firebase configuration interface and exports
 * helpers to connect Firebase Auth, Firestore, and Storage.
 *
 * When Firebase credentials are provided in `.env` or environment variables:
 * - VITE_FIREBASE_API_KEY
 * - VITE_FIREBASE_AUTH_DOMAIN
 * - VITE_FIREBASE_PROJECT_ID
 * - VITE_FIREBASE_STORAGE_BUCKET
 * - VITE_FIREBASE_MESSAGING_SENDER_ID
 * - VITE_FIREBASE_APP_ID
 *
 * It provides direct cloud synchronization. When running in offline or preview
 * mode, E27 gracefully uses the reactive client-side storage engine
 * in `storage.ts` so all features work seamlessly out of the box.
 */

export interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

export const firebaseConfig: FirebaseConfig = {
  apiKey: (import.meta as any).env?.VITE_FIREBASE_API_KEY || '',
  authDomain: (import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: (import.meta as any).env?.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: (import.meta as any).env?.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: (import.meta as any).env?.VITE_FIREBASE_APP_ID || '',
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

export const FIRESTORE_COLLECTIONS = {
  USERS: 'users',
  APPLICATIONS: 'applications',
  SERVICES: 'services',
  DOCUMENTS: 'applicationDocuments',
  BLOG_POSTS: 'blogPosts',
  COMMENTS: 'comments',
  CONTACT_MESSAGES: 'contactMessages',
  NOTIFICATIONS: 'notifications',
  SETTINGS: 'settings',
};

/**
 * Firestore Security Rules Sample (firestore.rules)
 * 
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     function isAdmin() {
 *       return request.auth != null && request.auth.token.role == 'admin';
 *     }
 *     
 *     match /services/{serviceId} {
 *       allow read: if true;
 *       allow write: if isAdmin();
 *     }
 *     
 *     match /blogPosts/{postId} {
 *       allow read: if true;
 *       allow write: if isAdmin();
 *     }
 *     
 *     match /comments/{commentId} {
 *       allow read: if resource.data.status == 'approved' || isAdmin();
 *       allow create: if request.resource.data.status == 'pending';
 *       allow update, delete: if isAdmin();
 *     }
 *     
 *     match /applications/{applicationId} {
 *       allow read: if isAdmin() || (request.auth != null && request.auth.uid == resource.data.userId);
 *       allow create: if true; // Public applicant can submit
 *       allow update: if isAdmin();
 *     }
 *     
 *     match /settings/{docId} {
 *       allow read: if true;
 *       allow write: if isAdmin();
 *     }
 *     
 *     match /contactMessages/{messageId} {
 *       allow create: if true;
 *       allow read, update, delete: if isAdmin();
 *     }
 *   }
 * }
 */

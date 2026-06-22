import * as admin from 'firebase-admin';
import { initializeApp, cert, getApps } from 'firebase-admin/app';

// Lazy initialization to avoid crashing on startup if key is missing
let db: admin.firestore.Firestore | null = null;

export const getAdminDb = () => {
  if (db) return db;

  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY 
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY) 
    : null;

  if (serviceAccount && getApps().length === 0) {
    initializeApp({
      credential: cert(serviceAccount)
    });
  }

  try {
    db = admin.firestore();
    return db;
  } catch (error) {
    console.warn('Firebase Admin SDK could not be initialized. Check FIREBASE_SERVICE_ACCOUNT_KEY.');
    return null;
  }
};

import { db } from '../lib/firebase';
import { collection, getDocs, doc, getDoc, setDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { Guide, Mentor, ANIMAL_GUIDES, MENTORS } from '../data/content';
import { EngineResult } from './masterEngineService';
import { OperationType, handleFirestoreError } from '../lib/firebaseUtils';

export interface UserProfile {
  uid: string;
  email: string;
  role: 'user' | 'admin';
  plan: 'none' | 'Personal Guide' | 'Clinical Professional' | 'Elite Executive';
  createdAt: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface ChatSession {
  userId: string;
  mentorId: string;
  messages: ChatMessage[];
  lastUpdated: any;
}

export const saveEngineResult = async (uid: string, result: EngineResult) => {
  const path = 'engine_results';
  try {
    const resultsRef = collection(db, path);
    const niche = result.dataRow.solucion_sugerida;
    await addDoc(resultsRef, {
      userId: uid,
      timestamp: serverTimestamp(),
      niche,
      data: result,
      platform: result.source.platform,
      status: result.source.status,
      entity: result.structure.entity
    });
    console.log('Engine result saved successfully!');
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const path = `users/${uid}`;
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
};

export const createUserProfile = async (uid: string, email: string): Promise<UserProfile> => {
  const path = `users/${uid}`;
  try {
    const docRef = doc(db, 'users', uid);
    const newProfile: UserProfile = {
      uid,
      email,
      role: 'user',
      plan: 'none',
      createdAt: new Date().toISOString(),
    };
    await setDoc(docRef, newProfile);
    return newProfile;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    throw error;
  }
};

export const updateUserPlan = async (uid: string, plan: UserProfile['plan']) => {
  const path = `users/${uid}`;
  try {
    const docRef = doc(db, 'users', uid);
    await setDoc(docRef, { plan }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
};

export const getGuides = async (): Promise<Guide[]> => {
  const path = 'guides';
  try {
    const querySnapshot = await getDocs(collection(db, path));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Guide));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
};

export const getMentors = async (): Promise<Mentor[]> => {
  const path = 'mentors';
  try {
    const querySnapshot = await getDocs(collection(db, path));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Mentor));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
};

export const seedDatabase = async () => {
  try {
    // Seed Guides
    for (const guide of ANIMAL_GUIDES) {
      await setDoc(doc(db, 'guides', guide.id), guide);
    }
    
    // Seed Mentors
    const allMentors = Object.values(MENTORS).flat();
    for (const mentor of allMentors) {
      await setDoc(doc(db, 'mentors', mentor.id), mentor);
    }
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

export interface BusinessVault {
  userId: string;
  businessName: string;
  niche: string;
  challenges: string[];
  assets: { name: string, url: string, type: string }[];
  lastUpdated: any;
}

export const saveBusinessVault = async (uid: string, data: Partial<BusinessVault>) => {
  const path = `business_vaults/${uid}`;
  try {
    const docRef = doc(db, 'business_vaults', uid);
    await setDoc(docRef, {
      ...data,
      userId: uid,
      lastUpdated: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const getBusinessVault = async (uid: string): Promise<BusinessVault | null> => {
  const path = `business_vaults/${uid}`;
  try {
    const docRef = doc(db, 'business_vaults', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as BusinessVault;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
};

export const saveChatSession = async (uid: string, mentorId: string, messages: ChatMessage[]) => {
  const sessionId = `${uid}_${mentorId}`;
  const path = `chat_sessions/${sessionId}`;
  try {
    const docRef = doc(db, 'chat_sessions', sessionId);
    await setDoc(docRef, {
      userId: uid,
      mentorId,
      messages,
      lastUpdated: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const getChatSession = async (uid: string, mentorId: string): Promise<ChatSession | null> => {
  const sessionId = `${uid}_${mentorId}`;
  const path = `chat_sessions/${sessionId}`;
  try {
    const docRef = doc(db, 'chat_sessions', sessionId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as ChatSession;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
};

export const clearChatSession = async (uid: string, mentorId: string) => {
  const sessionId = `${uid}_${mentorId}`;
  const path = `chat_sessions/${sessionId}`;
  try {
    const docRef = doc(db, 'chat_sessions', sessionId);
    await setDoc(docRef, {
      userId: uid,
      mentorId,
      messages: [],
      lastUpdated: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const saveUserNotes = async (uid: string, notes: string) => {
  const path = `user_notes/${uid}`;
  try {
    const docRef = doc(db, 'user_notes', uid);
    await setDoc(docRef, {
      userId: uid,
      content: notes,
      lastUpdated: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const getUserNotes = async (uid: string): Promise<string> => {
  const path = `user_notes/${uid}`;
  try {
    const docRef = doc(db, 'user_notes', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().content || '';
    }
    return '';
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return '';
  }
};

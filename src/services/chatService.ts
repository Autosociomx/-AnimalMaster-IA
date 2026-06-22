import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface ChatSession {
  id?: string;
  userId: string;
  mentorId: string;
  messages: ChatMessage[];
  updatedAt: number;
}

export const getChatSession = async (userId: string, mentorId: string): Promise<ChatSession | null> => {
  try {
    const q = query(
      collection(db, 'chats'),
      where('userId', '==', userId),
      where('mentorId', '==', mentorId)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as ChatSession;
    }
    return null;
  } catch (error) {
    console.error("Error getting chat session:", error);
    return null;
  }
};

export const saveChatSession = async (userId: string, mentorId: string, messages: ChatMessage[]) => {
  try {
    const existingSession = await getChatSession(userId, mentorId);
    
    if (existingSession && existingSession.id) {
      await updateDoc(doc(db, 'chats', existingSession.id), {
        messages,
        updatedAt: Date.now()
      });
    } else {
      const newSessionRef = doc(collection(db, 'chats'));
      await setDoc(newSessionRef, {
        userId,
        mentorId,
        messages,
        updatedAt: Date.now()
      });
    }
  } catch (error) {
    console.error("Error saving chat session:", error);
  }
};

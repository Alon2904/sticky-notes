import { db } from './config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { UserData, ChildDocumentData } from '../types/database';

// User operations
export async function createOrUpdateUser(userData: UserData) {
  const userRef = doc(db, 'users', userData.uid);
  await setDoc(userRef, userData, { merge: true });
}

// Document operations
export async function getChildDocument(userId: string): Promise<ChildDocumentData | null> {
  const docRef = doc(db, 'users', userId, 'documents', 'child');
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() as ChildDocumentData : null;
}

export async function updateChildDocument(data: ChildDocumentData): Promise<void> {
  const docRef = doc(db, 'users', data.userId, 'documents', 'child');
  await setDoc(docRef, data);
} 
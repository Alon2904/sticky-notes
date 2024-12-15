import { db } from './config';
import { doc, collection, setDoc, getDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { UserData, ChildDocumentData, PageData } from '../types/database';

// User operations
export async function createOrUpdateUser(userData: UserData) {
  try {
    const userRef = doc(db, 'users', userData.uid);
    
    // Check if user exists
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      // Create new user
      await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Create initial document
      const documentRef = doc(db, 'users', userData.uid, 'documents', 'child');
      await setDoc(documentRef, {
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        type: 'child',
      });

      // Create initial pages
      const pages = [
        { id: 0, color: 'var(--tag-peach)', notes: [] },
        { id: 1, color: 'var(--tag-yellow)', notes: [] },
        { id: 2, color: 'var(--tag-purple)', notes: [] },
      ];

      for (const page of pages) {
        const pageRef = doc(db, 'users', userData.uid, 'documents', 'child', 'pages', page.id.toString());
        await setDoc(pageRef, {
          ...page,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    } else {
      // Update existing user
      await setDoc(userRef, {
        ...userData,
        updatedAt: serverTimestamp(),
      }, { merge: true });
    }
  } catch (error) {
    console.error('Error in createOrUpdateUser:', error);
    throw error;
  }
}

// Get child document with all its pages and notes
export async function getChildDocument(userId: string): Promise<ChildDocumentData | null> {
  try {
    const pagesRef = collection(db, 'users', userId, 'documents', 'child', 'pages');
    const pagesSnapshot = await getDocs(pagesRef);
    
    if (pagesSnapshot.empty) {
      // Initialize if no pages exist
      const initialData: ChildDocumentData = {
        userId,
        pages: [
          { id: 0, color: 'var(--tag-peach)', notes: [] },
          { id: 1, color: 'var(--tag-yellow)', notes: [] },
          { id: 2, color: 'var(--tag-purple)', notes: [] },
        ],
        lastUpdated: Date.now(),
      };

      // Create pages
      for (const page of initialData.pages) {
        const pageRef = doc(pagesRef, page.id.toString());
        await setDoc(pageRef, {
          ...page,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      return initialData;
    }

    // Construct data from existing pages with proper typing
    const pages = pagesSnapshot.docs.map(doc => ({
      ...doc.data(),
      id: parseInt(doc.id),
    })) as PageData[];

    return {
      userId,
      pages,
      lastUpdated: Date.now(),
    };
  } catch (error) {
    console.error('Error in getChildDocument:', error);
    throw error;
  }
}

// Update child document
export async function updateChildDocument(data: ChildDocumentData): Promise<void> {
  try {
    // Update each page separately
    for (const page of data.pages) {
      const pageRef = doc(db, 'users', data.userId, 'documents', 'child', 'pages', page.id.toString());
      await setDoc(pageRef, {
        ...page,
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error('Error in updateChildDocument:', error);
    throw error;
  }
} 
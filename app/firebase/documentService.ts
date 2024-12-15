import { getChildDocument, updateChildDocument } from './db';
import { ChildDocumentData } from '../types/database';

const CACHE_KEY = 'childDocument';
const CACHE_EXPIRY = 1000 * 60 * 5; // 5 minutes in milliseconds

export const documentService = {
  loadFromCache(userId: string): ChildDocumentData | null {
    const cached = localStorage.getItem(`${CACHE_KEY}_${userId}`);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      // Check if cache is still valid (less than 5 minutes old)
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        return data;
      }
      // Clear expired cache
      localStorage.removeItem(`${CACHE_KEY}_${userId}`);
    }
    return null;
  },

  saveToCache(userId: string, data: ChildDocumentData) {
    localStorage.setItem(`${CACHE_KEY}_${userId}`, JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
  },

  async loadDocument(userId: string): Promise<ChildDocumentData | null> {
    try {
      // Try cache first
      const cachedData = this.loadFromCache(userId);
      if (cachedData) {
        return cachedData;
      }

      // If no cache or expired, load from database
      const dbData = await getChildDocument(userId);
      if (dbData) {
        this.saveToCache(userId, dbData);
        return dbData;
      }

      return null;
    } catch (error) {
      console.error('Error loading document:', error);
      throw error;
    }
  },

  async saveDocument(data: ChildDocumentData): Promise<void> {
    try {
      const dataWithTimestamp = {
        ...data,
        lastUpdated: Date.now(),
      };

      // Update cache immediately
      this.saveToCache(data.userId, dataWithTimestamp);
      
      // Then save to database
      await updateChildDocument(dataWithTimestamp);
    } catch (error) {
      console.error('Error saving document:', error);
      throw error;
    }
  },

  clearCache(userId: string): void {
    localStorage.removeItem(`${CACHE_KEY}_${userId}`);
  }
}; 
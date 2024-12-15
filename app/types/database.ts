export interface UserData {
  uid: string;
  email: string;
  lastLogin: number;
}

export interface StickyNoteData {
  id: number;
  text: string;
  position: { x: number; y: number };
  color: string;
}

export interface PageData {
  id: number;
  color: string;
  notes: StickyNoteData[];
}

export interface ChildDocumentData {
  userId: string;
  pages: PageData[];
  lastUpdated: number;
} 
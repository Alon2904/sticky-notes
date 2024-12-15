'use client';

import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';
import { useAuth } from '../providers/AuthProvider';
import { documentService } from '../firebase/documentService';

export default function LogoutButton() {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      if (user) {
        documentService.clearCache(user.uid); // Clear cache on logout
      }
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed top-4 right-4 z-50 bg-white shadow-custom rounded-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      style={{
        fontFamily: 'var(--font-geist-sans)',
      }}
    >
      Logout
    </button>
  );
} 
'use client';

import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="
        px-3 py-1.5 
        sm:px-4 sm:py-2 
        bg-white 
        rounded-lg 
        shadow-custom 
        text-xs 
        sm:text-sm 
        font-medium 
        text-gray-800 
        hover:bg-gray-50 
        active:bg-gray-100
        transition-all 
        duration-200
        whitespace-nowrap
        min-w-[64px]
        sm:min-w-[80px]
      "
    >
      Logout
    </button>
  );
} 
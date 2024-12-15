'use client';

import Image from 'next/image';
import { useAuth } from '../providers/AuthProvider';

export default function NavigationMain() {
  const { user } = useAuth();

  return (
    <nav className="hidden md:flex flex-col fixed left-4 top-0 bottom-0 w-[40px] z-[200]">
      {/* Main Navigation Pill */}
      <div 
        className="absolute top-4 bg-white rounded-[28px] shadow-custom w-[40px] h-[488px]"
        style={{
          boxShadow: `
            0px -1px 1px rgba(136, 116, 89, 0.05),
            0px 1px 2px -0.5px rgba(136, 116, 89, 0.1),
            0px 2px 4px -1px rgba(136, 116, 89, 0.2),
            0px 4px 8px -2px rgba(136, 116, 89, 0.2),
            0px 16px 32px -8px rgba(136, 116, 89, 0.2)
          `
        }}
      >
        {/* Logo */}
        <div className="relative mt-4">
          <Image
            src="/YellowBoxWithTick/Group.png"
            alt="Logo"
            width={24}
            height={23}
            priority
            className="object-contain mx-auto"
          />
        </div>
      </div>

      {/* Bottom Pill with Profile Photo */}
      <div 
        className="absolute bottom-4 bg-white rounded-[28px] shadow-custom w-[40px] h-[40px] overflow-hidden"
        style={{
          boxShadow: `
            0px -1px 1px rgba(136, 116, 89, 0.05),
            0px 1px 2px -0.5px rgba(136, 116, 89, 0.1),
            0px 2px 4px -1px rgba(136, 116, 89, 0.2),
            0px 4px 8px -2px rgba(136, 116, 89, 0.2),
            0px 16px 32px -8px rgba(136, 116, 89, 0.2)
          `
        }}
      >
        {user?.photoURL ? (
          <Image
            src={user.photoURL}
            alt="Profile"
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>
    </nav>
  );
}


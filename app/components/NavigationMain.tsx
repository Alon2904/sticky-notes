import Image from 'next/image';

export default function NavigationMain() {
  return (
    <nav className="hidden md:flex flex-col fixed left-4 h-[100dvh] w-[40px] z-50">
      {/* Main Navigation Pill */}
      <div className="bg-white flex flex-col items-center py-4 mt-4 rounded-[28px] shadow-custom h-[488px]">
        {/* Logo */}
        <div className="relative mt-4">
          <Image
            src="/YellowBoxWithTick/Group.png"
            alt="Logo"
            width={24}
            height={23}
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-grow min-h-[32px]" />

      {/* Bottom Pill */}
      <div className="bg-white rounded-[28px] shadow-custom w-[40px] h-[40px] mb-4" />
    </nav>
  );
}


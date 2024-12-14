import Image from 'next/image';

//TODO: make this responsive for mobile - small pill location affected on mobile screens

export default function NavigationMain() {
  return (
    <div 
      className="fixed h-[100dvh] flex flex-col"
      style={{
        left: '16px',
        top: 0,
        width: '40px',
        zIndex: 50,
        minHeight: '600px', // Minimum height to ensure pills don't overlap
      }}
    >
      {/* Main Navigation Pill */}
      <div 
        className="bg-white flex flex-col items-center py-4 rounded-[28px] shadow-custom mt-4"
        style={{
          width: '40px',
          height: '488px',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          opacity: 1,
          minHeight: '488px', // Ensure minimum height
          flexShrink: 0, // Prevent shrinking
        }}>
        {/* Logo */}
        <div 
          className="relative"
          style={{
            marginTop: '16px',
            width: '24px',
            height: '22.71px',
            opacity: 1,
            position: 'absolute',
            left: '8px',
          }}>
          <Image
            src="/YellowBoxWithTick/Group.png"
            alt="Logo"
            width={24}
            height={22.71}
            priority
            style={{
              objectFit: 'contain',
              opacity: 1,
            }}
          />
        </div>
      </div>

      {/* Spacer to push bottom pill to bottom */}
      <div className="flex-grow min-h-[32px]" /> {/* Minimum gap between pills */}

      {/* Bottom Pill */}
      <div 
        className="shadow-custom rounded-[28px] bg-white mb-4"
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          opacity: 1,
          flexShrink: 0, // Prevent shrinking
        }}
      />
    </div>
  );
}


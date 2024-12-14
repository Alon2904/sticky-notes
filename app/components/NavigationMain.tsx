import Image from 'next/image';

export default function NavigationMain() {
  return (
    <>
      {/* Main Navigation Pill */}
      <div 
        className="fixed bg-white flex flex-col items-center py-4 rounded-[28px] z-50 shadow-custom"
        style={{
          top: '16px',
          left: '16px',
          width: '40px',
          height: '488px',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          opacity: 1,
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

      {/* Bottom Pill */}
      <div 
        className="fixed bg-white rounded-[28px] z-50 bottom-pill shadow-custom"
        style={{
          left: '16px',
          width: '40px',
          height: '40px',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          opacity: 1,
        }}>
      </div>
    </>
  )
}


import { CSSProperties, forwardRef, useEffect, useState } from 'react';

interface PaperProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  noMargin?: boolean;
}

interface CustomCSSProperties extends CSSProperties {
  '--paper-width'?: string;
}

const Paper = forwardRef<HTMLDivElement, PaperProps>(({ 
  children, 
  className = '', 
  style = {}, 
  onClick,
  noMargin = false,
}, ref) => {
  const [paperWidth, setPaperWidth] = useState<number>(0);
  
  // Base sizes and spacing
  const BASE_DOCUMENT_WIDTH = 940;
  const BASE_CHILD_WIDTH = 980;
  const BREAKPOINT = 1295;
  const MIN_SIDE_MARGIN = 16;
  const NAV_WIDTH = 56;
  const A4_RATIO = 1.4142;

  useEffect(() => {
    const updateWidth = () => {
      const screenWidth = window.innerWidth;
      const isChildDocument = style.width === `${BASE_CHILD_WIDTH}px`;
      const baseWidth = isChildDocument ? BASE_CHILD_WIDTH : BASE_DOCUMENT_WIDTH;
      const navigationSpace = screenWidth <= 768 ? 0 : NAV_WIDTH;

      if (screenWidth <= BREAKPOINT) {
        // Calculate available width considering navigation and margins
        const availableWidth = screenWidth - (MIN_SIDE_MARGIN * 2) - navigationSpace;
        
        // Calculate scale based on original proportions
        const scale = availableWidth / baseWidth;
        
        // Apply scale with a minimum size constraint
        const newWidth = Math.max(
          Math.min(baseWidth, Math.floor(baseWidth * scale)),
          baseWidth * 0.6 // Minimum 60% of original size
        );
        
        setPaperWidth(newWidth);
      } else {
        setPaperWidth(baseWidth);
      }
    };

    updateWidth();
    const handleResize = () => {
      requestAnimationFrame(updateWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [style.width]);

  return (
    <div
      ref={ref}
      className={`
        bg-white z-40 shadow-custom 
        mt-[60px] md:mt-[92px]
        ${noMargin ? 'mt-0' : ''} 
        ${className}
      `}
      onClick={onClick}
      style={{
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        width: `${paperWidth}px`,
        aspectRatio: `1 / ${A4_RATIO}`,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        opacity: 1,
        borderRadius: '4px 4px 0 0',
        cursor: onClick ? 'pointer' : 'default',
        margin: `0 ${MIN_SIDE_MARGIN}px`,
        transition: 'width 0.2s ease-out',
        maxWidth: `calc(100vw - ${MIN_SIDE_MARGIN * 2}px)`,
        ...style,
      } as CustomCSSProperties}
    >
      {children}
    </div>
  );
});

Paper.displayName = 'Paper';

export default Paper; 
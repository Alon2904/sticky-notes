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
  const MIN_SIDE_MARGIN = 16;
  const NAV_WIDTH = 56;
  const PILL_WIDTH = 40;
  const PILL_MARGIN = 16;
  const A4_RATIO = 1.4142;

  useEffect(() => {
    const updateWidth = () => {
      const screenWidth = window.innerWidth;
      const isChildDocument = style.width === `${BASE_CHILD_WIDTH}px`;
      const baseWidth = isChildDocument ? BASE_CHILD_WIDTH : BASE_DOCUMENT_WIDTH;
      
      // Calculate required spacing
      const navigationSpace = screenWidth <= 768 ? 0 : NAV_WIDTH;
      const pillSpace = isChildDocument ? PILL_WIDTH + PILL_MARGIN : 0;
      const totalMargins = (MIN_SIDE_MARGIN * 2) + navigationSpace + pillSpace;

      // Calculate maximum available width
      const availableWidth = screenWidth - totalMargins;
      
      // Calculate scale to fit available space
      let scale = availableWidth / baseWidth;

      // More aggressive scaling for smaller screens
      if (screenWidth <= 768) {
        scale *= 0.85; // 85% of calculated scale for mobile
      } else if (screenWidth <= 1024) {
        scale *= 0.9; // 90% of calculated scale for tablets
      }

      // Apply scale, ensuring paper fits within available space
      const newWidth = Math.min(baseWidth, Math.floor(baseWidth * scale));
      setPaperWidth(newWidth);
    };

    // Initial update
    updateWidth();

    // Add resize observer for more reliable updates
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateWidth);
    });

    resizeObserver.observe(document.documentElement);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
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
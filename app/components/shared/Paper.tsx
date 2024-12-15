import { CSSProperties, forwardRef } from 'react';

interface PaperProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  noMargin?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

const Paper = forwardRef<HTMLDivElement, PaperProps>(({ 
  children, 
  className = '', 
  style = {}, 
  onClick,
}, ref) => {
  return (
    <div
      ref={ref}
      className={`
        bg-white z-40 shadow-custom 
        aspect-[1/1.4142]
        mb-[60px]
        ${className}
      `}
      onClick={onClick}
      style={{
        position: 'relative',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        opacity: 1,
        borderRadius: '4px 4px 0 0',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'width 0.2s ease-out',
        ...style,
      }}
    >
      {children}
    </div>
  );
});

Paper.displayName = 'Paper';

export default Paper; 
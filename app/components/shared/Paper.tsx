import { CSSProperties, forwardRef } from 'react';

interface PaperProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  noMargin?: boolean;
}

const Paper = forwardRef<HTMLDivElement, PaperProps>(({ 
  children, 
  className = '', 
  style = {}, 
  onClick,
  noMargin = false,
}, ref) => {
  return (
    <div
      ref={ref}
      className={`bg-white z-40 shadow-custom ${className}`}
      onClick={onClick}
      style={{
        position: 'relative',
        marginTop: noMargin ? 0 : '92px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: style.width || '940px',
        minHeight: 'calc((100vw - 254px) * 1.4142)',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        opacity: 1,
        borderRadius: '4px 4px 0 0',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </div>
  );
});

Paper.displayName = 'Paper';

export default Paper; 
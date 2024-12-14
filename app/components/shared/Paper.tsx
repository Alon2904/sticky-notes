import { CSSProperties } from 'react';

interface PaperProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  noMargin?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export default function Paper({ 
  children, 
  className = '', 
  style = {}, 
  noMargin = false,
  onClick,
}: PaperProps) {
  return (
    <div
      className={`bg-white z-40 shadow-custom ${className}`}
      onClick={onClick}
      style={{
        marginTop: noMargin ? 0 : '92px',
        marginLeft: noMargin ? 0 : '127px',
        width: 'calc(100vw - 254px)',
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
} 
interface PaperProps {
  children: React.ReactNode;
  className?: string;
}

export default function Paper({ children, className = '' }: PaperProps) {
  return (
    <div
      className={`bg-white z-40 shadow-custom ${className}`}
      style={{
        marginTop: '92px',
        marginLeft: '127px',
        width: 'calc(100vw - 254px)',
        minHeight: 'calc((100vw - 254px) * 1.4142)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        opacity: 1,
        borderRadius: '4px 4px 0 0',
      }}
    >
      {children}
    </div>
  );
} 
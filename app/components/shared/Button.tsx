interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'large' | 'small';
}

export default function Button({ 
  children, 
  onClick, 
  className = '', 
  size = 'large' 
}: ButtonProps) {
  const buttonStyles = {
    large: {
      padding: '12px 32px',
      height: '42px',
      minWidth: '147px',
    },
    small: {
      padding: '7px 20px',
      height: '32px',
      minWidth: '100px',
    }
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center text-white font-medium text-sm ${className}`}
      style={{
        ...buttonStyles[size],
        borderRadius: '21px',
        opacity: 1,
        backgroundColor: 'rgba(84, 162, 104, 1)', // #54A268
        fontFamily: 'var(--font-geist-sans)',
      }}
    >
      {children}
    </button>
  );
} 
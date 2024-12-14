interface PaperTagProps {
  style?: React.CSSProperties;
  color: string;
  onClick?: () => void;
}

export default function PaperTag({ style, color, onClick }: PaperTagProps) {
  return (
    <div 
      className="absolute cursor-pointer" 
      style={{ left: 0, transform: 'scaleX(-1)', ...style }}
      onClick={onClick}
    >
      <div
        style={{
          position: 'absolute',
          width: '8px',
          height: '32px',
          borderRadius: '0px 4px 4px 0px',
          backgroundColor: color,
          opacity: 1,
        }}
      />
    </div>
  );
} 
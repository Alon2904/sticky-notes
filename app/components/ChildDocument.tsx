'use client';

import Paper from './shared/Paper';
import Button from './shared/Button';

interface ChildDocumentProps {
  onClose: () => void;
  onClick?: (e: React.MouseEvent) => void;
  width: number;
}

export default function ChildDocument({ onClose, onClick, width }: ChildDocumentProps) {
  // Calculate the left position based on the viewport center
  const leftPosition = `calc(50% - 470px)`; // Half of 940px parent width

  return (
    <Paper
      className="absolute"
      noMargin
      onClick={onClick}
      style={{
        top: '20px',
        left: leftPosition,
        transform: 'translateX(-22px)', // Offset to achieve the exact positioning
        zIndex: 50,
        width: `${width}px`,
      }}
    >
      <div className="absolute p-[32px]">
        <Button 
          size="small"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onClose();
          }}
        >
          Close
        </Button>
      </div>
    </Paper>
  );
} 
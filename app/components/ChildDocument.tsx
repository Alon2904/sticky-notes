'use client';

import Paper from './shared/Paper';
import Button from './shared/Button';

interface ChildDocumentProps {
  onClose: () => void;
  onClick?: (e: React.MouseEvent) => void;
}

export default function ChildDocument({ onClose, onClick }: ChildDocumentProps) {
  return (
    <Paper
      className="absolute"
      noMargin
      onClick={onClick}
      style={{
        top: '20px',
        left: '107px',
        zIndex: 50,
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
        {/* Add your additional components and features here */}
      </div>
    </Paper>
  );
} 
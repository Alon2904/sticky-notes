'use client';

import { useRef, useEffect, useState } from 'react';
import Paper from './shared/Paper';
import Button from './shared/Button';
import ChildPageNavigationPill from './ChildPageNavigationPill';

interface ChildDocumentProps {
  onClose: () => void;
  onClick?: (e: React.MouseEvent) => void;
  width: number;
}

export default function ChildDocument({ onClose, onClick, width }: ChildDocumentProps) {
  const paperRef = useRef<HTMLDivElement>(null);
  const [paperHeight, setPaperHeight] = useState(0);

  useEffect(() => {
    if (paperRef.current) {
      setPaperHeight(paperRef.current.getBoundingClientRect().height);
    }
  }, []);

  return (
    <Paper
      ref={paperRef}
      className="absolute"
      noMargin
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: `${width}px`,
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
      </div>
      {paperHeight > 0 && (
        <ChildPageNavigationPill 
          parentHeight={paperHeight}
        />
      )}
    </Paper>
  );
} 
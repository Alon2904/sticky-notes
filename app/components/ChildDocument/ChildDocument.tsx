'use client';

import { useRef, useEffect, useState } from 'react';
import Paper from '../shared/Paper';
import ChildPageNavigationPill from './ChildPageNavigationPill';
import YellowBox from './YellowBox';

interface ChildDocumentProps {
  onClick?: (e: React.MouseEvent) => void;
  width: number;
}

export default function ChildDocument({ onClick, width }: ChildDocumentProps) {
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
      <YellowBox />
      {paperHeight > 0 && (
        <ChildPageNavigationPill 
          parentHeight={paperHeight}
        />
      )}
    </Paper>
  );
} 
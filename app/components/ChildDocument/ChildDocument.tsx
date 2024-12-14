'use client';

import { useRef, useEffect, useState } from 'react';
import Paper from '../shared/Paper';
import ChildPageNavigationPill from './ChildPageNavigationPill';
import HeaderBox from './HeaderBox';
import PaperTag from './PaperTag';

interface ChildDocumentProps {
  onClick?: (e: React.MouseEvent) => void;
  width: number;
}

export default function ChildDocument({ onClick, width }: ChildDocumentProps) {
  const paperRef = useRef<HTMLDivElement>(null);
  const [paperHeight, setPaperHeight] = useState(0);
  const [activePage, setActivePage] = useState(1); // Start with yellow (middle) page

  useEffect(() => {
    if (paperRef.current) {
      setPaperHeight(paperRef.current.getBoundingClientRect().height);
    }
  }, []);

  const INITIAL_TOP = 16;
  const TAG_HEIGHT = 32;
  const TAG_GAP = 4;

  const pages = [
    { color: 'var(--tag-peach)', id: 0 },
    { color: 'var(--tag-yellow)', id: 1 },
    { color: 'var(--tag-purple)', id: 2 },
  ];

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
      <HeaderBox color={pages[activePage].color} />
      {pages.map((page, index) => (
        <PaperTag 
          key={index}
          color={page.color}
          onClick={() => setActivePage(page.id)}
          style={{ 
            top: `${INITIAL_TOP + (index * (TAG_HEIGHT + TAG_GAP))}px`,
          }}
        />
      ))}
      {paperHeight > 0 && (
        <ChildPageNavigationPill 
          parentHeight={paperHeight}
        />
      )}
      {/* Different content can be rendered here based on activePage */}
    </Paper>
  );
} 
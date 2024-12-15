'use client';

import { useRef, useEffect, useState } from 'react';
import Paper from '../shared/Paper';
import ChildPageNavigationPill from './ChildPageNavigationPill';
import HeaderBox from './HeaderBox';
import PaperTag from './PaperTag';
import StickyNote from './StickyNote';

interface ChildDocumentProps {
  onClick?: (e: React.MouseEvent) => void;
  width: number;
}

interface StickyNoteType {
  id: number;
  text: string;
  position: { x: number; y: number };
  color: string;
}

interface PageData {
  color: string;
  id: number;
  notes: StickyNoteType[];
}

const findAvailablePosition = (notes: StickyNoteType[], baseX: number, baseY: number): { x: number; y: number } => {
  const GRID_SIZE = 20; // Space between notes when avoiding overlap
  const initialPosition = { x: baseX, y: baseY };
  let attempts = 0;
  const MAX_ATTEMPTS = 50;

  while (attempts < MAX_ATTEMPTS) {
    const currentPosition = { 
      x: initialPosition.x, 
      y: initialPosition.y 
    };

    // Adjust position based on attempt number
    const step = Math.floor(attempts / 4);
    switch (attempts % 4) {
      case 0: currentPosition.x += GRID_SIZE * (step + 1); break;
      case 1: currentPosition.y += GRID_SIZE * (step + 1); break;
      case 2: currentPosition.x -= GRID_SIZE * (step + 1); break;
      case 3: currentPosition.y -= GRID_SIZE * (step + 1); break;
    }

    const hasOverlap = notes.some(note => {
      const dx = Math.abs(note.position.x - currentPosition.x);
      const dy = Math.abs(note.position.y - currentPosition.y);
      return dx < 131 && dy < 125; // Note dimensions
    });

    if (!hasOverlap) {
      return currentPosition;
    }

    attempts++;
  }

  // If no position found, offset from base position
  return { 
    x: baseX + GRID_SIZE * notes.length, 
    y: baseY + GRID_SIZE * notes.length 
  };
};

export default function ChildDocument({ onClick, width }: ChildDocumentProps) {
  const paperRef = useRef<HTMLDivElement>(null);
  const [paperHeight, setPaperHeight] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState<PageData[]>([
    { color: 'var(--tag-peach)', id: 0, notes: [] },
    { color: 'var(--tag-yellow)', id: 1, notes: [] },
    { color: 'var(--tag-purple)', id: 2, notes: [] },
  ]);

  const INITIAL_TOP = 16;
  const TAG_HEIGHT = 32;
  const TAG_GAP = 4;

  // Add useEffect to update paperHeight when ref changes
  useEffect(() => {
    if (paperRef.current) {
      const updateHeight = () => {
        setPaperHeight(paperRef.current?.getBoundingClientRect().height || 0);
      };

      updateHeight();
      
      // Update height on window resize
      window.addEventListener('resize', updateHeight);
      
      return () => {
        window.removeEventListener('resize', updateHeight);
      };
    }
  }, []);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPages = localStorage.getItem('childDocumentPages');
    if (savedPages) {
      setPages(JSON.parse(savedPages));
    }
  }, []);

  // Save to localStorage whenever pages change
  useEffect(() => {
    localStorage.setItem('childDocumentPages', JSON.stringify(pages));
  }, [pages]);

  const addStickyNote = (text: string) => {
    const basePosition = { x: 900.14, y: 28.58 };
    const currentPageNotes = pages[activePage].notes;
    const position = findAvailablePosition(currentPageNotes, basePosition.x, basePosition.y);

    const newNote: StickyNoteType = {
      id: Date.now(),
      text,
      position,
      color: pages[activePage].color,
    };

    setPages(currentPages => 
      currentPages.map((page, index) => 
        index === activePage
          ? { ...page, notes: [...page.notes, newNote] }
          : page
      )
    );
  };

  const updateNotePosition = (id: number, x: number, y: number) => {
    setPages(currentPages => 
      currentPages.map((page, index) => 
        index === activePage
          ? {
              ...page,
              notes: page.notes.map(note => 
                note.id === id 
                  ? { ...note, position: { x, y } }
                  : note
              )
            }
          : page
      )
    );
  };

  const updateNoteText = (id: number, newText: string) => {
    setPages(currentPages => 
      currentPages.map((page, index) => 
        index === activePage
          ? {
              ...page,
              notes: page.notes.map(note => 
                note.id === id 
                  ? { ...note, text: newText }
                  : note
              )
            }
          : page
      )
    );
  };

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
          onAddNote={addStickyNote}
        />
      )}
      {pages[activePage].notes.map((note) => (
        <StickyNote
          key={note.id}
          id={note.id}
          text={note.text}
          position={note.position}
          color={note.color}
          onPositionChange={(x, y) => updateNotePosition(note.id, x, y)}
          onTextChange={updateNoteText}
        />
      ))}
    </Paper>
  );
} 
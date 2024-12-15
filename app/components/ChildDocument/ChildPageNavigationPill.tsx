'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import SmallPaper from './SmallPaper';

interface ChildPageNavigationPillProps {
  parentHeight: number;
  onAddNote: (text: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

export default function ChildPageNavigationPill({ 
  parentHeight, 
  onAddNote, 
  style,
  className 
}: ChildPageNavigationPillProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(241);
  const [showSmallPaper, setShowSmallPaper] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number>(0);
  const startPosition = useRef<number>(0);
  const touchStartY = useRef<number | null>(null);

  const handleDragStart = useCallback((clientY: number) => {
    setIsDragging(true);
    dragStartY.current = clientY;
    startPosition.current = position;
  }, [position]);

  const handleDragMove = useCallback((clientY: number) => {
    if (!isDragging) return;

    const deltaY = clientY - dragStartY.current;
    const newPosition = startPosition.current + deltaY;

    // Constrain vertical movement within parent bounds
    const minPosition = 0;
    const maxPosition = parentHeight - 240; // pill height
    const constrainedPosition = Math.max(minPosition, Math.min(newPosition, maxPosition));

    setPosition(constrainedPosition);
  }, [isDragging, parentHeight]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientY);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleDragStart(touch.clientY);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleDragMove(touch.clientY);
  }, [handleDragMove]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    e.preventDefault();
    handleDragEnd();
  }, [handleDragEnd]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientY);
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleDragMove, handleTouchMove, handleTouchEnd, handleDragEnd]);

  const handleNotesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSmallPaper(!showSmallPaper);
  };

  const handleNotesTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    touchStartY.current = e.touches[0].clientY;
  };

  const handleNotesTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (touchStartY.current !== null) {
      const touchEndY = e.changedTouches[0].clientY;
      const touchDistance = Math.abs(touchEndY - touchStartY.current);
      
      // Only toggle if it was a tap (minimal movement)
      if (touchDistance < 5) {
        setShowSmallPaper(!showSmallPaper);
      }
      touchStartY.current = null;
    }
  };

  return (
    <>
      <div 
        ref={pillRef}
        className={`absolute bg-white rounded-[28px] shadow-custom ${className || ''}`}
        style={{
          width: '40px',
          height: '240px',
          right: '-56px',
          top: `${position}px`,
          backgroundColor: 'rgba(255, 255, 255, 1)',
          opacity: 1,
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          touchAction: 'none',
          zIndex: 51,
          borderRadius: '28px',
          ...style,
        }}
      >
        <div 
          className="absolute top-0 left-0 w-full h-[60px] cursor-pointer"
          onClick={handleNotesClick}
          onTouchStart={handleNotesTouchStart}
          onTouchEnd={handleNotesTouchEnd}
        >
          <div className="flex flex-col items-center px-2 pt-4">
            <Image
              src="/notes/notes.png"
              alt="Notes"
              width={24}
              height={24}
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        </div>

        <div
          className="absolute top-[60px] left-0 w-full h-[180px]"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        />
      </div>
      {showSmallPaper && (
        <SmallPaper 
          pillPosition={position} 
          onAddNote={(text) => {
            onAddNote(text);
            setShowSmallPaper(false);
          }}
        />
      )}
    </>
  );
} 
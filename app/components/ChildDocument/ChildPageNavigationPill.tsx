'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ChildPageNavigationPillProps {
  parentHeight: number;
}

export default function ChildPageNavigationPill({ parentHeight }: ChildPageNavigationPillProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(241);
  const pillRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number>(0);
  const startPosition = useRef<number>(0);

  const handleDragStart = (clientY: number) => {
    setIsDragging(true);
    dragStartY.current = clientY;
    startPosition.current = position;
  };

  const handleDragMove = (clientY: number) => {
    if (!isDragging) return;

    const deltaY = clientY - dragStartY.current;
    const newPosition = startPosition.current + deltaY;

    // Constrain vertical movement within parent bounds
    const minPosition = 0;
    const maxPosition = parentHeight - 240; // pill height
    const constrainedPosition = Math.max(minPosition, Math.min(newPosition, maxPosition));

    setPosition(constrainedPosition);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

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

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleDragMove(touch.clientY);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    handleDragEnd();
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientY);
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    // Add both mouse and touch event listeners
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
  }, [isDragging]);

  return (
    <div 
      ref={pillRef}
      className="fixed bg-white rounded-[28px] shadow-custom"
      style={{
        position: 'absolute',
        width: '40px',
        height: '240px',
        left: '956px',
        top: `${position}px`,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        opacity: 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none',
        zIndex: 51,
        borderRadius: '28px',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
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
  );
} 
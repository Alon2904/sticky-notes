'use client';

import { useState, useRef, useEffect } from 'react';

interface ChildPageNavigationPillProps {
  parentHeight: number;
}

export default function ChildPageNavigationPill({ parentHeight }: ChildPageNavigationPillProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(353); // Updated initial Y position
  const pillRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number>(0);
  const startPosition = useRef<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartY.current = e.clientY;
    startPosition.current = position;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaY = e.clientY - dragStartY.current;
      const newPosition = startPosition.current + deltaY;

      // Constrain vertical movement within parent bounds
      const minPosition = 0;
      const maxPosition = parentHeight - 240; // pill height
      const constrainedPosition = Math.max(minPosition, Math.min(newPosition, maxPosition));

      setPosition(constrainedPosition);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, parentHeight]);

  return (
    <div 
      ref={pillRef}
      className="fixed bg-white rounded-[28px] shadow-custom"
      style={{
        position: 'absolute',
        width: '40px',
        height: '240px',
        left: '956px', // Updated X position
        top: `${position}px`,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        opacity: 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        zIndex: 51,
        borderRadius: '28px',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Add any internal content here */}
    </div>
  );
} 
import { useRef, useEffect, useState } from 'react';

interface StickyNoteProps {
  text: string;
  style?: React.CSSProperties;
  position: { x: number; y: number };
  onPositionChange: (x: number, y: number) => void;
  id: number;
  onTextChange: (id: number, newText: string) => void;
}

export default function StickyNote({ 
  text, 
  style, 
  position, 
  onPositionChange, 
  id,
  onTextChange 
}: StickyNoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState(text);
  const noteRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  // Handle double click to edit
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  // Handle text editing completion
  const handleBlur = () => {
    setIsEditing(false);
    if (editableText !== text) {
      onTextChange(id, editableText);
    }
  };

  // Focus textarea when entering edit mode
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  // Prevent dragging when editing
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditing) {
      e.preventDefault();
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - dragStart.current.x;
      const deltaY = e.clientY - dragStart.current.y;

      const newX = position.x + deltaX;
      const newY = position.y + deltaY;

      // Update position
      onPositionChange(newX, newY);

      // Handle auto-scrolling
      const scrollThreshold = 50;
      const scrollSpeed = 10;
      const { top, bottom } = document.documentElement.getBoundingClientRect();

      if (e.clientY < top + scrollThreshold) {
        // Scroll up
        if (!scrollInterval.current) {
          scrollInterval.current = setInterval(() => {
            window.scrollBy(0, -scrollSpeed);
          }, 16);
        }
      } else if (e.clientY > bottom - scrollThreshold) {
        // Scroll down
        if (!scrollInterval.current) {
          scrollInterval.current = setInterval(() => {
            window.scrollBy(0, scrollSpeed);
          }, 16);
        }
      } else if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
        scrollInterval.current = null;
      }

      dragStart.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
        scrollInterval.current = null;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };
  }, [position, onPositionChange]);

  return (
    <div
      ref={noteRef}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      style={{
        position: 'absolute',
        width: '131px',
        height: '125px',
        backgroundColor: 'var(--tag-yellow)',
        transform: 'rotate(-10deg)',
        opacity: 0.95,
        borderRadius: '2px',
        mixBlendMode: 'multiply',
        cursor: isEditing ? 'text' : 'grab',
        left: `${position.x}px`,
        top: `${position.y}px`,
        ...style,
      }}
    >
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={editableText}
          onChange={(e) => setEditableText(e.target.value)}
          onBlur={handleBlur}
          style={{
            position: 'relative',
            margin: '12px',
            width: 'calc(100% - 24px)',
            height: 'calc(100% - 24px)',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            color: '#2B251C',
            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '19px',
          }}
        />
      ) : (
        <p
          style={{
            position: 'relative',
            margin: '12px',
            color: '#2B251C',
            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '19px',
            maxHeight: '100px',
            overflow: 'hidden',
            wordWrap: 'break-word',
            userSelect: 'none',
          }}
        >
          {text}
        </p>
      )}
    </div>
  );
} 
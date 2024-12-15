import { useRef, useEffect, useState } from 'react';

interface StickyNoteProps {
  text: string;
  style?: React.CSSProperties;
  position: { x: number; y: number };
  onPositionChange: (x: number, y: number) => void;
  id: number;
  onTextChange: (id: number, newText: string) => void;
  color: string;
}

export default function StickyNote({ 
  text, 
  style, 
  position, 
  onPositionChange, 
  id,
  onTextChange,
  color 
}: StickyNoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableText, setEditableText] = useState(text);
  const [localPosition, setLocalPosition] = useState(position);
  const noteRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const scrollInterval = useRef<NodeJS.Timeout | null>(null);

  // Update local position when prop changes (not during drag)
  useEffect(() => {
    if (!isDragging.current) {
      setLocalPosition(position);
    }
  }, [position]);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editableText !== text) {
      onTextChange(id, editableText);
    }
  };

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

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

      const newX = localPosition.x + deltaX;
      const newY = localPosition.y + deltaY;

      // Only update local position during drag
      setLocalPosition({ x: newX, y: newY });

      // Handle auto-scrolling
      const scrollThreshold = 50;
      const scrollSpeed = 10;
      const { top, bottom } = document.documentElement.getBoundingClientRect();

      if (e.clientY < top + scrollThreshold) {
        if (!scrollInterval.current) {
          scrollInterval.current = setInterval(() => {
            window.scrollBy(0, -scrollSpeed);
          }, 16);
        }
      } else if (e.clientY > bottom - scrollThreshold) {
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
      if (isDragging.current) {
        // Only notify parent of final position
        onPositionChange(localPosition.x, localPosition.y);
        isDragging.current = false;
      }

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
  }, [localPosition, onPositionChange]);

  return (
    <div
      ref={noteRef}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      style={{
        position: 'absolute',
        width: '131px',
        height: '125px',
        backgroundColor: color,
        transform: 'rotate(-10deg)',
        opacity: 0.95,
        borderRadius: '2px',
        mixBlendMode: 'multiply',
        cursor: isEditing ? 'text' : isDragging.current ? 'grabbing' : 'grab',
        left: `${localPosition.x}px`,
        top: `${localPosition.y}px`,
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
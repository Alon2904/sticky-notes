import Button from '../shared/Button';
import { useState } from 'react';

interface SmallPaperProps {
  pillPosition: number;
  onAddNote?: (text: string) => void;
}

export default function SmallPaper({ pillPosition, onAddNote }: SmallPaperProps) {
  const [text, setText] = useState('');

  const handleAddNote = () => {
    if (text.trim() && onAddNote) {
      onAddNote(text);
      setText('');
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        width: '370px',
        height: '178px',
        right: '37px',
        top: `${pillPosition + 9}px`,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: '6px',
        opacity: 1,
        boxShadow: '0px -1px 1px rgba(136, 116, 89, 0.05), 0px 1px 2px -0.5px rgba(136, 116, 89, 0.1), 0px 2px 4px -1px rgba(136, 116, 89, 0.2), 0px 4px 8px -2px rgba(136, 116, 89, 0.2), 0px 16px 32px -8px rgba(136, 116, 89, 0.2)',
        zIndex: 52,
      }}
    >
      <textarea
        placeholder="Write text for sticky note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          position: 'absolute',
          left: '24px',
          top: '25px',
          width: '322px',
          height: '87px',
          border: 'none',
          outline: 'none',
          resize: 'none',
          color: text ? 'rgba(23, 23, 23, 1)' : 'rgba(144, 135, 126, 1)',
          fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '16px',
          fontWeight: 400,
          letterSpacing: '0px',
          lineHeight: '16px',
          backgroundColor: 'transparent',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '24px',
          bottom: '24px',
        }}
      >
        <Button 
          size="large"
          className="w-[178px]"
          onClick={handleAddNote}
        >
          Add Sticky Note
        </Button>
      </div>
    </div>
  );
} 
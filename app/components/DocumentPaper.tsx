'use client';

import { useState } from 'react';
import Paper from './shared/Paper';
import Button from './shared/Button';
import ChildDocument from './ChildDocument/ChildDocument';

export default function DocumentPaper() {
  const [showChildPaper, setShowChildPaper] = useState(false);

  return (
    <div className="relative">
      {/* Original Paper */}
      <Paper 
        onClick={showChildPaper ? () => setShowChildPaper(false) : undefined}
        style={{
          width: showChildPaper ? '936px' : '940px',
        }}
      >
        <div className="absolute p-[32px]">
          <Button 
            size="large" 
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              setShowChildPaper(true);
            }}
          >
            Open Child Document
          </Button>
        </div>
      </Paper>

      {/* Child Paper with all its features */}
      {showChildPaper && (
        <ChildDocument 
          width={980}
        />
      )}
    </div>
  );
} 
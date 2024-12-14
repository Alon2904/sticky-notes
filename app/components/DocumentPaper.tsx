'use client';

import { useState } from 'react';
import Paper from './shared/Paper';
import Button from './shared/Button';
import ChildDocument from './ChildDocument';

export default function DocumentPaper() {
  const [showChildPaper, setShowChildPaper] = useState(false);

  return (
    <div className="relative">
      {/* Original Paper */}
      <Paper onClick={() => showChildPaper && setShowChildPaper(false)}>
        <div className="absolute p-[32px]">
          <Button 
            size="large" 
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation(); // Prevent click from bubbling to Paper
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
          onClose={() => setShowChildPaper(false)}
          onClick={(e: React.MouseEvent) => e.stopPropagation()} // Prevent clicks on child from closing itself
        />
      )}
    </div>
  );
} 
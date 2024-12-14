'use client';

import { useState } from 'react';
import Paper from './shared/Paper';
import Button from './shared/Button';

export default function DocumentPaper() {
  const [showChildPaper, setShowChildPaper] = useState(false);

  return (
    <div className="relative">
      {/* Original Paper */}
      <Paper>
        <div className="absolute p-[32px]">
          <Button 
            size="large" 
            onClick={() => setShowChildPaper(true)}
          >
            Open Child Document
          </Button>
        </div>
      </Paper>

      {/* Child Paper */}
      {showChildPaper && (
        <Paper
          className="absolute"
          noMargin
          style={{
            top: '20px',
            left: '107px',
            zIndex: 50,
          }}
        >
          <div className="absolute p-[32px]">
            <Button 
              size="small"
              onClick={() => setShowChildPaper(false)}
            >
              Close
            </Button>
          </div>
        </Paper>
      )}
    </div>
  );
} 
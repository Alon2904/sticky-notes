'use client';

import { useState } from 'react';
import ParentDocument from './ParentDocument/ParentDocument';
import ChildDocument from './ChildDocument/ChildDocument';

export default function DocumentPaper() {
  const [showChildPaper, setShowChildPaper] = useState(false);

  return (
    <div className="relative w-full flex flex-col items-center" data-component="document-paper">
      <div className="w-full flex justify-center" data-component="parent-document-container">
        <ParentDocument 
          onOpenChild={() => setShowChildPaper(true)}
          onCloseChild={() => setShowChildPaper(false)}
          isChildOpen={showChildPaper}
        />
      </div>

      {showChildPaper && (
        <div className="w-full flex justify-center" data-component="child-document-container">
          <ChildDocument 
            width={980}
          />
        </div>
      )}
    </div>
  );
} 
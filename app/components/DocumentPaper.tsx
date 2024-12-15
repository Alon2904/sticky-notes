'use client';

import { useState } from 'react';
import ParentDocument from './ParentDocument/ParentDocument';
import ChildDocument from './ChildDocument/ChildDocument';

export default function DocumentPaper() {
  const [showChildPaper, setShowChildPaper] = useState(false);

  return (
    <div className="relative w-full min-h-screen">
      {/* Parent Paper */}
      <ParentDocument 
        onOpenChild={() => setShowChildPaper(true)}
        onCloseChild={() => setShowChildPaper(false)}
        isChildOpen={showChildPaper}
      />

      {/* Child Paper with all its features */}
      {showChildPaper && (
        <ChildDocument 
          width={980}
        />
      )}
    </div>
  );
} 
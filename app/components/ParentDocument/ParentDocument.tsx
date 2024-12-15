'use client';

import Paper from '../shared/Paper';
import Button from '../shared/Button';

interface ParentDocumentProps {
  onOpenChild: () => void;
  onCloseChild: () => void;
  isChildOpen: boolean;
}

export default function ParentDocument({ onOpenChild, onCloseChild, isChildOpen }: ParentDocumentProps) {
  return (
    <Paper 
      onClick={isChildOpen ? onCloseChild : undefined}
      className="mx-auto max-w-[calc(100vw-32px)] md:max-w-[calc(100vw-64px)] lg:max-w-[calc(100vw-128px)]"
      style={{
        width: isChildOpen ? '936px' : '940px',
      }}
    >
      <div className="absolute p-4 sm:p-6 md:p-8 lg:p-[32px]">
        <Button 
          size="large" 
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onOpenChild();
          }}
          className="w-full sm:w-auto"
        >
          Open Child Document
        </Button>
      </div>
    </Paper>
  );
} 
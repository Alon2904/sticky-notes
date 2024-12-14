interface SmallPaperProps {
  pillPosition: number;
}

export default function SmallPaper({ pillPosition }: SmallPaperProps) {
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
    />
  );
} 
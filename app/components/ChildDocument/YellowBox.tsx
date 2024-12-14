export default function YellowBox() {
  return (
    <>
      {/* Main yellow rectangle */}
      <div
        style={{
          position: 'absolute',
          left: '36px',
          top: '-4px',
          width: '134px',
          height: '45px',
          backgroundColor: 'rgba(254, 224, 178, 1)',
          borderRadius: '0px 0px 4px 4px',
          opacity: 1,
          zIndex: 1,
        }}
      />
      
      {/* Triangle decoration - using a square cut diagonally */}
      <div
        style={{
          position: 'absolute',
          left: '32px',
          top: '-4px',
          width: '4px',
          height: '4px',
          backgroundColor: 'rgba(229, 202, 161, 1)',
          opacity: 1,
          clipPath: 'polygon(100% 100%, 100% 0, 0 100%)',
          zIndex: 1,
        }}
      />
    </>
  );
} 
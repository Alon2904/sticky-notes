interface HeaderBoxProps {
  color: string;
}

export default function HeaderBox({ color }: HeaderBoxProps) {
  // Darken the color slightly for the triangle
  const triangleColor = color === 'var(--tag-yellow)' ? 'rgba(229, 202, 161, 1)' :
                       color === 'var(--tag-peach)' ? 'rgba(255, 200, 183, 1)' :
                       'rgba(207, 191, 255, 1)'; // for purple

  return (
    <>
      {/* Main colored rectangle */}
      <div
        style={{
          position: 'absolute',
          left: '36px',
          top: '-4px',
          width: '134px',
          height: '45px',
          backgroundColor: color,
          borderRadius: '0px 0px 4px 4px',
          opacity: 1,
          zIndex: 1,
        }}
      />
      
      {/* Triangle decoration */}
      <div
        style={{
          position: 'absolute',
          left: '32px',
          top: '-4px',
          width: '4px',
          height: '4px',
          backgroundColor: triangleColor,
          opacity: 1,
          clipPath: 'polygon(100% 100%, 100% 0, 0 100%)',
          zIndex: 1,
        }}
      />
    </>
  );
} 
import React, { useState } from 'react';
import { Card } from '@mui/material';

const TiltCard = ({
  children,
  backgroundColor = '#1c1f26',
  textColor = '#e0e0e0',
  spotlightColor = 'rgba(141, 232, 252, 0.4)',
  spotlightSize = 150,
  tiltIntensity = 10,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setMousePosition({ x, y });
  };

  const getBackgroundStyles = () => {
    if (!isHovered) {
      return { background: backgroundColor };
    }
    const xPercent = mousePosition.x * 100;
    const yPercent = mousePosition.y * 100;
    return {
      background: `radial-gradient(circle at ${xPercent}% ${yPercent}%, ${spotlightColor}, rgba(0, 0, 0, 0) ${spotlightSize}px)`,
    };
  };

  const getTransformStyles = () => {
    const rotateX = (mousePosition.y - 0.5) * tiltIntensity;
    const rotateY = (mousePosition.x - 0.5) * -tiltIntensity;
    return {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    };
  };

  return (
    <Card
      sx={{
        backgroundColor,
        color: textColor,
        padding: '20px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        height: '80%',
        transition: 'transform 0.1s, background 0.1s',
        ...getBackgroundStyles(),
        ...getTransformStyles(),
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0.5, y: 0.5 });
      }}
    >
      {children}
    </Card>
  );
};

export default TiltCard;

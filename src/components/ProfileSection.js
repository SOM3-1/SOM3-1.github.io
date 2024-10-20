import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EducationWork } from './EducationWork';
import { UseableButtons } from './Buttons';
import Skills from './Skills';
import { AboutMe } from './AboutMe';

const ProfileSection = () => {
  const { scrollYProgress } = useScroll();
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['30%', '80%']);

  const [position, setPosition] = useState(getRandomPosition());

  function getRandomPosition() {
    return {
      x: Math.random() * (window.innerWidth - 50),
      y: Math.random() * (window.innerHeight - 50),
    };
  }

  function moveBallFarAway(mouseX, mouseY) {
    const offsetX = (Math.random() > 0.5 ? 1 : -1) * (300 + Math.random() * 200);
    const offsetY = (Math.random() > 0.5 ? 1 : -1) * (300 + Math.random() * 200);

    setPosition({
      x: Math.min(Math.max(mouseX + offsetX, 0), window.innerWidth - 50),
      y: Math.min(Math.max(mouseY + offsetY, 0), window.innerHeight - 50),
    });
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const distance = Math.sqrt(
        Math.pow(mouseX - (position.x + 12.5), 2) + Math.pow(mouseY - (position.y + 12.5), 2)
      );

      if (distance < 100) {
        moveBallFarAway(mouseX, mouseY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [position]);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      sx={{ padding: '80px 20px', backgroundColor: '#0d1117', minHeight: '100vh', position: 'relative' }}
      id="profile"
    >
      <Box
        component={motion.div}
        style={{ height: lineHeight }}
        sx={{
          position: 'absolute',
          left: '5%',
          top: '10%',
          width: '2px',
          background: 'linear-gradient(180deg, rgba(124, 114, 255, 1), rgba(63, 185, 80, 1))',
          filter: 'blur(1px)',
          zIndex: 1,
        }}
      />

      <Box
        component={motion.div}
        animate={{ x: position.x, y: position.y }}
        transition={{
          duration: 0.1,
          ease: 'easeOut',
        }}
        sx={{
          position: 'absolute',
          width: '25px',
          height: '25px',
          borderRadius: '50%',
          background: 'rgba(124, 114, 255, 0.9)',
          filter: 'blur(4px)',
          filter: 'drop-shadow(0 0 10px rgba(255, 255, 0, 0.8))',
          zIndex: 1,
          cursor: 'pointer',
        }}
      />

      <Container>
        <AboutMe />
        <UseableButtons />
        <Skills />
        <EducationWork />
      </Container>
    </Box>
  );
};

export default ProfileSection;

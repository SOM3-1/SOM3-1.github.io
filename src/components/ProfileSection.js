import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EducationWork } from './EducationWork';
import { UseableButtons } from './Buttons';

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
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h1"
              sx={{
                fontSize: '3rem',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '1.5rem',
                textShadow: '0px 0px 10px rgba(124, 114, 255, 0.8)',
              }}
            >
              Dushyanth N <br /> Gowda
            </Typography>

            <Box sx={{ color: '#ffffff', zIndex: 2, position: 'relative' }}>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', color: '#e0e0e0', marginBottom: '1rem' }}>
                <strong>About Me:</strong> Hi, I'm Dushyanth N Gowda, a passionate software engineer with 5 years of experience in front-end, mobile, and software development. Currently, I'm pursuing a Master's in Software Engineering at UT Arlington. I specialize in building scalable applications using React, TypeScript, JavaScript, and Java, focusing on enhancing user experiences and optimizing workflows.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', color: '#e0e0e0', marginBottom: '1rem' }}>
                My journey has taken me from building large-scale healthcare solutions to creating high-quality web and mobile applications across various industries. I’m passionate about exploring new technologies and tackling complex problems. When I’m not coding, I enjoy playing football, gaming, or I'm always on Spotify.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              style={{ position: 'relative', zIndex: 2 }}
            >
              <Box
                component="img"
                src="/dush.png"
                alt="Dushyanth N Gowda"
                sx={{
                  width: '100%',
                  maxWidth: '300px',
                  height: 'auto',
                  borderRadius: '50%',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                }}
              />
            </motion.div>
          </Grid>
        </Grid>

        <UseableButtons />

        <EducationWork />
      </Container>
    </Box>
  );
};

export default ProfileSection;

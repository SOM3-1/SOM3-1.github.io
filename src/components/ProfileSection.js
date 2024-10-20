import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Button, Link as MuiLink } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

const ProfileSection = () => {
  const { scrollYProgress } = useScroll();
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['20%', '80%']);

  const [position, setPosition] = useState(getRandomPosition());

  function getRandomPosition() {
    return {
      x: Math.random() * (window.innerWidth - 50),
      y: Math.random() * (window.innerHeight - 50),
    };
  }

  useEffect(() => {
    const moveBall = () => {
      setPosition(getRandomPosition());
    };
    const interval = setInterval(moveBall, 3000);
    return () => clearInterval(interval);
  }, []);

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
          duration: 3,
          ease: 'easeInOut',
        }}
        sx={{
          position: 'absolute',
          width: '25px',
          height: '25px',
          borderRadius: '50%',
          background: 'rgba(124, 114, 255, 0.9)',
          filter: 'blur(4px)',
          zIndex: 1,
        }}
      />

      <Container>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ color: '#ffffff', paddingLeft: '100px', zIndex: 2, position: 'relative' }}>
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
                Dushyanth N Gowda
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontSize: '1.5rem',
                  color: '#c0c0c0',
                  marginBottom: '1.5rem',
                  fontStyle: 'italic',
                }}
              >
                Master's Student in Software Engineering at UT Arlington
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', color: '#e0e0e0', marginBottom: '1rem' }}>
                <strong>About Me:</strong> I am a front-end and mobile developer with 5 years of experience in building scalable applications using <strong>React, TypeScript,</strong> and <strong>JavaScript</strong>. Currently pursuing a Master's in Software Engineering at <strong>UT Arlington</strong>.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', color: '#e0e0e0', marginBottom: '1rem' }}>
                <strong>Education:</strong> <br />
                <strong>University of Texas at Arlington</strong>, Master's in Software Engineering (Aug 2024 – Present) <br />
                <strong>Jain University</strong>, Bachelor's in Computer Science (Aug 2015 – Jul 2019)
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', color: '#e0e0e0', marginBottom: '1rem' }}>
                <strong>Work Experience:</strong> <br />
                <strong>Version 1:</strong> React Developer – Aug 2022 – Aug 2024 <br />
                <strong>Cerner Healthcare Solutions:</strong> Software Engineer 2 – Jul 2021 – Aug 2022, Software Engineer 1 – Jul 2019 – Jul 2021, Software Engineer Intern – Feb 2019 – Jul 2019
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  href="/Dushyanth_Gowda_Resume.pdf"
                  download
                  sx={{ mr: 2, textTransform: 'none', fontSize: '1rem' }}
                >
                  Download Resume
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  href="mailto:dxg6620@mavs.uta.edu"
                  sx={{ textTransform: 'none', fontSize: '1rem', color: '#e0e0e0', borderColor: '#e0e0e0' }}
                >
                  Contact Me
                </Button>
              </Box>
              <Box sx={{ mt: 4, fontSize: '1.1rem' }}>
                <MuiLink href="https://github.com/SOM3-1" color="#e0e0e0" underline="always" sx={{ mr: 3 }}>
                  GitHub
                </MuiLink>
                <MuiLink href="https://linkedin.com/in/dushyanth-n-gowda-672b7b170/" color="#e0e0e0" underline="always">
                  LinkedIn
                </MuiLink>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
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
                sx={{ width: '100%', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfileSection;

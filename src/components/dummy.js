import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const TiltCard = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setMousePosition({ x, y });
  };

  const getTransformStyles = () => {
    const rotateX = (mousePosition.y - 0.5) * 10; // Adjusts tilt intensity
    const rotateY = (mousePosition.x - 0.5) * -10;
    return {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      boxShadow: `${(mousePosition.x - 0.5) * 20}px ${(mousePosition.y - 0.5) * 20}px 40px rgba(0, 255, 0, 0.4)`,
    };
  };

  return (
    <Card
      sx={{
        backgroundColor: '#1c1f26',
        color: '#e0e0e0',
        padding: '20px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        height: '80%',
        transition: 'transform 0.1s, box-shadow 0.1s',
        ...getTransformStyles(),
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0.5, y: 0.5 })} // Reset to center when mouse leaves
    >
      {children}
    </Card>
  );
};

export const EducationWork = () => {
  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ color: '#ffffff', marginBottom: '1rem' }}>
        Education & Work Experience
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <TiltCard>
            <CardContent sx={{ flexGrow: 1, paddingBottom: '16px' }}>
              <Typography variant="h5" sx={{ color: '#ffffff', marginBottom: '0.5rem' }}>
                Education
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>University of Texas at Arlington</strong>
                <br />
                Master's in Software Engineering (Aug 2024 – Present)
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Jain University</strong>
                <br />
                Bachelor's in Computer Science (Aug 2015 – Jul 2019)
              </Typography>
            </CardContent>
          </TiltCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <TiltCard>
            <CardContent sx={{ flexGrow: 1, paddingBottom: '16px' }}>
              <Typography variant="h5" sx={{ color: '#ffffff', marginBottom: '0.5rem' }}>
                Work Experience
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Version 1</strong>
                <br />
                React Developer – Aug 2022 – Aug 2024
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Cerner Healthcare Solutions</strong>
                <br />
                Software Engineer 2 – Jul 2021 – Aug 2022
                <br />
                Software Engineer 1 – Jul 2019 – Jul 2021
                <br />
                Software Engineer Intern – Feb 2019 – Jul 2019
              </Typography>
            </CardContent>
          </TiltCard>
        </Grid>
      </Grid>
    </Box>
  );
};

import React from 'react';
import { Box, Typography, Grid, CardContent } from '@mui/material';
import TiltCard from './TiltCard'; 

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

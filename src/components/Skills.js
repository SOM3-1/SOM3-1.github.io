import React from 'react';
import { Box, Typography, Grid, CardContent } from '@mui/material';
import TiltCard from './TiltCard';
import { FaJs, FaJava, FaReact, FaHtml5, FaCss3Alt} from 'react-icons/fa'; 
import { SiTypescript, SiAngular, SiMysql, SiFirebase, SiApache,SiMicrosoftazure,SiD3Dotjs } from 'react-icons/si';

const skillsData = [
  { name: 'React.js', icon: <FaReact size={40} /> },
  { name: 'JavaScript', icon: <FaJs size={40} /> },
  { name: 'TypeScript', icon: <SiTypescript size={40} /> },
  { name: 'Angular', icon: <SiAngular size={40} /> },
  { name: 'Java', icon: <FaJava size={40} /> },
  { name: 'MySQL', icon: <SiMysql size={40} /> },
  { name: 'Firebase', icon: <SiFirebase size={40} /> },
  { name: 'Azure', icon: <SiMicrosoftazure size={40} /> },
  { name: 'HTML', icon: <FaHtml5 size={40} /> },
  { name: 'CSS', icon: <FaCss3Alt size={40} /> },
  { name: 'Maven', icon: <SiApache size={40} /> }, 
  { name: 'D3.js', icon: <SiD3Dotjs size={40} /> }, 
  
];

const Skills = () => {
  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ color: '#ffffff', marginBottom: '1rem' }}>
        Skills
      </Typography>
      <Grid container spacing={3}>
        {skillsData.map((skill, index) => (
          <Grid item xs={12} sm={6} md={2} key={index}>
            <TiltCard spotlightSize={60}>
              <CardContent
                sx={{
                  textAlign: 'center',
                  minHeight: '10px', 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ mb: 1 }}>{skill.icon}</Box>
                <Typography variant="h6" sx={{ color: '#ffffff' }}>
                  {skill.name}
                </Typography>
              </CardContent>
            </TiltCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Skills;

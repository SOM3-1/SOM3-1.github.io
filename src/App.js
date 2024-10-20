import React from 'react';
import ProfileSection from './components/ProfileSection';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const HomePage = () => (
  <ThemeProvider theme={theme}>
    <ProfileSection />
  </ThemeProvider>
);

export default HomePage;

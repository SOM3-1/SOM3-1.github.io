// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0d1117',
    },
    primary: {
      main: '#58a6ff', // Accent color similar to GitHub's neon blue
    },
    secondary: {
      main: '#1f6feb',
    },
    text: {
      primary: '#c9d1d9',
      secondary: '#8b949e',
    },
    typography: {
        fontFamily: 'Poppins, Arial, sans-serif',
      },
  },
});

export default theme;

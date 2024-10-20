import React from 'react';
import { Box, Button } from '@mui/material';

export const UseableButtons = () => {
    return (
        <Box sx={{ mt: 4, textAlign: 'center', display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
            <Button
                variant="contained"
                color="primary"
                href="https://www.linkedin.com/in/dushyanth-n-gowda-672b7b170/"
                sx={{
                    textTransform: 'none',
                    fontSize: '1.2rem',
                    padding: '12px 24px',
                    backgroundColor: '#6f42c1',
                    color: 'white', // Set text color to white
                    '&:hover': {
                        backgroundColor: '#5a34a0',
                    },
                }}
            >
                LinkedIn
            </Button>
            <Button
                variant="contained"
                color="primary"
                href="https://github.com/SOM3-1"
                sx={{
                    textTransform: 'none',
                    fontSize: '1.2rem',
                    padding: '12px 24px',
                    backgroundColor: '#6f42c1',
                    color: 'white', // Set text color to white
                    '&:hover': {
                        backgroundColor: '#5a34a0',
                    },
                }}
            >
                GitHub
            </Button>
            <Button
                variant="outlined"
                color="primary"
                href="mailto:dxg6620@mavs.uta.edu"
                sx={{
                    textTransform: 'none',
                    fontSize: '1.2rem',
                    padding: '12px 24px',
                    borderColor: '#6f42c1',
                    color: 'white',
                    '&:hover': {
                        borderColor: '#5a34a0',
                        color: '#5a34a0',
                    },
                }}
            >
                Contact Me
            </Button>
            <Button
                variant="outlined"
                color="primary"
                href="/Dushyanth_Gowda_Resume.pdf"
                download
                sx={{
                    textTransform: 'none',
                    fontSize: '1.2rem',
                    padding: '12px 24px',
                    borderColor: '#6f42c1',
                    color: 'white',
                    '&:hover': {
                        borderColor: '#5a34a0',
                        color: '#5a34a0',
                    },
                }}
            >
                Download Resume
            </Button>
        </Box>
    );
};

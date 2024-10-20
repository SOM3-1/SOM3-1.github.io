import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
export const AboutMe = () => {
    return (
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
                        filter: 'drop-shadow(0 0 1px rgba(255, 255, 0, 0.8))',
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
        </Grid>)
}
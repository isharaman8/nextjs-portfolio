import { Avatar, Box, Button, Typography } from '@mui/material'
import ColorModeContext from '../components/ColorModeContext'
import * as React from 'react'
import styles from '../styles/About.module.css'
import { useTheme } from '@emotion/react'

function About() {
    const colorMode = React.useContext(ColorModeContext)
    const theme: any = useTheme()
    return (
        <Box
            sx={{
                marginTop: '100px',
                height: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
                flexDirection: 'column',
            }}
        >
            <Avatar
                style={{
                    width: '200px',
                    height: '200px',
                    borderColor:
                        theme.palette.mode === 'dark' ? 'white' : '#1976d2',
                    borderWidth: 3,
                    borderStyle: 'solid',
                }}
                src={
                    'https://content.fortune.com/wp-content/uploads/2022/04/Anonymous-Hacker-Group-Mask-GettyImages-1229478612.jpg'
                }
            />
            <Box sx={{ flex: 1, zIndex: 5 }}>
                <Typography
                    variant="h1"
                    component="h1"
                    style={{ textAlign: 'center' }}
                >
                    About Me
                </Typography>
                <p className={styles.innerPTag}>
                    Hey, I am Aman Kumar. I'm an aspiring Web Developer. I have
                    a serious passion for building amazing web applications.
                </p>
                <p className={styles.innerPTag}>
                    I am skilled in developing web apps using the MERN stack and
                    I've built many amazing projects which you can see below.
                </p>
                <p className={styles.innerPTag}>Apart from coding, I love:</p>
                <ul className={styles.innerPTag} style={{ paddingLeft: 50 }}>
                    <li>🎧 Listening to music</li>
                    <li>📚 Reading books</li>
                    <li>📝 Solving DS Algo</li>
                </ul>
            </Box>
        </Box>
    )
}

export default About

import { Avatar, Box, Button, Typography } from '@mui/material'
import * as React from 'react'
import { useTheme } from '@emotion/react'

import styles from '../styles/About.module.scss'
import ColorModeContext from '../components/ColorModeContext'
import { FONT_SIZES } from '../constants/fontsSize'
import { styled } from '@mui/material/styles'

const CustomTypography = styled(Typography)`
    font-size: ${FONT_SIZES.about.pFont.lg};
    text-align: center;
    width: 80%;
    margin: auto;

    @media only screen and (max-width: 1200px) {
        & {
            font-size: ${FONT_SIZES.about.pFont.md};
        }
    }

    @media only screen and (max-width: 900px) {
        & {
            font-size: ${FONT_SIZES.about.pFont.xs};
        }
    }
`

function About() {
    const colorMode = React.useContext(ColorModeContext)
    const theme: any = useTheme()
    return (
        <Box
            sx={{
                marginTop: { lg: `100px`, xs: `180px` },
                height: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
                flexDirection: 'column',
            }}
        >
            <Avatar
                sx={{
                    width: {
                        lg: `200px`,
                        xs: `150px`,
                    },
                    height: {
                        lg: `200px`,
                        xs: `150px`,
                    },
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
                    sx={{
                        textAlign: 'center',
                        fontSize: {
                            lg: FONT_SIZES.about.h1.lg,
                            md: FONT_SIZES.about.h1.md,
                            xs: FONT_SIZES.about.h1.xs,
                        },
                        marginBottom: {
                            xs: `20px`,
                        },
                    }}
                >
                    About Me
                </Typography>
                <CustomTypography>
                    Hey, I am Aman Kumar. I'm an aspiring Web Developer. I have
                    a serious passion for building amazing web applications.
                </CustomTypography>
                <CustomTypography>
                    I am skilled in developing web apps using the MERN stack and
                    I've built many amazing projects which you can see below.
                </CustomTypography>
                <CustomTypography>Apart from coding, I love:</CustomTypography>
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

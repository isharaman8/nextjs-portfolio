import { Avatar, Box, Button, Typography } from '@mui/material'
import * as React from 'react'
import { useTheme } from '@emotion/react'
import { styled } from '@mui/material/styles'

import styles from '../../styles/About.module.scss'
import ColorModeContext from '../ColorModeContext'
import { FONT_SIZES } from '../../constants/fontsSize'
import PageSwapMotion from '../PageSwapMotion'
import { motion } from 'framer-motion'

const CustomTypography = styled(Typography)`
    font-size: ${FONT_SIZES.about.pFont.lg};
    width: 50%;
    margin: 15px auto;
    text-align: justify;

    @media only screen and (max-width: 1200px) {
        & {
            font-size: ${FONT_SIZES.about.pFont.md};
        }
    }

    @media only screen and (max-width: 900px) {
        & {
            font-size: ${FONT_SIZES.about.pFont.xs};
            text-align: justify;
        }
    }
`

function About() {
    const colorMode = React.useContext(ColorModeContext)

    const theme: any = useTheme()
    return (
        <PageSwapMotion>
            <Box
                component="div"
                id="about"
                sx={{
                    marginTop: { lg: `140px`, xs: `20vh` },
                    minHeight: { lg: `80vh`, xs: `70vh` },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                    flexDirection: 'column',
                    overflowY: { xs: `visible`, lg: `visible` },
                    // backgroundColor: `red`
                }}
            >
                <Avatar
                    sx={{
                        width: {
                            lg: `200px`,
                            xs: `120px`,
                        },
                        height: {
                            lg: `200px`,
                            xs: `120px`,
                        },
                        borderColor:
                            theme.palette.mode === 'dark' ? 'white' : '#212121',
                        borderWidth: 3,
                        borderStyle: 'solid',
                    }}
                    src="/static/personal.png"
                />
                <Box
                    component="div"
                    sx={{
                        flex: 1,
                        zIndex: 5,
                        // backgroundColor: `red`,
                        width: `100vw`,
                    }}
                >
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            textAlign: 'center',
                            fontSize: {
                                ...FONT_SIZES.about.h1,
                            },
                            marginBottom: {
                                xs: `20px`,
                                md: `0`,
                            },
                        }}
                    >
                        About Me
                    </Typography>
                    <CustomTypography>
                        Hey, I am Aman Kumar. I&apos;m an aspiring Web
                        Developer. I have a serious passion for building amazing
                        web applications.
                    </CustomTypography>
                    <CustomTypography>
                        I am skilled in developing web apps using the MERN stack
                        and I&apos;ve built many amazing projects which you can
                        see below.
                    </CustomTypography>
                    <CustomTypography>
                        Apart from coding, I love:
                    </CustomTypography>
                    <ul
                        className={styles.innerPTag}
                        style={{ paddingLeft: 50 }}
                    >
                        <li>🎧 Listening to music</li>
                        <li>📚 Reading books</li>
                        <li>📝 Solving DS Algo</li>
                    </ul>
                    {/* <Box
                        component="div"
                        sx={{
                            width: `fit-content`,
                            margin: `auto`,
                        }}
                    > */}
                    <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 1 }}
                        className={styles.resumeButton}
                        href="https://drive.google.com/file/d/1ShvQIBNrALbSNi4c1Ibdg1yd7KlAp4tV/view?usp=sharing"
                        target="_blank"
                        style={{
                            border:
                                theme.palette.mode === 'dark'
                                    ? `2px solid white`
                                    : `2px solid black`,
                        }}
                    >
                        Resume
                    </motion.a>
                    {/* </Box> */}
                </Box>
            </Box>
        </PageSwapMotion>
    )
}

export default About

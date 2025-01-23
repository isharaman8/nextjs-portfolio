// third party imports
import * as React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@emotion/react'
import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

// inner imports
import PageSwapMotion from '../PageSwapMotion'
import ColorModeContext from '../ColorModeContext'
import styles from '../../styles/About.module.scss'
import { FONT_SIZES } from '../../constants/fontsSize'

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
                        Hi, I'm Aman Kumar, an aspiring web developer with a
                        deep passion for building innovative and impactful web
                        applications. With a solid foundation in the MERN stack
                        (MongoDB, Express.js, React, and Node.js), I specialize
                        in creating scalable and efficient solutions. My journey
                        in web development has allowed me to work on several
                        exciting projects, including a freelancing restaurant
                        management app and Node.js and Python projects tailored
                        to solar-based companies. Each project has been a
                        valuable learning experience, sharpening my skills and
                        reinforcing my commitment to excellence.
                    </CustomTypography>
                    <CustomTypography>
                        Beyond coding, I enjoy indulging in activities that fuel
                        my creativity and problem-solving mindset:
                    </CustomTypography>
                    <Box
                        component="ul"
                        className={styles.innerPTag}
                        sx={{
                            paddingLeft: 5,
                            fontSize: FONT_SIZES.about.pFont,
                        }}
                    >
                        <Box component="li">
                            🎧 Exploring diverse music genres, from soothing
                            instrumentals to energetic beats
                        </Box>
                        <Box component="li">
                            📚 Diving into insightful books, spanning fiction,
                            technology, and personal growth
                        </Box>
                        <Box component="li">
                            📝 Tackling challenging data structures and
                            algorithms to sharpen problem-solving skills
                        </Box>
                        <Box component="li">
                            🌍 Exploring new places and cultures to broaden my
                            perspective
                        </Box>
                        <Box component="li">
                            🎮 Playing video games to unwind and recharge
                            creatively
                        </Box>
                        <Box component="li">
                            💻 Experimenting with new web technologies and
                            frameworks
                        </Box>
                        <Box component="li">
                            ☕ Enjoying a good cup of coffee while brainstorming
                            ideas
                        </Box>
                    </Box>

                    <CustomTypography>
                        Take a look below to explore my work and see how I bring
                        ideas to life with code!
                    </CustomTypography>
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
                        href="https://drive.google.com/file/d/1t3eEWgg4HnnEwaNx1PQthWDt6pwmZ-9V/view?usp=drive_link"
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

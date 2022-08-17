// THIRD PARTY IMPORTS
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import ThreeComponent from '../ThreeComponent'
import PageSwapMotion from '../PageSwapMotion'
import styles from '../../styles/Home.module.scss'
import { FONT_SIZES } from '../../constants/fontsSize'

const Home: NextPage = () => {
    const textRef = useRef<HTMLHeadingElement>(null)

    return (
        <PageSwapMotion>
            <Box
                component="div"
                id="home"
                sx={{
                    height: `100vh`,
                    width: `100vw`,
                    overflowY: `hidden`,
                    scrollBarWidth: 'none',
                }}
            >
                <Box
                    component="div"
                    sx={{
                        height: `100vh`,
                        display: `flex`,
                        zIndex: 5,
                        justifyContent: `center`,
                        alignItems: `center`,
                        flexDirection: `column`,
                        overflow: `hidden`,
                    }}
                >
                    <ThreeComponent />
                    <Box
                        component="div"
                        sx={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection: 'column',
                            padding: '20px',
                            width: `100vw`,
                            // backgroundColor: `red`,
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: {
                                    ...FONT_SIZES.index.h2,
                                },
                                width: { xs: `80%`, md: `50%` },
                                textAlign: `center`,
                            }}
                        >
                            Hi There
                        </Typography>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: {
                                    ...FONT_SIZES.index.h1,
                                },
                                width: { xs: `80%`, md: `50%` },
                                textAlign: 'center',
                            }}
                        >
                            I&apos;m Aman Kumar
                        </Typography>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: {
                                    ...FONT_SIZES.index.h2,
                                },
                                marginTop: 1,
                                width: { xs: `80%`, md: `50%` },
                                textAlign: 'center',
                            }}
                        >
                            Full Stack Web Developer
                        </Typography>
                        <Typography
                            component="p"
                            sx={{
                                textAlign: 'center',
                                fontSize: {
                                    ...FONT_SIZES.index.pFont,
                                },
                                marginTop: 2,
                                width: { xs: `80%`, md: `50%` },
                            }}
                        >
                            A computer enthusiast who loves creating websites
                            and exploring emerging web technologies.
                        </Typography>
                        {/* <h1 ref={textRef}></h1> */}
                    </Box>
                </Box>
            </Box>
        </PageSwapMotion>
    )
}

export default Home
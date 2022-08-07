// THIRD PARTY IMPORTS
import { Grow, Theme, Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useTransform,
} from 'framer-motion'

import Home from '../components/MainComponents/homepage'
import About from '../components/MainComponents/about'
import Tech from '../components/MainComponents/tech'
import Projects from '../components/MainComponents/projects'
import Contact from '../components/MainComponents/contact'
import { useTheme } from '@emotion/react'
import { DARKTHEME, LIGHTTHEME } from '../constants/themeColor'
import Head from 'next/head'

const Index: NextPage = () => {
    const theme: any = useTheme()
    const {
        palette: { mode },
    } = theme
    const x = useMotionValue(0)
    const background = useTransform(
        x,
        [-100, 0, 100],
        ['#a0d', 'rgba(0,0,0,0)', '#0bf']
    )

    return (
        <Box
            component={'div'}
            sx={{
                transition: `all .3s ease`,
                backgroundColor:
                    mode === 'dark' ? DARKTHEME.background.default : 'white',
            }}
        >
            <Head>
                <title>Aman Kumar</title>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/assets/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/assets/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/assets/favicon-16x16.png"
                />
                <link rel="manifest" href="/assets/site.webmanifest" />
            </Head>
            <Home />
            <About />
            <Tech />
            <Projects />
            <Contact />
        </Box>
    )
}

export default Index

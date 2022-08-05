// THIRD PARTY IMPORTS
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import ThreeComponent from '../components/ThreeComponent'
import PageSwapMotion from '../components/PageSwapMotion'
import styles from '../styles/Home.module.scss'
import { FONT_SIZES } from '../constants/fontsSize'
import Home from './homepage'
import About from './about'
import Tech from './tech'
import Projects from './projects'
import Contact from './contact'
import SmoothScroll from '../components/SmoothScroll'

const Index: NextPage = () => {
    const textRef = useRef<HTMLHeadingElement>(null)

    return (
        <>
            <Home />
            <About />
            <Tech />
            <Projects />
            <Contact />
        </>
    )
}

export default Index

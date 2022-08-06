// THIRD PARTY IMPORTS
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import Home from '../components/MainComponents/homepage'
import About from '../components/MainComponents/about'
import Tech from '../components/MainComponents/tech'
import Projects from '../components/MainComponents/projects'
import Contact from '../components/MainComponents/contact'

const Index: NextPage = () => {
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

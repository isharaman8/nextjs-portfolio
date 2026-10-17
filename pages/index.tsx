// THIRD PARTY IMPORTS
import Head from 'next/head'
import type { NextPage } from 'next'
import { Box, Container, Typography } from '@mui/material'

import Home from '../components/MainComponents/homepage'
import About from '../components/MainComponents/about'
import Experience from '../components/MainComponents/experience'
import Skills from '../components/MainComponents/skills'
import Projects from '../components/MainComponents/projects'
import Contact from '../components/MainComponents/contact'
import { PROFILE } from '../constants/profile'

const SITE_URL = 'https://aman-portfolio-eight.vercel.app/'
const SITE_TITLE = 'Aman Kumar | Backend Engineer'
const SITE_DESCRIPTION =
    'Aman Kumar is a backend engineer (SDE 2) in Bengaluru building microservices in Go, Node.js and TypeScript.'

function Footer() {
    return (
        <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', py: 4 }}>
            <Container maxWidth="lg">
                <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                    {PROFILE.name} · {PROFILE.location} · Built with Next.js
                </Typography>
            </Container>
        </Box>
    )
}

const Index: NextPage = () => {
    return (
        <Box component="div" sx={{ overflowX: 'hidden' }}>
            <Head>
                <title>{SITE_TITLE}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content={SITE_DESCRIPTION} />
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
                {/* META TAGS */}
                <meta name="theme-color" content="#0b0d10" />
                <meta name="author" content="Aman Kumar" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={SITE_TITLE} />
                <meta property="og:url" content={SITE_URL} />
                <meta property="og:site_name" content={SITE_TITLE} />
                <meta property="og:description" content={SITE_DESCRIPTION} />
                <meta
                    property="og:image"
                    content={`${SITE_URL}assets/android-chrome-512x512.png`}
                />
                <link rel="canonical" href={SITE_URL} />
                <meta
                    name="keywords"
                    content="Aman Kumar, isharaman8, backend engineer, Go, Node.js, TypeScript, microservices, Bengaluru"
                />
                <meta
                    name="google-site-verification"
                    content="Do8q9qBHh0IhisMKgy6X3ocvFOeT099KRpeDLRNQGDk"
                />
            </Head>
            <Home />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
        </Box>
    )
}

export default Index

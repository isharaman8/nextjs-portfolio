// THIRD PARTY IMPORTS

import { Box } from '@mui/system'
import type { NextPage } from 'next'

import Home from '../components/MainComponents/homepage'
import About from '../components/MainComponents/about'
import Tech from '../components/MainComponents/tech'
import Projects from '../components/MainComponents/projects'
import Contact from '../components/MainComponents/contact'
import { useTheme } from '@emotion/react'
import { DARKTHEME } from '../constants/themeColor'
import Head from 'next/head'

const Index: NextPage = () => {
    const theme: any = useTheme()
    const {
        palette: { mode },
    } = theme

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
                {/* META TAGS */}
                <meta name="theme-color" content="#000000" />
                <meta name="author" content="Aman Kumar" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Aman Kumar | Web Developer"
                />
                <meta
                    property="og:url"
                    content="https://aman-portfolio-eight.vercel.app/"
                />
                <meta
                    property="og:site_name"
                    content="Aman Kumar | Web Developer"
                />
                <meta
                    property="og:description"
                    content="Portfolio of Aman Kumar, a Web Developer from Jammu and Kashmir, India"
                />
                <meta property="og:image" content="" />
                <link
                    rel="canonical"
                    href="https://aman-portfolio-eight.vercel.app/"
                />
                <meta
                    name="keywords"
                    content="Aman Kumar, isharaman8, Aman Portfolio, Aman Kumar Jammu, web developer, Aman"
                />
                <meta
                    name="google-site-verification"
                    content={process.env.GOOGLE_CRED}
                />
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

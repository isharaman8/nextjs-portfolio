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
import { SEO, SITE_URL, STRUCTURED_DATA } from '../constants/seo'

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
        <>
            <Head>
                <title>{SEO.title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content={SEO.description} />
                <meta name="keywords" content={SEO.keywords} />
                <meta name="author" content={PROFILE.name} />
                <meta
                    name="robots"
                    content="index, follow, max-image-preview:large, max-snippet:-1"
                />
                <link rel="canonical" href={SITE_URL} />
                <meta name="theme-color" content="#0b0d10" />
                <meta
                    name="google-site-verification"
                    content="Do8q9qBHh0IhisMKgy6X3ocvFOeT099KRpeDLRNQGDk"
                />

                {/* ICONS */}
                <link rel="icon" href="/assets/favicon.ico" sizes="any" />
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
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/assets/apple-touch-icon.png"
                />
                <link rel="manifest" href="/assets/site.webmanifest" />

                {/* OPEN GRAPH (LinkedIn, WhatsApp, Slack, Facebook previews) */}
                <meta property="og:type" content="profile" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:url" content={SITE_URL} />
                <meta property="og:site_name" content={SEO.siteName} />
                <meta property="og:title" content={SEO.title} />
                <meta property="og:description" content={SEO.description} />
                <meta property="og:image" content={SEO.image} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content={SEO.imageAlt} />
                <meta property="profile:first_name" content="Aman" />
                <meta property="profile:last_name" content="Kumar" />
                <meta property="profile:username" content="isharaman8" />

                {/* TWITTER / X */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={SEO.title} />
                <meta name="twitter:description" content={SEO.description} />
                <meta name="twitter:image" content={SEO.image} />
                <meta name="twitter:image:alt" content={SEO.imageAlt} />

                {/* STRUCTURED DATA */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(STRUCTURED_DATA),
                    }}
                />
            </Head>
            <Box component="main" sx={{ overflowX: 'hidden' }}>
                <Home />
                <About />
                <Experience />
                <Skills />
                <Projects />
                <Contact />
            </Box>
            <Footer />
        </>
    )
}

export default Index

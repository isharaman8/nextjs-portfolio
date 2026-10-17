// THIRD PARTY IMPORTS
import Head from 'next/head'
import type { GetStaticProps, NextPage } from 'next'
import { Box } from '@mui/material'

import Home from '../components/MainComponents/homepage'
import About from '../components/MainComponents/about'
import Experience from '../components/MainComponents/experience'
import Skills from '../components/MainComponents/skills'
import Projects from '../components/MainComponents/projects'
import Blog from '../components/MainComponents/blog'
import Contact from '../components/MainComponents/contact'
import Footer from '../components/Footer'
import { PROFILE } from '../constants/profile'
import { SEO, SITE_URL, STRUCTURED_DATA } from '../constants/seo'
import { listPublishedPosts } from '../lib/posts'
import type { PostSummary } from '../lib/postTypes'

interface IProps {
    latestPosts: PostSummary[]
}

const Index: NextPage<IProps> = ({ latestPosts }) => {
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
                <Blog posts={latestPosts} />
                <Contact />
            </Box>
            <Footer />
        </>
    )
}

// Admin saves revalidate this page on demand; the interval is only a fallback
export const getStaticProps: GetStaticProps<IProps> = async () => {
    const latestPosts = await listPublishedPosts({ limit: 3 })
    return { props: { latestPosts }, revalidate: 3600 }
}

export default Index

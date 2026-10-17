import Head from 'next/head'
import type { GetStaticProps, NextPage } from 'next'
import { Box, Container, Typography } from '@mui/material'

import Footer from '../../components/Footer'
import PageHeader from '../../components/PageHeader'
import PostGrid from '../../components/PostGrid'
import { PROFILE } from '../../constants/profile'
import { SITE_URL } from '../../constants/seo'
import { listPublishedPosts } from '../../lib/posts'
import type { PostSummary } from '../../lib/postTypes'

interface IProps {
    posts: PostSummary[]
}

const TITLE = `Blog – ${PROFILE.name}`
const DESCRIPTION = `Notes on backend engineering, Go, Node.js and distributed systems by ${PROFILE.name}.`
const URL = `${SITE_URL}blog`

const BlogIndex: NextPage<IProps> = ({ posts }) => {
    return (
        <>
            <Head>
                <title>{TITLE}</title>
                <meta name="description" content={DESCRIPTION} />
                <link rel="canonical" href={URL} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={URL} />
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
            </Head>
            <Box component="main" sx={{ pt: { xs: 14, md: 18 }, pb: { xs: 10, md: 14 } }}>
                <Container maxWidth="lg">
                    <Box sx={{ mb: { xs: 5, md: 7 } }}>
                        <PageHeader eyebrow="~/blog" title="Writing" />
                    </Box>
                    {posts.length > 0 ? (
                        <PostGrid posts={posts} />
                    ) : (
                        <Typography sx={{ color: 'text.secondary' }}>
                            No posts yet. Check back soon.
                        </Typography>
                    )}
                </Container>
            </Box>
            <Footer />
        </>
    )
}

// Admin saves revalidate this page on demand; the interval is only a fallback
export const getStaticProps: GetStaticProps<IProps> = async () => {
    const posts = await listPublishedPosts()
    return { props: { posts }, revalidate: 3600 }
}

export default BlogIndex

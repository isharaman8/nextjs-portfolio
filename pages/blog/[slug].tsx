import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Box, Button, Container } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import Footer from '../../components/Footer'
import Markdown from '../../components/Markdown'
import PageHeader from '../../components/PageHeader'
import Tag from '../../components/Tag'
import { PROFILE } from '../../constants/profile'
import { SEO, SITE_URL } from '../../constants/seo'
import { getPublishedPostBySlug, listPublishedSlugs } from '../../lib/posts'
import type { Post } from '../../lib/postTypes'
import { formatDate } from '../../utils/stringFunctions'

interface IProps {
    post: Post
}

const BlogPost: NextPage<IProps> = ({ post }) => {
    const url = `${SITE_URL}blog/${post.slug}`
    const title = `${post.title} – ${PROFILE.name}`
    const publishedAt = post.publishedAt ?? post.createdAt
    const shareImage = post.coverImage ?? SEO.image

    return (
        <>
            <Head>
                <title>{title}</title>
                {post.excerpt && <meta name="description" content={post.excerpt} />}
                <link rel="canonical" href={url} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={post.title} />
                {post.excerpt && (
                    <meta property="og:description" content={post.excerpt} />
                )}
                <meta property="og:image" content={shareImage} />
                <meta property="article:published_time" content={publishedAt} />
                <meta property="article:modified_time" content={post.updatedAt} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content={shareImage} />
            </Head>
            <Box component="main" sx={{ pt: { xs: 14, md: 18 }, pb: { xs: 10, md: 14 } }}>
                <Container maxWidth="md">
                    <Button
                        component={Link}
                        href="/blog"
                        startIcon={<ArrowBackIcon />}
                        sx={{ mb: 4, ml: -2.5, color: 'text.secondary' }}
                    >
                        All posts
                    </Button>
                    <Box component="article">
                        <PageHeader
                            eyebrow={formatDate(publishedAt)}
                            eyebrowDateTime={publishedAt}
                            title={post.title}
                        />
                        {post.tags.length > 0 && (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
                                {post.tags.map((tag) => (
                                    <Tag key={tag} label={tag} />
                                ))}
                            </Box>
                        )}
                        {post.coverImage && (
                            <Box
                                sx={{
                                    position: 'relative',
                                    aspectRatio: '16 / 9',
                                    mt: { xs: 4, md: 5 },
                                    border: 1,
                                    borderColor: 'divider',
                                    overflow: 'hidden',
                                }}
                            >
                                <Image
                                    src={post.coverImage}
                                    alt={post.coverImageAlt}
                                    fill
                                    priority
                                    sizes="(max-width: 900px) 100vw, 852px"
                                    style={{ objectFit: 'cover' }}
                                />
                            </Box>
                        )}
                        <Box sx={{ mt: { xs: 5, md: 7 } }}>
                            <Markdown content={post.content} />
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Footer />
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = await listPublishedSlugs()
    return {
        paths: slugs.map((slug) => ({ params: { slug } })),
        // posts published after the build render on first request
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
    const post = await getPublishedPostBySlug({ slug: String(params?.slug) })
    if (!post) return { notFound: true, revalidate: 60 }
    return { props: { post }, revalidate: 3600 }
}

export default BlogPost

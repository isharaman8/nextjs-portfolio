import Link from 'next/link'
import { Box, Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import Section from '../Section'
import PostGrid from '../PostGrid'
import type { PostSummary } from '../../lib/postTypes'

interface IProps {
    posts: PostSummary[]
}

export default function Blog({ posts }: IProps) {
    if (posts.length === 0) return null

    return (
        <Section id="blog" index="05" title="Latest writing">
            <PostGrid posts={posts} />
            <Box sx={{ mt: 5 }}>
                <Button
                    component={Link}
                    href="/blog"
                    variant="outlined"
                    endIcon={<ArrowForwardIcon />}
                >
                    View all posts
                </Button>
            </Box>
        </Section>
    )
}

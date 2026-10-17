import { Box } from '@mui/material'

import PostCard from './PostCard'
import Reveal from './Reveal'
import type { PostSummary } from '../lib/postTypes'

interface IProps {
    posts: PostSummary[]
}

export default function PostGrid({ posts }: IProps) {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: 3,
            }}
        >
            {posts.map((post, index) => (
                <Reveal key={post.id} delay={(index % 3) * 0.08}>
                    <PostCard post={post} />
                </Reveal>
            ))}
        </Box>
    )
}

import Link from 'next/link'
import { Box, Typography } from '@mui/material'

import Tag from './Tag'
import { MONO_FONT_FAMILY } from '../constants/fonts'
import type { PostSummary } from '../lib/postTypes'
import { formatDate } from '../utils/stringFunctions'

interface IProps {
    post: PostSummary
}

export default function PostCard({ post }: IProps) {
    return (
        <Box
            component={Link}
            href={`/blog/${post.slug}`}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: { xs: 3, md: 4 },
                border: 1,
                borderColor: 'divider',
                bgcolor: 'background.paper',
                transition: 'border-color .25s ease, transform .25s ease',
                '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-4px)',
                },
            }}
        >
            {post.publishedAt && (
                <Typography
                    component="time"
                    dateTime={post.publishedAt}
                    sx={{
                        fontFamily: MONO_FONT_FAMILY,
                        fontSize: 13,
                        color: 'primary.main',
                        mb: 1,
                    }}
                >
                    {formatDate(post.publishedAt)}
                </Typography>
            )}
            <Typography variant="h3" sx={{ fontSize: 22, fontWeight: 700 }}>
                {post.title}
            </Typography>
            {post.excerpt && (
                <Typography
                    sx={{ mt: 1.5, color: 'text.secondary', lineHeight: 1.7, flexGrow: 1 }}
                >
                    {post.excerpt}
                </Typography>
            )}
            {post.tags.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
                    {post.tags.map((tag) => (
                        <Tag key={tag} label={tag} />
                    ))}
                </Box>
            )}
        </Box>
    )
}

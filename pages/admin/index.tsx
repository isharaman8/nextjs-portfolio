import { useState } from 'react'
import Link from 'next/link'
import type { GetServerSideProps } from 'next'
import {
    Alert,
    Button,
    Chip,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import LaunchIcon from '@mui/icons-material/Launch'

import AdminLayout from '../../components/admin/AdminLayout'
import { adminRequest } from '../../components/admin/adminApi'
import { isAdminRequest, redirectToLogin } from '../../lib/auth'
import { listAllPosts } from '../../lib/posts'
import type { PostSummary } from '../../lib/postTypes'
import { formatDate } from '../../utils/stringFunctions'

interface IProps {
    initialPosts: PostSummary[]
}

function PostRow({ post, onDelete }: { post: PostSummary; onDelete: (post: PostSummary) => void }) {
    const isPublished = post.status === 'published'

    return (
        <TableRow hover>
            <TableCell>
                <Typography sx={{ fontWeight: 600 }}>{post.title}</Typography>
                <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>/{post.slug}</Typography>
            </TableCell>
            <TableCell>
                <Chip
                    size="small"
                    label={post.status}
                    color={isPublished ? 'primary' : 'default'}
                    variant={isPublished ? 'filled' : 'outlined'}
                />
            </TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {post.publishedAt ? formatDate(post.publishedAt) : '—'}
            </TableCell>
            <TableCell sx={{ whiteSpace: 'nowrap' }}>{formatDate(post.updatedAt)}</TableCell>
            <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                {isPublished && (
                    <IconButton
                        component="a"
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        aria-label={`View ${post.title}`}
                    >
                        <LaunchIcon fontSize="small" />
                    </IconButton>
                )}
                <IconButton
                    component={Link}
                    href={`/admin/posts/${post.id}`}
                    aria-label={`Edit ${post.title}`}
                >
                    <EditOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => onDelete(post)} aria-label={`Delete ${post.title}`}>
                    <DeleteOutlineIcon fontSize="small" />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default function AdminHome({ initialPosts }: IProps) {
    const [posts, setPosts] = useState(initialPosts)
    const [error, setError] = useState('')

    const handleDelete = async (post: PostSummary) => {
        if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return
        try {
            await adminRequest({ url: `/api/admin/posts/${post.id}`, method: 'DELETE' })
            setPosts((current) => current.filter((item) => item.id !== post.id))
        } catch (err) {
            setError((err as Error).message)
        }
    }

    const newPostButton = (
        <Button component={Link} href="/admin/posts/new" variant="contained" startIcon={<AddIcon />}>
            New post
        </Button>
    )

    return (
        <AdminLayout title="Posts" actions={newPostButton}>
            {error && (
                <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                    {error}
                </Alert>
            )}
            {posts.length === 0 ? (
                <Typography sx={{ color: 'text.secondary' }}>
                    No posts yet. Write your first one.
                </Typography>
            ) : (
                <TableContainer sx={{ border: 1, borderColor: 'divider' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Published</TableCell>
                                <TableCell>Updated</TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {posts.map((post) => (
                                <PostRow key={post.id} post={post} onDelete={handleDelete} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({ req }) => {
    if (!isAdminRequest(req)) return redirectToLogin()
    return { props: { initialPosts: await listAllPosts() } }
}

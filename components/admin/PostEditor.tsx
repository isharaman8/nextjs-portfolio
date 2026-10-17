import { useState } from 'react'
import { useRouter } from 'next/router'
import {
    Alert,
    Box,
    Button,
    FormControlLabel,
    Snackbar,
    Switch,
    Tab,
    Tabs,
    TextField,
} from '@mui/material'

import Markdown from '../Markdown'
import { adminRequest } from './adminApi'
import { MONO_FONT_FAMILY } from '../../constants/fonts'
import type { Post, PostInput } from '../../lib/postTypes'
import { slugify } from '../../utils/stringFunctions'

interface IProps {
    initialPost?: Post
}

interface FormState {
    title: string
    slug: string
    excerpt: string
    tags: string
    content: string
    isPublished: boolean
}

type MobileView = 'write' | 'preview'

const toFormState = (post?: Post): FormState => ({
    title: post?.title ?? '',
    slug: post?.slug ?? '',
    excerpt: post?.excerpt ?? '',
    tags: post?.tags.join(', ') ?? '',
    content: post?.content ?? '',
    isPublished: post?.status === 'published',
})

const toPostInput = (form: FormState): PostInput => ({
    title: form.title,
    slug: form.slug,
    excerpt: form.excerpt,
    tags: form.tags.split(','),
    content: form.content,
    status: form.isPublished ? 'published' : 'draft',
})

export default function PostEditor({ initialPost }: IProps) {
    const router = useRouter()
    const [form, setForm] = useState<FormState>(() => toFormState(initialPost))
    // new posts derive the slug from the title until the slug is edited by hand
    const [isSlugTouched, setIsSlugTouched] = useState(Boolean(initialPost))
    const [mobileView, setMobileView] = useState<MobileView>('write')
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState('')
    const [savedMessage, setSavedMessage] = useState('')

    const updateField = (field: keyof FormState, value: string | boolean) => {
        setForm((current) => ({ ...current, [field]: value }))
    }

    const handleTitleChange = (title: string) => {
        setForm((current) => ({
            ...current,
            title,
            slug: isSlugTouched ? current.slug : slugify(title),
        }))
    }

    const handleSlugChange = (slug: string) => {
        setIsSlugTouched(true)
        updateField('slug', slug)
    }

    const savePost = async () => {
        const body = toPostInput(form)
        if (initialPost) {
            return adminRequest<Post>({ url: `/api/admin/posts/${initialPost.id}`, method: 'PUT', body })
        }
        return adminRequest<Post>({ url: '/api/admin/posts', method: 'POST', body })
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setIsSaving(true)
        setError('')
        try {
            const post = await savePost()
            setSavedMessage(post.status === 'published' ? 'Published' : 'Draft saved')
            if (!initialPost) router.replace(`/admin/posts/${post.id}`)
        } catch (err) {
            setError((err as Error).message)
        } finally {
            setIsSaving(false)
        }
    }

    const showOnMobile = (view: MobileView) => ({
        xs: mobileView === view ? 'block' : 'none',
        md: 'block',
    })

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2.5 }}>
            {error && <Alert severity="error">{error}</Alert>}

            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' } }}>
                <TextField
                    label="Title"
                    value={form.title}
                    onChange={(event) => handleTitleChange(event.target.value)}
                    required
                />
                <TextField
                    label="Slug"
                    value={form.slug}
                    onChange={(event) => handleSlugChange(event.target.value)}
                    helperText={`/blog/${form.slug || '…'}`}
                    required
                />
            </Box>
            <TextField
                label="Excerpt"
                value={form.excerpt}
                onChange={(event) => updateField('excerpt', event.target.value)}
                helperText="Shown on post cards and as the meta description"
                multiline
                minRows={2}
            />
            <TextField
                label="Tags"
                value={form.tags}
                onChange={(event) => updateField('tags', event.target.value)}
                helperText="Comma separated, e.g. Go, PostgreSQL"
            />

            <Tabs
                value={mobileView}
                onChange={(_, view: MobileView) => setMobileView(view)}
                sx={{ display: { md: 'none' } }}
            >
                <Tab value="write" label="Write" />
                <Tab value="preview" label="Preview" />
            </Tabs>
            <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' } }}>
                <Box sx={{ display: showOnMobile('write') }}>
                    <TextField
                        label="Content (Markdown)"
                        value={form.content}
                        onChange={(event) => updateField('content', event.target.value)}
                        multiline
                        minRows={24}
                        fullWidth
                        slotProps={{
                            htmlInput: { style: { fontFamily: MONO_FONT_FAMILY, fontSize: 14 } },
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        display: showOnMobile('preview'),
                        p: 3,
                        border: 1,
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                        maxHeight: { md: '80vh' },
                        overflowY: 'auto',
                    }}
                >
                    <Markdown content={form.content || '_Nothing to preview yet._'} />
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={form.isPublished}
                            onChange={(event) => updateField('isPublished', event.target.checked)}
                        />
                    }
                    label={form.isPublished ? 'Published' : 'Draft'}
                />
                <Button type="submit" variant="contained" disabled={isSaving}>
                    {isSaving ? 'Saving…' : 'Save'}
                </Button>
            </Box>

            <Snackbar
                open={Boolean(savedMessage)}
                autoHideDuration={3000}
                onClose={() => setSavedMessage('')}
                message={savedMessage}
            />
        </Box>
    )
}

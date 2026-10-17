import { useRef, useState } from 'react'
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
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined'

import Markdown from '../Markdown'
import { adminRequest } from './adminApi'
import CoverImageField from './CoverImageField'
import useImageUpload from './useImageUpload'
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
    coverImage: string | null
    coverImageAlt: string
}

type MobileView = 'write' | 'preview'

const toFormState = (post?: Post): FormState => ({
    title: post?.title ?? '',
    slug: post?.slug ?? '',
    excerpt: post?.excerpt ?? '',
    tags: post?.tags.join(', ') ?? '',
    content: post?.content ?? '',
    isPublished: post?.status === 'published',
    coverImage: post?.coverImage ?? null,
    coverImageAlt: post?.coverImageAlt ?? '',
})

const toPostInput = (form: FormState): PostInput => ({
    title: form.title,
    slug: form.slug,
    excerpt: form.excerpt,
    tags: form.tags.split(','),
    content: form.content,
    status: form.isPublished ? 'published' : 'draft',
    coverImage: form.coverImage,
    coverImageAlt: form.coverImageAlt,
})

const getImageFiles = (files: FileList | null | undefined) => {
    return Array.from(files ?? []).filter((file) => file.type.startsWith('image/'))
}

// "my-diagram.png" -> "my diagram", used as the default alt text
const toAltText = (fileName: string) => {
    return fileName.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim()
}

const insertAt = ({ text, index, insert }: { text: string; index: number; insert: string }) => {
    return text.slice(0, index) + insert + text.slice(index)
}

let placeholderCounter = 0

export default function PostEditor({ initialPost }: IProps) {
    const router = useRouter()
    const [form, setForm] = useState<FormState>(() => toFormState(initialPost))
    // new posts derive the slug from the title until the slug is edited by hand
    const [isSlugTouched, setIsSlugTouched] = useState(Boolean(initialPost))
    const [mobileView, setMobileView] = useState<MobileView>('write')
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState('')
    const [savedMessage, setSavedMessage] = useState('')
    const contentRef = useRef<HTMLTextAreaElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { uploadImage, isUploading } = useImageUpload()

    const updateField = (field: keyof FormState, value: string | boolean | null) => {
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

    const replaceInContent = (search: string, replacement: string) => {
        setForm((current) => ({ ...current, content: current.content.replace(search, replacement) }))
    }

    // Inserts a placeholder at the cursor right away, then swaps in the real image once uploaded
    const uploadInlineImage = async (file: File, index: number) => {
        placeholderCounter += 1
        const placeholder = `![Uploading ${file.name} (${placeholderCounter})…]()`
        setForm((current) => ({
            ...current,
            content: insertAt({ text: current.content, index, insert: `${placeholder}\n` }),
        }))

        try {
            const url = await uploadImage(file)
            replaceInContent(placeholder, `![${toAltText(file.name)}](${url})`)
        } catch (err) {
            replaceInContent(`${placeholder}\n`, '')
            setError((err as Error).message)
        }
    }

    const insertImages = (files: File[]) => {
        const cursor = contentRef.current?.selectionStart ?? form.content.length
        files.forEach((file) => uploadInlineImage(file, cursor))
    }

    const handlePaste = (event: React.ClipboardEvent) => {
        const files = getImageFiles(event.clipboardData.files)
        if (files.length === 0) return
        event.preventDefault()
        insertImages(files)
    }

    const handleDrop = (event: React.DragEvent) => {
        const files = getImageFiles(event.dataTransfer.files)
        if (files.length === 0) return
        event.preventDefault()
        insertImages(files)
    }

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = getImageFiles(event.target.files)
        event.target.value = ''
        insertImages(files)
    }

    const handleCoverSelect = async (file: File) => {
        try {
            const url = await uploadImage(file)
            setForm((current) => ({
                ...current,
                coverImage: url,
                coverImageAlt: current.coverImageAlt || toAltText(file.name),
            }))
        } catch (err) {
            setError((err as Error).message)
        }
    }

    const handleCoverRemove = () => {
        setForm((current) => ({ ...current, coverImage: null, coverImageAlt: '' }))
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
            <CoverImageField
                url={form.coverImage}
                alt={form.coverImageAlt}
                isUploading={isUploading}
                onSelectFile={handleCoverSelect}
                onAltChange={(alt) => updateField('coverImageAlt', alt)}
                onRemove={handleCoverRemove}
            />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
                <Button
                    variant="outlined"
                    startIcon={<AddPhotoAlternateOutlinedIcon />}
                    onClick={() => fileInputRef.current?.click()}
                >
                    Insert image
                </Button>
                <Box component="span" sx={{ fontSize: 13, color: 'text.secondary' }}>
                    {isUploading ? 'Uploading…' : 'or paste / drop images into the editor'}
                </Box>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handleFileInputChange}
                />
            </Box>

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
                        onPaste={handlePaste}
                        onDrop={handleDrop}
                        inputRef={contentRef}
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
                <Button type="submit" variant="contained" disabled={isSaving || isUploading}>
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

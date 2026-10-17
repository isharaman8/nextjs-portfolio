// Shared by server code and client components, so it must not import the mongodb driver
import { isValidSlug } from '../utils/stringFunctions'

export type PostStatus = 'draft' | 'published'

export interface PostInput {
    title: string
    slug: string
    excerpt: string
    content: string
    tags: string[]
    status: PostStatus
    coverImage: string | null
    coverImageAlt: string
}

// Serializable shape passed through page props and API responses
export interface Post extends PostInput {
    id: string
    publishedAt: string | null
    createdAt: string
    updatedAt: string
}

export type PostSummary = Omit<Post, 'content'>

const asString = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

const toTags = (value: unknown) => {
    if (!Array.isArray(value)) return []
    const tags = value.map(asString).filter(Boolean)
    return Array.from(new Set(tags))
}

// Cover images must come from our own image storage; null origin means uploads aren't configured
const isAllowedImage = ({ url, origin }: { url: string; origin: string | null }) => {
    return Boolean(origin) && url.startsWith(`${origin}/`)
}

// Returns the cleaned input, or an error message for the first invalid field
export function parsePostInput({
    body,
    imageOrigin,
}: {
    body: unknown
    imageOrigin: string | null
}): { input: PostInput } | { error: string } {
    const raw = (body ?? {}) as Record<string, unknown>
    const coverImage = asString(raw.coverImage)
    const input: PostInput = {
        title: asString(raw.title),
        slug: asString(raw.slug),
        excerpt: asString(raw.excerpt),
        content: typeof raw.content === 'string' ? raw.content : '',
        tags: toTags(raw.tags),
        status: raw.status === 'published' ? 'published' : 'draft',
        coverImage: coverImage || null,
        coverImageAlt: asString(raw.coverImageAlt),
    }

    if (!input.title) return { error: 'Title is required' }
    if (!isValidSlug(input.slug)) {
        return { error: 'Slug must be lowercase letters, numbers and dashes' }
    }
    if (coverImage && !isAllowedImage({ url: coverImage, origin: imageOrigin })) {
        return { error: 'Cover image must be uploaded through the editor' }
    }
    return { input }
}

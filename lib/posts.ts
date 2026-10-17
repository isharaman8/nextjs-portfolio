import { Collection, MongoServerError, ObjectId, WithId } from 'mongodb'

import { getDb } from './mongodb'
import type { Post, PostInput, PostSummary } from './postTypes'

interface PostDocument extends PostInput {
    publishedAt: Date | null
    createdAt: Date
    updatedAt: Date
}

export class DuplicateSlugError extends Error {
    constructor(slug: string) {
        super(`A post with slug "${slug}" already exists`)
    }
}

const COLLECTION = 'posts'
const SUMMARY_PROJECTION = { content: 0 }

let indexesReady: Promise<unknown> | null = null

async function getCollection(): Promise<Collection<PostDocument> | null> {
    const db = await getDb()
    if (!db) return null

    const collection = db.collection<PostDocument>(COLLECTION)
    if (!indexesReady) {
        indexesReady = Promise.all([
            collection.createIndex({ slug: 1 }, { unique: true }),
            collection.createIndex({ status: 1, publishedAt: -1 }),
        ])
    }
    await indexesReady
    return collection
}

async function requireCollection() {
    const collection = await getCollection()
    if (!collection) throw new Error('MONGODB_URI is not configured')
    return collection
}

// Summary queries project out `content`, so this never reads it
function toPostSummary(doc: WithId<PostDocument>): PostSummary {
    return {
        id: doc._id.toHexString(),
        title: doc.title,
        slug: doc.slug,
        excerpt: doc.excerpt,
        tags: doc.tags,
        status: doc.status,
        // posts saved before images were supported have no cover fields
        coverImage: doc.coverImage ?? null,
        coverImageAlt: doc.coverImageAlt ?? '',
        publishedAt: doc.publishedAt ? doc.publishedAt.toISOString() : null,
        createdAt: doc.createdAt.toISOString(),
        updatedAt: doc.updatedAt.toISOString(),
    }
}

function toPost(doc: WithId<PostDocument>): Post {
    return { ...toPostSummary(doc), content: doc.content }
}

function toObjectId(id: string) {
    return ObjectId.isValid(id) ? new ObjectId(id) : null
}

function isDuplicateKeyError(error: unknown) {
    return error instanceof MongoServerError && error.code === 11000
}

// keeps the first publish date, and sets it when a post goes live
function getPublishedAt({
    input,
    existing,
    now,
}: {
    input: PostInput
    existing: Date | null
    now: Date
}) {
    if (input.status !== 'published') return existing
    return existing ?? now
}

export async function listPublishedPosts({ limit }: { limit?: number } = {}) {
    const collection = await getCollection()
    if (!collection) return []

    const cursor = collection
        .find({ status: 'published' }, { projection: SUMMARY_PROJECTION })
        .sort({ publishedAt: -1 })
    if (limit) cursor.limit(limit)

    const docs = await cursor.toArray()
    return docs.map(toPostSummary)
}

export async function listPublishedSlugs() {
    const posts = await listPublishedPosts()
    return posts.map((post) => post.slug)
}

export async function getPublishedPostBySlug({ slug }: { slug: string }) {
    const collection = await getCollection()
    if (!collection) return null

    const doc = await collection.findOne({ slug, status: 'published' })
    return doc ? toPost(doc) : null
}

export async function listAllPosts() {
    const collection = await requireCollection()
    const docs = await collection
        .find({}, { projection: SUMMARY_PROJECTION })
        .sort({ updatedAt: -1 })
        .toArray()
    return docs.map(toPostSummary)
}

export async function getPostById({ id }: { id: string }) {
    const objectId = toObjectId(id)
    if (!objectId) return null

    const collection = await requireCollection()
    const doc = await collection.findOne({ _id: objectId })
    return doc ? toPost(doc) : null
}

export async function createPost({ input }: { input: PostInput }) {
    const collection = await requireCollection()
    const now = new Date()
    const doc: PostDocument = {
        ...input,
        publishedAt: getPublishedAt({ input, existing: null, now }),
        createdAt: now,
        updatedAt: now,
    }

    try {
        const result = await collection.insertOne(doc)
        return toPost({ ...doc, _id: result.insertedId })
    } catch (error) {
        if (isDuplicateKeyError(error)) throw new DuplicateSlugError(input.slug)
        throw error
    }
}

// Returns the updated post and the previous one (for revalidating an old slug)
export async function updatePost({ id, input }: { id: string; input: PostInput }) {
    const objectId = toObjectId(id)
    if (!objectId) return null

    const collection = await requireCollection()
    const existing = await collection.findOne({ _id: objectId })
    if (!existing) return null

    const now = new Date()
    const changes = {
        ...input,
        publishedAt: getPublishedAt({ input, existing: existing.publishedAt, now }),
        updatedAt: now,
    }

    try {
        const updated = await collection.findOneAndUpdate(
            { _id: objectId },
            { $set: changes },
            { returnDocument: 'after' }
        )
        if (!updated) return null
        return { post: toPost(updated), previous: toPost(existing) }
    } catch (error) {
        if (isDuplicateKeyError(error)) throw new DuplicateSlugError(input.slug)
        throw error
    }
}

export async function deletePost({ id }: { id: string }) {
    const objectId = toObjectId(id)
    if (!objectId) return null

    const collection = await requireCollection()
    const deleted = await collection.findOneAndDelete({ _id: objectId })
    return deleted ? toPost(deleted) : null
}

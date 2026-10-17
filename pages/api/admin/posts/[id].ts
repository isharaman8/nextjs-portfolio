import type { NextApiRequest, NextApiResponse } from 'next'

import { isAdminRequest } from '../../../../lib/auth'
import {
    DuplicateSlugError,
    deletePost,
    getPostById,
    updatePost,
} from '../../../../lib/posts'
import { parsePostInput } from '../../../../lib/postTypes'
import { revalidateBlog } from '../../../../lib/revalidate'

const NOT_FOUND = { error: 'Post not found' }

async function handleGet(id: string, res: NextApiResponse) {
    const post = await getPostById({ id })
    if (!post) return res.status(404).json(NOT_FOUND)
    return res.status(200).json(post)
}

async function handleUpdate(id: string, req: NextApiRequest, res: NextApiResponse) {
    const parsed = parsePostInput(req.body)
    if ('error' in parsed) return res.status(400).json({ error: parsed.error })

    try {
        const result = await updatePost({ id, input: parsed.input })
        if (!result) return res.status(404).json(NOT_FOUND)

        await revalidateBlog({ res, slugs: [result.post.slug, result.previous.slug] })
        return res.status(200).json(result.post)
    } catch (error) {
        if (error instanceof DuplicateSlugError) {
            return res.status(409).json({ error: error.message })
        }
        throw error
    }
}

async function handleDelete(id: string, res: NextApiResponse) {
    const post = await deletePost({ id })
    if (!post) return res.status(404).json(NOT_FOUND)

    await revalidateBlog({ res, slugs: [post.slug] })
    return res.status(200).json({ success: true })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!isAdminRequest(req)) return res.status(401).json({ error: 'Unauthorized' })

    const id = String(req.query.id)
    if (req.method === 'GET') return handleGet(id, res)
    if (req.method === 'PUT') return handleUpdate(id, req, res)
    if (req.method === 'DELETE') return handleDelete(id, res)

    res.setHeader('Allow', 'GET, PUT, DELETE')
    return res.status(405).json({ error: 'Method not allowed' })
}

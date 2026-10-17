import type { NextApiRequest, NextApiResponse } from 'next'

import { isAdminRequest } from '../../../../lib/auth'
import { DuplicateSlugError, createPost, listAllPosts } from '../../../../lib/posts'
import { parsePostInput } from '../../../../lib/postTypes'
import { getImageOrigin } from '../../../../lib/r2'
import { revalidateBlog } from '../../../../lib/revalidate'

async function handleCreate(req: NextApiRequest, res: NextApiResponse) {
    const parsed = parsePostInput({ body: req.body, imageOrigin: getImageOrigin() })
    if ('error' in parsed) return res.status(400).json({ error: parsed.error })

    try {
        const post = await createPost({ input: parsed.input })
        await revalidateBlog({ res, slugs: [post.slug] })
        return res.status(201).json(post)
    } catch (error) {
        if (error instanceof DuplicateSlugError) {
            return res.status(409).json({ error: error.message })
        }
        throw error
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!isAdminRequest(req)) return res.status(401).json({ error: 'Unauthorized' })

    if (req.method === 'GET') return res.status(200).json(await listAllPosts())
    if (req.method === 'POST') return handleCreate(req, res)

    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed' })
}

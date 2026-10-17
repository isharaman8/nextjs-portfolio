import type { NextApiRequest, NextApiResponse } from 'next'

import { isAdminRequest } from '../../../lib/auth'
import { InvalidUploadError, createImageUpload, isR2Configured } from '../../../lib/r2'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!isAdminRequest(req)) return res.status(401).json({ error: 'Unauthorized' })
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        return res.status(405).json({ error: 'Method not allowed' })
    }
    if (!isR2Configured()) {
        return res.status(503).json({ error: 'Image storage (R2) is not configured' })
    }

    try {
        const upload = await createImageUpload({
            contentType: req.body?.contentType,
            size: req.body?.size,
        })
        return res.status(200).json(upload)
    } catch (error) {
        if (error instanceof InvalidUploadError) {
            return res.status(400).json({ error: error.message })
        }
        throw error
    }
}

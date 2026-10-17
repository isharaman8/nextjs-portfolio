import type { NextApiRequest, NextApiResponse } from 'next'

import { checkPassword, setSessionCookie } from '../../../lib/auth'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        return res.status(405).json({ error: 'Method not allowed' })
    }
    if (!checkPassword(req.body?.password)) {
        return res.status(401).json({ error: 'Incorrect password' })
    }

    setSessionCookie(res)
    return res.status(200).json({ success: true })
}

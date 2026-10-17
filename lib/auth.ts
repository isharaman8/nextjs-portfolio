import { createHash, createHmac, timingSafeEqual } from 'crypto'
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'

const COOKIE_NAME = 'admin_session'
const SESSION_DAYS = 7
const SESSION_MS = SESSION_DAYS * 24 * 60 * 60 * 1000

// Comparing fixed-length digests keeps timingSafeEqual from throwing on length mismatch
const safeEqual = (a: string, b: string) => {
    const digestA = createHash('sha256').update(a).digest()
    const digestB = createHash('sha256').update(b).digest()
    return timingSafeEqual(digestA, digestB)
}

const sign = (value: string, secret: string) => {
    return createHmac('sha256', secret).update(value).digest('hex')
}

const buildCookie = (value: string, maxAgeSeconds: number) => {
    const parts = [
        `${COOKIE_NAME}=${value}`,
        'Path=/',
        'HttpOnly',
        'SameSite=Strict',
        `Max-Age=${maxAgeSeconds}`,
    ]
    if (process.env.NODE_ENV === 'production') parts.push('Secure')
    return parts.join('; ')
}

export function checkPassword(password: unknown) {
    const expected = process.env.ADMIN_PASSWORD
    if (!expected || typeof password !== 'string') return false
    return safeEqual(password, expected)
}

export function setSessionCookie(res: NextApiResponse) {
    const secret = process.env.ADMIN_SESSION_SECRET
    if (!secret) throw new Error('ADMIN_SESSION_SECRET is not configured')

    const expiresAt = String(Date.now() + SESSION_MS)
    const value = `${expiresAt}.${sign(expiresAt, secret)}`
    res.setHeader('Set-Cookie', buildCookie(value, SESSION_MS / 1000))
}

export function clearSessionCookie(res: NextApiResponse) {
    res.setHeader('Set-Cookie', buildCookie('', 0))
}

type RequestWithCookies = NextApiRequest | GetServerSidePropsContext['req']

export function isAdminRequest(req: RequestWithCookies) {
    const secret = process.env.ADMIN_SESSION_SECRET
    const cookie = req.cookies[COOKIE_NAME]
    if (!secret || !cookie) return false

    const [expiresAt, signature] = cookie.split('.')
    if (!expiresAt || !signature) return false
    if (Number(expiresAt) < Date.now()) return false
    return safeEqual(signature, sign(expiresAt, secret))
}

// getServerSideProps guard for admin pages
export function redirectToLogin() {
    return { redirect: { destination: '/admin/login', permanent: false } } as const
}

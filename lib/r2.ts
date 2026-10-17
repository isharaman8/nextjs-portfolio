import { randomUUID } from 'crypto'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const MAX_IMAGE_BYTES = 10 * 1024 * 1024
const UPLOAD_URL_TTL_SECONDS = 5 * 60

const EXTENSION_BY_TYPE: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/avif': 'avif',
}

export class InvalidUploadError extends Error {}

let client: S3Client | null = null

const getConfig = () => ({
    accountId: process.env.R2_ACCOUNT_ID,
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    bucket: process.env.R2_BUCKET,
    publicUrl: process.env.R2_PUBLIC_URL?.replace(/\/+$/, ''),
})

export function isR2Configured() {
    return Object.values(getConfig()).every(Boolean)
}

// Origin that uploaded images are served from; post cover images must start with it
export function getImageOrigin() {
    return getConfig().publicUrl ?? null
}

function getClient() {
    if (client) return client

    const { accountId, accessKeyId, secretAccessKey } = getConfig()
    client = new S3Client({
        region: 'auto',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        // Otherwise the SDK signs a CRC32 of an empty body into presigned URLs, which the browser upload can't match
        requestChecksumCalculation: 'WHEN_REQUIRED',
        responseChecksumValidation: 'WHEN_REQUIRED',
        credentials: {
            accessKeyId: accessKeyId as string,
            secretAccessKey: secretAccessKey as string,
        },
    })
    return client
}

function validateUpload({ contentType, size }: { contentType: unknown; size: unknown }) {
    if (typeof contentType !== 'string' || !EXTENSION_BY_TYPE[contentType]) {
        throw new InvalidUploadError('Only JPEG, PNG, WebP, GIF and AVIF images are allowed')
    }
    if (typeof size !== 'number' || size <= 0 || size > MAX_IMAGE_BYTES) {
        throw new InvalidUploadError('Images must be 10 MB or smaller')
    }
    return { contentType, extension: EXTENSION_BY_TYPE[contentType] }
}

// e.g. blog/2026/10/<uuid>.png; random names so uploads never collide or leak filenames
function buildObjectKey(extension: string) {
    const now = new Date()
    const month = String(now.getUTCMonth() + 1).padStart(2, '0')
    return `blog/${now.getUTCFullYear()}/${month}/${randomUUID()}.${extension}`
}

// Returns a short-lived URL the browser PUTs the file to, and the URL it is served from afterwards
export async function createImageUpload({
    contentType,
    size,
}: {
    contentType: unknown
    size: unknown
}) {
    const upload = validateUpload({ contentType, size })
    const { bucket, publicUrl } = getConfig()
    const key = buildObjectKey(upload.extension)

    // Content-Type is a signed header, so the browser must PUT with exactly the approved type
    const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        ContentType: upload.contentType,
    })
    const uploadUrl = await getSignedUrl(getClient(), command, {
        expiresIn: UPLOAD_URL_TTL_SECONDS,
        signableHeaders: new Set(['content-type']),
    })

    return { uploadUrl, publicUrl: `${publicUrl}/${key}` }
}

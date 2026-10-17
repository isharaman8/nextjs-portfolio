import { useState } from 'react'

import { adminRequest } from './adminApi'

interface UploadTarget {
    uploadUrl: string
    publicUrl: string
}

// Gets a presigned R2 URL from our API, then PUTs the file straight to R2
async function uploadToR2(file: File) {
    const target = await adminRequest<UploadTarget>({
        url: '/api/admin/uploads',
        method: 'POST',
        body: { contentType: file.type, size: file.size },
    })
    const response = await fetch(target.uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
    })
    if (!response.ok) throw new Error(`Image upload failed (${response.status})`)
    return target.publicUrl
}

export default function useImageUpload() {
    const [pendingCount, setPendingCount] = useState(0)

    const uploadImage = async (file: File) => {
        setPendingCount((count) => count + 1)
        try {
            return await uploadToR2(file)
        } finally {
            setPendingCount((count) => count - 1)
        }
    }

    return { uploadImage, isUploading: pendingCount > 0 }
}

// Thin fetch wrapper for the admin API; throws with the server's error message
export async function adminRequest<T>({
    url,
    method,
    body,
}: {
    url: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body?: unknown
}): Promise<T> {
    const response = await fetch(url, {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined,
    })
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
        throw new Error(data.error || `Request failed (${response.status})`)
    }
    return data as T
}

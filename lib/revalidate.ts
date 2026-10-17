import type { NextApiResponse } from 'next'

// Refreshes every ISR page that can show the given posts.
// A failed revalidation shouldn't fail the save; the pages' `revalidate` fallback catches up.
export async function revalidateBlog({
    res,
    slugs,
}: {
    res: NextApiResponse
    slugs: string[]
}) {
    const postPaths = Array.from(new Set(slugs)).map((slug) => `/blog/${slug}`)
    const paths = ['/', '/blog', ...postPaths]
    const results = await Promise.allSettled(paths.map((path) => res.revalidate(path)))

    results.forEach((result, index) => {
        if (result.status === 'rejected') {
            console.error(`Failed to revalidate ${paths[index]}`, result.reason)
        }
    })
}

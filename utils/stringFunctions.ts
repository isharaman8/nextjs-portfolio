export const _validateEmail = (mail: string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)
}

export const slugify = (text: string) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export const isValidSlug = (slug: string) => {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

export const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'Asia/Kolkata',
    })
}

import { EDUCATION, PROFILE, SKILL_GROUPS } from './profile'

// Production URL; keep in sync with public/robots.txt and public/sitemap.xml
export const SITE_URL = 'https://aman-portfolio-eight.vercel.app/'

export const SEO = {
    title: 'Aman Kumar – Backend Engineer (Go, Node.js) | Bengaluru',
    description:
        'Aman Kumar is a backend engineer (SDE 2) in Bengaluru with 5+ years building microservices in Go, Node.js and TypeScript. See experience, projects and contact.',
    siteName: 'Aman Kumar',
    image: `${SITE_URL}og-image.png`,
    imageAlt: 'Aman Kumar – Backend Engineer, Go and Node.js',
    keywords: [
        'Aman Kumar',
        'isharaman8',
        'Aman Kumar backend engineer',
        'backend engineer Bengaluru',
        'Go developer',
        'Node.js developer',
        'TypeScript',
        'microservices',
        'Fastify',
        'NestJS',
        'PostgreSQL',
    ].join(', '),
}

const skillNames = SKILL_GROUPS.flatMap((group) => group.items)

// schema.org ProfilePage + Person, read by Google for rich results
export const STRUCTURED_DATA = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: SITE_URL,
    name: SEO.title,
    mainEntity: {
        '@type': 'Person',
        name: PROFILE.name,
        alternateName: 'isharaman8',
        url: SITE_URL,
        image: `${SITE_URL}${PROFILE.portrait.slice(1)}`,
        jobTitle: 'Backend Engineer',
        description: SEO.description,
        email: `mailto:${PROFILE.email}`,
        worksFor: { '@type': 'Organization', name: 'KPN Farm Fresh' },
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Bengaluru',
            addressRegion: 'Karnataka',
            addressCountry: 'IN',
        },
        alumniOf: EDUCATION.map((item) => ({
            '@type': 'EducationalOrganization',
            name: item.place,
        })),
        knowsAbout: skillNames,
        sameAs: [PROFILE.github, PROFILE.linkedin],
    },
}

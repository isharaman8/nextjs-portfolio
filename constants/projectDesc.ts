export interface ISingleProject {
    name: string
    description: string
    highlights: string[]
    stack: string[]
    gitLink?: string
    liveLink?: string
}

export interface IEarlierProject {
    name: string
    description: string
    stack: string[]
    gitLink?: string
    liveLink?: string
}

export const PROJECT_ARRAY: ISingleProject[] = [
    {
        name: 'Restaurant Management App',
        description:
            'Order, billing and user-admin services for running a restaurant day to day.',
        highlights: [
            '**20% fewer** order errors and **40% faster** load times',
            'Active orders with checkout, on-hold and a client book',
            'Sales reports by product, peak hour, day and month',
        ],
        stack: ['NestJS', 'PostgreSQL', 'Svelte'],
        liveLink: 'https://billing-app-aws-project.vercel.app/',
    },
    {
        name: 'Finance Management App',
        description:
            'Tracks personal spending and turns raw transactions into insights.',
        highlights: [
            'REST APIs built on Fastify',
            'MongoDB aggregation queries for spending insights',
            'Offline-capable PWA client',
        ],
        stack: ['Fastify', 'MongoDB', 'Next.js'],
    },
]

export const EARLIER_PROJECTS: IEarlierProject[] = [
    {
        name: 'FlowCV clone',
        description: 'Resume builder with templates and live preview.',
        stack: ['Next.js', 'CSS'],
        gitLink: 'https://github.com/isharaman8/clone_flowcv',
        liveLink: 'https://clone-flowcv.vercel.app/',
    },
    {
        name: 'Blogging website',
        description: 'Write, edit and publish posts with Firebase auth.',
        stack: ['React', 'Sass', 'Firebase'],
        gitLink: 'https://github.com/isharaman8/bhrat_website',
        liveLink: 'https://bhrat-website.vercel.app/',
    },
]

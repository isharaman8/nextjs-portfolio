export interface ISingleProject {
    name: string
    description: string
    highlights: string[]
    stack: string[]
    gitLink?: string
    liveLink?: string
    thumbnail?: string
}

export interface IEarlierProject {
    name: string
    description: string
    stack: string[]
    gitLink?: string
    liveLink?: string
    thumbnail?: string
}

export const PROJECT_ARRAY: ISingleProject[] = [
    {
        name: 'GRE1000 · Key Word Tree',
        description:
            'A GRE vocabulary app: 1,111 essential words A–Z, grouped by sentiment, with flashcards, quizzes, study schedules and a leaderboard. I built the backend, the student app and an admin panel.',
        highlights: [
            'Fastify + PostgreSQL backend with JWT auth and **Razorpay subscriptions**',
            'Study-schedule worker sending **push (FCM) and email** reminders',
            'Word pronunciations via Kokoro TTS, audio stored on Cloudflare R2',
        ],
        stack: ['Fastify', 'PostgreSQL', 'Redis', 'Next.js'],
        liveLink: 'https://gre1000-user.vercel.app/',
        thumbnail: '/static/PROJECT_PICS/gre1000.jpg',
    },
    {
        name: 'Finance Management App',
        description:
            'Cash Manager: track income and expenses, set budgets, and keep tabs on money lent to or borrowed from friends.',
        highlights: [
            'Budgets that **update automatically** as entries are created, edited or deleted, with a full change log',
            '**MongoDB aggregation pipelines** for category breakdowns, daily spending and filtered reports',
            '**Redis caching** at the repository layer, covered by unit tests',
            'Contacts for lent/borrowed money that can be **shared with other users**',
            'Bulk edit/delete, search and soft delete across entries',
            'Installable Next.js **PWA** with Recharts dashboards',
        ],
        stack: ['Fastify', 'MongoDB', 'Redis', 'Next.js'],
        liveLink: 'https://finance-app-one-lilac.vercel.app/',
    },
]

export const EARLIER_PROJECTS: IEarlierProject[] = [
    {
        name: 'FlowCV clone',
        description: 'Resume builder with templates and live preview.',
        stack: ['Next.js', 'CSS'],
        gitLink: 'https://github.com/isharaman8/clone_flowcv',
        liveLink: 'https://clone-flowcv.vercel.app/',
        thumbnail: '/static/PROJECT_PICS/clone-flowcv.png',
    },
    {
        name: 'Blogging website',
        description: 'Write, edit and publish posts with Firebase auth.',
        stack: ['React', 'Sass', 'Firebase'],
        gitLink: 'https://github.com/isharaman8/bhrat_website',
        liveLink: 'https://bhrat-website.vercel.app/',
        thumbnail: '/static/PROJECT_PICS/blogging-website.png',
    },
]

export interface ISingleProject {
    name: string
    description: string
    techStack: string[]
    gitLink?: string
    liveLink: string
    heroImage: string
    features?: string[]
}

export const PROJECT_ARRAY = [
    {
        name: 'Restaurant Management App',
        description:
            'A web app for streamlining restaurant operations with billing, reports, products management, and real-time order tracking.',
        techStack: [
            'file-type-svelte.svg',
            'nestjs.svg',
            'mongodb-original.svg',
        ],
        liveLink: 'https://billing-app-aws-project.vercel.app/',
        heroImage: '/static/PROJECT_PICS/restaurant-management-app.png',
        features: [
            'Product management section for adding/updating products.',
            'Billing section for active orders with checkout, on-hold, and client book integration.',
            'Order history section to view previous orders.',
            'Reports section provides insights via bar charts for product sales, peak hours, and daily/monthly sales.',
            'User profile section.',
        ],
    },
    {
        name: 'Blogging Website',
        description:
            'A platform for creating, managing, and sharing blog posts with a user-friendly interface and seamless publishing experience.',
        techStack: ['react.svg', 'sass.svg', 'firebase.svg'],
        gitLink: 'https://github.com/isharaman8/bhrat_website',
        liveLink: 'https://bhrat-website.vercel.app/',
        heroImage: '/static/PROJECT_PICS/blogging-website.png',
        features: [
            'Create and edit blog posts',
            'User authentication with Firebase',
            'Responsive design',
        ],
    },
    {
        name: 'Clone: FlowCV',
        description:
            'A seamless resume-building platform with customizable templates and real-time previews.',
        techStack: ['nextjs.svg', 'css.svg'],
        gitLink: 'https://github.com/isharaman8/clone_flowcv',
        liveLink: 'https://clone-flowcv.vercel.app/',
        heroImage: '/static/PROJECT_PICS/clone-flowcv.png',
        features: [
            'Customizable resume templates',
            'Real-time resume preview',
            'Download resume as PDF',
            'Mobile-friendly design',
            'User-friendly drag-and-drop interface',
        ],
    },
]

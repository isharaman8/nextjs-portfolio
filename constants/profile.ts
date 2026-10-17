// All personal content shown on the site lives here.
// Text wrapped in **double asterisks** is rendered highlighted (see components/Emphasis.tsx).

export const PROFILE = {
    name: 'Aman Kumar',
    role: 'Backend Engineer · SDE 2',
    tagline:
        'I build and run microservices in Go and Node.js. Right now I own the promotion, price and customer services at KPN Farm Fresh.',
    location: 'Bengaluru, India',
    availability: 'Open to remote',
    email: 'isharaman8@gmail.com',
    resume: 'https://drive.google.com/file/d/1t3eEWgg4HnnEwaNx1PQthWDt6pwmZ-9V/view?usp=sharing',
    github: 'https://github.com/isharaman8',
    linkedin: 'https://www.linkedin.com/in/aman-kumar-71b655158/',
    portrait: '/static/aman-portrait-dark.jpg',
}

export const HERO_STATS = [
    { value: '4+', label: 'years of production backend work' },
    { value: '100+', label: 'microservices in the platform I work on' },
    { value: '60%', label: 'less email volume from a DMS I built' },
    { value: '35%', label: 'fewer approval delays via workflow automation' },
]

export const ABOUT_PARAGRAPHS = [
    "I'm a backend engineer with 5+ years of production experience. I'm currently an SDE 2 at **KPN Farm Fresh**, where I own the promotion, price and customer services in a platform of **100+ microservices** written in Go and Node.js (Fastify).",
    'Before that I spent two and a half years at **SenseHawk**, building an organization-wide document management system, multi-stage approval workflows with role-based access control, and a FastAPI integrations platform.',
    'I like owning a service end to end: API design, data modeling, and being the one who fixes it when it breaks in production. I got my start teaching, mentoring MERN-stack students at Masai School.',
]

export const INTERESTS = [
    'Music',
    'Books',
    'DSA problems',
    'Travel',
    'Video games',
    'Coffee',
]

export const EDUCATION = [
    {
        title: 'Full Stack Web Development (MERN)',
        place: 'Masai School',
        period: '2021 – 2022',
    },
    {
        title: 'Bachelor of Arts',
        place: 'Govt. MAM PG College, Jammu',
        period: '2018 – 2021',
    },
]

export interface IExperience {
    role: string
    company: string
    period: string
    location: string
    points: string[]
}

export const EXPERIENCE: IExperience[] = [
    {
        role: 'Software Development Engineer II (Backend)',
        company: 'KPN Farm Fresh',
        period: 'Jun 2025 – Present',
        location: 'Bengaluru',
        points: [
            'Own the **promotion, price and customer services** in a platform of 100+ microservices (Go, Node.js/Fastify), including their APIs and third-party integrations.',
            'Diagnose and resolve production incidents and ship performance fixes that improve uptime and stability.',
            'Turn requirements from product, frontend and operations teams into backend designs and deliver them on schedule.',
        ],
    },
    {
        role: 'Software Engineer',
        company: 'SenseHawk',
        period: 'Sep 2022 – Apr 2025',
        location: 'Bengaluru',
        points: [
            'Built and scaled the backend of an organization-wide Document Management System: **60% less email volume, 50% faster document processing**.',
            'Designed multi-stage approval workflows with role-based access control and audit trails: **35% fewer approval delays** while meeting compliance requirements.',
            'Optimized a FastAPI integrations platform: **25% faster data synchronization** across internal services.',
            'Worked with cross-functional teams to deliver backend services: **20% higher client satisfaction, 30% less downtime**.',
            'Contributed to architecture discussions, API contract design and code reviews.',
        ],
    },
    {
        role: 'Instructional Associate',
        company: 'Masai School',
        period: 'Mar 2022 – Sep 2022',
        location: 'Bengaluru',
        points: [
            'Mentored students on the MERN stack and reviewed their code and API designs: **85% completed their projects** and assessment scores rose 30%.',
        ],
    },
]

export const SKILL_GROUPS = [
    {
        title: 'Languages',
        items: ['Go', 'TypeScript', 'JavaScript', 'SQL', 'Python'],
    },
    {
        title: 'Backend',
        items: [
            'Node.js',
            'Fastify',
            'NestJS',
            'Express',
            'FastAPI',
            'REST API design',
            'Microservices',
            'JWT & RBAC',
            'Third-party integrations',
        ],
    },
    {
        title: 'Data',
        items: [
            'PostgreSQL',
            'MongoDB',
            'Schema design',
            'Query optimization',
            'Indexing',
        ],
    },
    {
        title: 'Cloud & Tooling',
        items: ['AWS', 'Docker', 'Linux', 'Git', 'CI/CD'],
    },
    {
        title: 'Frontend',
        items: ['React', 'Next.js'],
    },
]

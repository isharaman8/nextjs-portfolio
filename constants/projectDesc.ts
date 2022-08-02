export interface ISingleProject {
    name: string
    description: string
    techStack: string[]
    gitLink: string
    liveLink: string
    heroImage: string
}

class SingleProject implements ISingleProject {
    name: string
    description: string
    techStack: string[]
    gitLink: string
    liveLink: string
    heroImage: string

    constructor(
        name: string,
        description: string,
        techStack: string[],
        gitLink: string,
        liveLink: string,
        heroImage: string
    ) {
        this.name = name
        this.description = description
        this.techStack = techStack
        this.gitLink = gitLink
        this.liveLink = liveLink
        this.heroImage = heroImage
    }
}

export const PROJECT_ARRAY: Array<ISingleProject> = [
    {
        ...new SingleProject(
            'Clone: Frontend Masters',
            'Frontend-Master is E-learning Platform for Learning Frontend Development.',
            ['html5.svg', 'css.svg', 'javascript.svg'],
            'https://github.com/jishanpatel7/FrontEndMasters-Website',
            'https://safe-woodland-02335.herokuapp.com/',
            'static/PROJECT_PICS/frontendmasters.png'
        ),
    },
    {
        ...new SingleProject(
            'Clone: Dineout',
            "Dineout is India's largest dining out and restaurant tech solutions platform in B2C and B2B front with InResto & Torqus, processing more than 100M diners ",
            ['react.svg', 'sass.svg', 'firebase.svg'],
            'https://github.com/sayanwastaken/project_dineout',
            'https://project-dineout.vercel.app/',
            'static/PROJECT_PICS/projectdineout.png'
        ),
    },
    {
        ...new SingleProject(
            'Clone: PulsePlus Pharmacy',
            'Pulse+ A collaborative project where user can purchase medicine or drugs at best price. ',
            ['html5.svg', 'css.svg', 'javascript.svg'],
            'https://github.com/Rohanverma4/UNIT_2_PROJECT_TESTING',
            'https://pulsepluspharmacy.netlify.app/',
            'static/PROJECT_PICS/pulseplus.png'
        ),
    },
]

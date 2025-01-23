// third party imports
import * as React from 'react'
import Image from 'next/image'
import { Box, width } from '@mui/system'
import { motion } from 'framer-motion'
import { useTheme } from '@emotion/react'
import { styled } from '@mui/material/styles'
import { Grid, Typography } from '@mui/material'

// inner imports
import { ICONS } from '../../constants/icons'
import PageSwapMotion from '../PageSwapMotion'
import styles from '../../styles/tech.module.scss'
import { FONT_SIZES } from '../../constants/fontsSize'
import { CapitalizeString } from '../../utils/stringFunctions'

const CustomTypography = styled(Typography)`
    font-size: ${FONT_SIZES.about.pFont.lg};
    width: 50%;
    margin: 15px auto;
    text-align: justify;

    @media only screen and (max-width: 1200px) {
        & {
            font-size: ${FONT_SIZES.about.pFont.md};
        }
    }

    @media only screen and (max-width: 900px) {
        & {
            font-size: ${FONT_SIZES.about.pFont.xs};
            text-align: justify;
        }
    }
`

export default function Tech() {
    const theme: any = useTheme()
    const {
        palette: { mode },
    } = theme
    return (
        <PageSwapMotion>
            <Box
                component={'div'}
                mt={15}
                id="tech"
                sx={{
                    gap: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginTop: { lg: `140px`, xs: `20vh` },
                    minHeight: { lg: `80vh`, xs: `70vh` },
                    overflowY: { xs: `visible`, lg: `visible` },
                }}
            >
                <Typography
                    variant={'h3'}
                    component={'h3'}
                    textAlign={'center'}
                    sx={{
                        fontSize: {
                            ...FONT_SIZES.tech.h2,
                        },
                    }}
                >
                    Technologies I Work With
                </Typography>
                <CustomTypography>
                    I have extensive experience with a variety of modern
                    technologies across the full stack. Here’s a quick overview
                    of the tools and frameworks I use to build robust, scalable
                    applications:
                </CustomTypography>

                <Box sx={{ width: '50%' }}>
                    <h3>Frontend:</h3>
                    <ul>
                        <li>
                            <strong>HTML5</strong> - Building responsive and
                            accessible web structures.
                        </li>
                        <li>
                            <strong>CSS3</strong> - Styling websites with modern
                            techniques (Flexbox, Grid, Animations).
                        </li>
                        <li>
                            <strong>JavaScript (ES6+)</strong> - Writing clean,
                            efficient, and scalable client-side code.
                        </li>
                        <li>
                            <strong>React</strong> - Creating interactive user
                            interfaces with state management (Redux).
                        </li>
                        <li>
                            <strong>Vue.js</strong> - Building dynamic and
                            lightweight single-page applications.
                        </li>
                    </ul>

                    <h3>Backend:</h3>
                    <ul>
                        <li>
                            <strong>Node.js</strong> - Server-side development
                            with a focus on performance and scalability.
                        </li>
                        <li>
                            <strong>NestJS</strong> - Building enterprise-grade
                            applications with TypeScript and dependency
                            injection.
                        </li>
                        <li>
                            <strong>Express.js</strong> - Developing fast,
                            minimalistic backend APIs.
                        </li>
                        <li>
                            <strong>Python</strong> - Writing scripts and
                            applications for backend logic and automation.
                        </li>
                    </ul>

                    <h3>Databases:</h3>
                    <ul>
                        <li>
                            <strong>PostgreSQL</strong> - Designing and managing
                            relational databases for scalable applications.
                        </li>
                        <li>
                            <strong>MongoDB</strong> - Working with NoSQL
                            databases for flexible, document-based storage.
                        </li>
                    </ul>

                    <h3>DevOps:</h3>
                    <ul>
                        <li>
                            <strong>Linux</strong> - Expertise in using and
                            administering Linux-based systems.
                        </li>
                        <li>
                            <strong>Docker</strong> - Containerizing
                            applications for easy deployment and scaling.
                        </li>
                        <li>
                            <strong>CI/CD Pipelines</strong> - Automating the
                            development workflow using tools like GitLab CI,
                            Jenkins, etc.
                        </li>
                    </ul>

                    <h3>Tools & Libraries:</h3>
                    <ul>
                        <li>
                            <strong>Git</strong> - Version control and
                            collaboration on coding projects.
                        </li>
                        <li>
                            <strong>Webpack</strong> - Bundling and optimizing
                            front-end resources.
                        </li>
                        <li>
                            <strong>Jest</strong> - Writing unit and integration
                            tests for reliable applications.
                        </li>
                        <li>
                            <strong>Nginx</strong> - Configuring reverse proxies
                            and load balancers for web applications.
                        </li>
                    </ul>
                </Box>
            </Box>
        </PageSwapMotion>
    )
}

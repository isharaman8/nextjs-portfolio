import { Box, Typography } from '@mui/material'

import Reveal from '../Reveal'
import Section from '../Section'
import { MONO_FONT_FAMILY } from '../../constants/fonts'
import { ProjectLinks, SingleProjectCard } from '../SingleProjectCard'
import { EARLIER_PROJECTS, PROJECT_ARRAY } from '../../constants/projectDesc'

function EarlierProjects() {
    return (
        <Reveal>
            <Typography
                sx={{
                    fontFamily: MONO_FONT_FAMILY,
                    fontSize: 13,
                    color: 'text.secondary',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    mt: 8,
                    mb: 2,
                }}
            >
                Earlier work
            </Typography>
            {EARLIER_PROJECTS.map((project) => (
                <Box
                    key={project.name}
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr auto', md: '220px 1fr auto auto' },
                        alignItems: 'center',
                        columnGap: 3,
                        rowGap: 0.5,
                        py: 2,
                        borderTop: 1,
                        borderColor: 'divider',
                    }}
                >
                    <Typography sx={{ fontWeight: 600 }}>{project.name}</Typography>
                    <Typography
                        sx={{
                            color: 'text.secondary',
                            gridRow: { xs: 2, md: 'auto' },
                        }}
                    >
                        {project.description}
                    </Typography>
                    <Typography
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            fontFamily: MONO_FONT_FAMILY,
                            fontSize: 13,
                            color: 'text.secondary',
                        }}
                    >
                        {project.stack.join(' · ')}
                    </Typography>
                    <Box sx={{ gridRow: { xs: '1 / span 2', md: 'auto' }, gridColumn: { xs: 2, md: 'auto' } }}>
                        <ProjectLinks
                            name={project.name}
                            gitLink={project.gitLink}
                            liveLink={project.liveLink}
                        />
                    </Box>
                </Box>
            ))}
        </Reveal>
    )
}

const Projects = () => {
    return (
        <Section id="projects" index="04" title="Things I've built">
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: 3,
                }}
            >
                {PROJECT_ARRAY.map((project, index) => (
                    <Reveal key={project.name} delay={0.1 * index}>
                        <SingleProjectCard project={project} />
                    </Reveal>
                ))}
            </Box>
            <EarlierProjects />
        </Section>
    )
}

export default Projects

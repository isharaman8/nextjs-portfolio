// third party imports
import { Box, Typography } from '@mui/material'

// inner imports
import Reveal from '../Reveal'
import Section from '../Section'
import Emphasis from '../Emphasis'
import { MONO_FONT_FAMILY } from '../../constants/fonts'
import { EXPERIENCE, IExperience } from '../../constants/profile'

function ExperienceItem({ job }: { job: IExperience }) {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '200px 1fr' },
                gap: { xs: 1, md: 5 },
            }}
        >
            <Box sx={{ pt: { md: 0.5 } }}>
                <Typography
                    sx={{
                        fontFamily: MONO_FONT_FAMILY,
                        fontSize: 13,
                        color: 'text.secondary',
                    }}
                >
                    {job.period}
                </Typography>
                <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
                    {job.location}
                </Typography>
            </Box>

            <Box
                sx={{
                    position: 'relative',
                    pl: 3.5,
                    pb: 6,
                    borderLeft: 1,
                    borderColor: 'divider',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: -6,
                        top: 8,
                        width: 11,
                        height: 11,
                        borderRadius: '50%',
                        bgcolor: 'background.default',
                        border: 2,
                        borderColor: 'primary.main',
                    },
                }}
            >
                <Typography
                    variant="h3"
                    sx={{ fontSize: { xs: 19, md: 21 }, fontWeight: 650 }}
                >
                    {job.role}
                </Typography>
                <Typography sx={{ color: 'primary.main', fontWeight: 600, mt: 0.5 }}>
                    {job.company}
                </Typography>
                <Box component="ul" sx={{ m: 0, mt: 2, pl: 2.5 }}>
                    {job.points.map((point) => (
                        <Box
                            component="li"
                            key={point}
                            sx={{
                                color: 'text.secondary',
                                lineHeight: 1.7,
                                mb: 1,
                                '&::marker': { color: 'text.secondary' },
                            }}
                        >
                            <Emphasis text={point} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default function Experience() {
    return (
        <Section id="experience" index="02" title="Where I've worked">
            {EXPERIENCE.map((job) => (
                <Reveal key={job.company}>
                    <ExperienceItem job={job} />
                </Reveal>
            ))}
        </Section>
    )
}

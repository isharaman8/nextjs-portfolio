// third party imports
import { Box, Typography } from '@mui/material'

// inner imports
import Tag from '../Tag'
import Reveal from '../Reveal'
import Section from '../Section'
import Emphasis from '../Emphasis'
import { MONO_FONT_FAMILY } from '../../constants/fonts'
import {
    ABOUT_PARAGRAPHS,
    EDUCATION,
    INTERESTS,
} from '../../constants/profile'

function SideHeading({ children }: { children: React.ReactNode }) {
    return (
        <Typography
            sx={{
                fontFamily: MONO_FONT_FAMILY,
                fontSize: 13,
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                mb: 1.5,
            }}
        >
            {children}
        </Typography>
    )
}

function EducationList() {
    return (
        <Box>
            <SideHeading>Education</SideHeading>
            {EDUCATION.map((item) => (
                <Box key={item.title} sx={{ mb: 2 }}>
                    <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>
                    <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                        {item.place} · {item.period}
                    </Typography>
                </Box>
            ))}
        </Box>
    )
}

function InterestList() {
    return (
        <Box>
            <SideHeading>Outside work</SideHeading>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {INTERESTS.map((interest) => (
                    <Tag key={interest} label={interest} />
                ))}
            </Box>
        </Box>
    )
}

function About() {
    return (
        <Section id="about" index="01" title="About me">
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1.6fr 1fr' },
                    gap: { xs: 6, md: 10 },
                }}
            >
                <Reveal>
                    {ABOUT_PARAGRAPHS.map((paragraph) => (
                        <Typography
                            key={paragraph}
                            component="p"
                            sx={{
                                fontSize: { xs: 17, md: 18 },
                                lineHeight: 1.75,
                                color: 'text.secondary',
                                mb: 2.5,
                            }}
                        >
                            <Emphasis text={paragraph} />
                        </Typography>
                    ))}
                </Reveal>

                <Reveal delay={0.15}>
                    <Box
                        sx={{
                            p: 3,
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 4,
                            bgcolor: 'background.paper',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                        }}
                    >
                        <EducationList />
                        <InterestList />
                    </Box>
                </Reveal>
            </Box>
        </Section>
    )
}

export default About

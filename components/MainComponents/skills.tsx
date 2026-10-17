// third party imports
import { Box, Typography } from '@mui/material'

// inner imports
import Tag from '../Tag'
import Reveal from '../Reveal'
import Section from '../Section'
import SkillIcon from '../SkillIcon'
import { SKILL_GROUPS } from '../../constants/profile'

export default function Skills() {
    return (
        <Section id="skills" index="03" title="What I work with">
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr 1fr',
                        md: 'repeat(3, 1fr)',
                    },
                    gap: 2,
                }}
            >
                {SKILL_GROUPS.map((group, index) => (
                    <Reveal key={group.title} delay={0.05 * index}>
                        <Box
                            sx={{
                                height: '100%',
                                p: 3,
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 4,
                                bgcolor: 'background.paper',
                            }}
                        >
                            <Typography sx={{ fontWeight: 650, mb: 2 }}>
                                {group.title}
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {group.items.map((item) => (
                                    <Tag
                                        key={item}
                                        label={item}
                                        icon={<SkillIcon skill={item} />}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Reveal>
                ))}
            </Box>
        </Section>
    )
}

// third party imports
import { Box, IconButton, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LaunchIcon from '@mui/icons-material/Launch'

// inner imports
import Tag from './Tag'
import Emphasis from './Emphasis'
import { MONO_FONT_FAMILY } from '../constants/fonts'
import { ISingleProject } from '../constants/projectDesc'

interface IProps {
    project: ISingleProject
}

export function ProjectLinks({
    name,
    gitLink,
    liveLink,
}: {
    name: string
    gitLink?: string
    liveLink?: string
}) {
    return (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
            {gitLink && (
                <IconButton
                    href={gitLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${name} source code`}
                    size="small"
                    color="inherit"
                >
                    <GitHubIcon fontSize="small" />
                </IconButton>
            )}
            {liveLink && (
                <IconButton
                    href={liveLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${name} live site`}
                    size="small"
                    color="inherit"
                >
                    <LaunchIcon fontSize="small" />
                </IconButton>
            )}
        </Box>
    )
}

export const SingleProjectCard = ({ project }: IProps) => {
    return (
        <Box
            sx={{
                height: '100%',
                p: { xs: 3, md: 4 },
                display: 'flex',
                flexDirection: 'column',
                border: 1,
                borderColor: 'divider',
                borderRadius: 4,
                bgcolor: 'background.paper',
                transition: 'border-color .25s ease, transform .25s ease',
                '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-4px)',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // keeps titles aligned when a card has no links
                    minHeight: 34,
                    mb: 2,
                }}
            >
                <Typography
                    sx={{
                        fontFamily: MONO_FONT_FAMILY,
                        fontSize: 13,
                        color: 'primary.main',
                    }}
                >
                    Featured project
                </Typography>
                <ProjectLinks
                    name={project.name}
                    gitLink={project.gitLink}
                    liveLink={project.liveLink}
                />
            </Box>

            <Typography variant="h3" sx={{ fontSize: 24, fontWeight: 700 }}>
                {project.name}
            </Typography>
            <Typography sx={{ mt: 1.5, color: 'text.secondary', lineHeight: 1.7 }}>
                {project.description}
            </Typography>

            <Box component="ul" sx={{ m: 0, mt: 2, pl: 2.5, flexGrow: 1 }}>
                {project.highlights.map((highlight) => (
                    <Box
                        component="li"
                        key={highlight}
                        sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 0.5 }}
                    >
                        <Emphasis text={highlight} />
                    </Box>
                ))}
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3 }}>
                {project.stack.map((item) => (
                    <Tag key={item} label={item} />
                ))}
            </Box>
        </Box>
    )
}

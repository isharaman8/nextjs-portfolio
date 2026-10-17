// third party imports
import Image from 'next/image'
import { Box, IconButton, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
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

// Shown in place of a screenshot so cards without one keep the same layout
function ThumbnailPlaceholder({ name }: { name: string }) {
    const theme = useTheme()
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    return (
        <Box
            sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'background.default',
                backgroundImage: `radial-gradient(${theme.palette.divider} 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
            }}
        >
            <Typography
                sx={{
                    fontFamily: MONO_FONT_FAMILY,
                    fontSize: 14,
                    color: 'text.secondary',
                    px: 1.5,
                    py: 0.75,
                    border: 1,
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                }}
            >
                ~/{slug}
            </Typography>
        </Box>
    )
}

export function ProjectThumbnail({
    name,
    thumbnail,
    sizes,
}: {
    name: string
    thumbnail?: string
    sizes: string
}) {
    return (
        <Box
            className="project-thumbnail"
            sx={{
                position: 'relative',
                aspectRatio: '16 / 9',
                overflow: 'hidden',
                borderBottom: 1,
                borderColor: 'divider',
                '& img': { transition: 'transform .4s ease' },
            }}
        >
            {thumbnail ? (
                <Image
                    src={thumbnail}
                    alt={`Screenshot of ${name}`}
                    fill
                    sizes={sizes}
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                />
            ) : (
                <ThumbnailPlaceholder name={name} />
            )}
        </Box>
    )
}

export const SingleProjectCard = ({ project }: IProps) => {
    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                border: 1,
                borderColor: 'divider',
                borderRadius: 4,
                bgcolor: 'background.paper',
                transition: 'border-color .25s ease, transform .25s ease',
                '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-4px)',
                },
                '&:hover .project-thumbnail img': { transform: 'scale(1.03)' },
            }}
        >
            <ProjectThumbnail
                name={project.name}
                thumbnail={project.thumbnail}
                sizes="(max-width: 900px) 100vw, 560px"
            />

            <Box
                sx={{
                    p: { xs: 3, md: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        // keeps titles aligned when a card has no links
                        minHeight: 34,
                        mb: 1,
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
                <Typography
                    sx={{ mt: 1.5, color: 'text.secondary', lineHeight: 1.7 }}
                >
                    {project.description}
                </Typography>

                <Box component="ul" sx={{ m: 0, mt: 2, pl: 2.5, flexGrow: 1 }}>
                    {project.highlights.map((highlight) => (
                        <Box
                            component="li"
                            key={highlight}
                            sx={{
                                color: 'text.secondary',
                                lineHeight: 1.7,
                                mb: 0.5,
                            }}
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
        </Box>
    )
}

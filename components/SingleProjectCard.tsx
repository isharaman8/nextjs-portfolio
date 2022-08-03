import * as React from 'react'
import { ISingleProject } from '../constants/projectDesc'
import { Box, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import { LIGHTTHEME, DARKTHEME } from '../constants/themeColor'
import LaunchIcon from '@mui/icons-material/Launch'
import GitHubIcon from '@mui/icons-material/GitHub'
import styles from '../styles/singleProject.module.css'

interface IProps {
    project: ISingleProject
}

export const SingleProjectCard = ({ project }: IProps) => {
    const theme: any = useTheme()
    const {
        palette: { mode },
    } = theme
    return (
        <Box
            sx={{
                width: `100%`,
                background:
                    mode === 'light'
                        ? LIGHTTHEME.background.linearGradient
                        : DARKTHEME.background.linearGradient,
                height: 'fit-content',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                borderRadius: 10,
                position: 'relative',
            }}
            className={styles.blurForm}
        >
            <img
                src={project.heroImage}
                alt="project hero image"
                height={`350`}
                width={500}
                style={{ borderRadius: '40px 0 0 40px' }}
            />
            <Box sx={{ width: '100%', padding: `20px 20px` }}>
                <Typography variant={'h3'}>{project.name}</Typography>
                <Typography component={'p'} width={`80%`} mt={2} fontSize={18}>
                    {project.description}
                </Typography>
                <Box width={`80%`} sx={{ position: 'absolute', bottom: 20 }}>
                    <Stack
                        direction={'row'}
                        spacing={2}
                        className={styles.techStack}
                        sx={{ transition: `all 1s ease` }}
                    >
                        {project.techStack.map((singleItem: string) => (
                            <img
                                key={singleItem}
                                className={styles.techStackImage}
                                src={`static/TECH_ICONS/${singleItem}`}
                                alt="tech stack image"
                            />
                        ))}
                    </Stack>
                </Box>
                <Stack
                    direction={'row'}
                    spacing={2}
                    sx={{ position: 'absolute', bottom: 10, right: 30 }}
                >
                    <a href={project.gitLink} target="_blank">
                        <GitHubIcon sx={{ height: 50, width: 50 }} />
                    </a>
                    <a href={project.liveLink} target="_blank">
                        <LaunchIcon sx={{ height: 50, width: 50 }} />
                    </a>
                </Stack>
            </Box>
        </Box>
    )
}

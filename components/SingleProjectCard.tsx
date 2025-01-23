// third party imports
import * as React from 'react'
import { useTheme } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Box, Stack, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'

// inner imports
import FramerModal from './FramerModal'
import { FONT_SIZES } from '../constants/fontsSize'
import styles from '../styles/singleProject.module.scss'
import { ISingleProject } from '../constants/projectDesc'
import { LIGHTTHEME, DARKTHEME } from '../constants/themeColor'

interface IProps {
    project: ISingleProject
}

export const SingleProjectCard = ({ project }: IProps) => {
    const [modalOpen, setModalOpen] = React.useState(false)
    const [modalImage, setModalImage] = React.useState(project.heroImage)

    const open = () => setModalOpen(true)
    const close = () => setModalOpen(false)

    const theme: any = useTheme()
    const {
        palette: { mode },
    } = theme

    const { projects } = FONT_SIZES

    return (
        <>
            <AnimatePresence>
                {modalOpen && (
                    <FramerModal
                        modalOpen={modalOpen}
                        handleClose={close}
                        image={modalImage}
                    />
                )}
            </AnimatePresence>
            <Box
                component="div"
                sx={{
                    width: { lg: '65%', md: '50%' },
                    background: mode === 'light' ? '#E5E7EB' : '#2A2B2E',
                    display: 'flex',
                    flexDirection: { xs: 'column' },
                    borderRadius: 5,
                    position: 'relative',
                    overflow: 'hidden',
                }}
                className={styles.blurForm}
            >
                {/* Project Image */}
                <div className={styles.projectImageDiv}>
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        drag
                        dragConstraints={{
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                        }}
                        dragElastic={0.1}
                        src={project.heroImage}
                        alt={`${project.name} Screenshot`}
                        className={styles.projectImage}
                        onClick={() => {
                            setModalImage(project.heroImage)
                            open()
                        }}
                    />
                </div>

                {/* Project Details */}
                <Box
                    component="div"
                    sx={{
                        width: '100%',
                        padding: '20px',
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: projects.singleProjectCardHeading,
                        }}
                    >
                        {project.name}
                    </Typography>
                    <Typography
                        component="p"
                        mt={2}
                        sx={{
                            fontSize: projects.singleProjectDescription,
                            color: 'text.secondary',
                        }}
                    >
                        {project.description}
                    </Typography>
                    {project.features && project.features.length > 0 && (
                        <Box mt={2}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: projects.singleProjectDescription,
                                }}
                            >
                                Features:
                            </Typography>
                            <ul>
                                {project.features.map((feature, index) => (
                                    <li key={index}>
                                        <Typography
                                            component="p"
                                            sx={{
                                                fontSize:
                                                    projects.singleProjectDescription,
                                                color: 'text.secondary',
                                            }}
                                        >
                                            {feature}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    )}
                    <Box
                        sx={{
                            marginTop: 5,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent={{ xs: 'center', md: 'flex-start' }}
                            className={styles.techStack}
                        >
                            {project.techStack.map((singleItem: string) => (
                                <motion.img
                                    key={singleItem}
                                    className={styles.techStackImage}
                                    src={`/static/TECH_ICONS/${singleItem}`}
                                    alt={`${singleItem} icon`}
                                    whileHover={{ scale: 1.1 }}
                                />
                            ))}
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                                justifyContent: {
                                    xs: 'center',
                                    md: 'flex-start',
                                },
                                marginTop: 3,
                            }}
                        >
                            {project.gitLink && (
                                <a
                                    href={project.gitLink}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <GitHubIcon
                                        sx={{
                                            height: { xs: 20, md: 40 },
                                            width: { xs: 20, md: 40 },
                                            color: 'text.primary',
                                        }}
                                    />
                                </a>
                            )}
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <LaunchIcon
                                    sx={{
                                        height: { xs: 20, md: 40 },
                                        width: { xs: 20, md: 40 },
                                        color: 'text.primary',
                                    }}
                                />
                            </a>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

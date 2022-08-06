import * as React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'
import GitHubIcon from '@mui/icons-material/GitHub'

import styles from '../styles/singleProject.module.scss'
import { LIGHTTHEME, DARKTHEME } from '../constants/themeColor'
import { ISingleProject } from '../constants/projectDesc'
import { FONT_SIZES } from '../constants/fontsSize'
import FramerModal from './FramerModal'
import { AnimatePresence, motion } from 'framer-motion'

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
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
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
                    width: `100%`,
                    background:
                        mode === 'light'
                            ? LIGHTTHEME.background.linearGradient
                            : DARKTHEME.background.linearGradient,
                    height: 'fit-content',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    flexDirection: {
                        xs: `column`,
                        md: `column`,
                        lg: `row`,
                    },
                    borderRadius: 10,
                    position: 'relative',
                }}
                className={styles.blurForm}
            >
                <div className={styles.projectImageDiv}>
                    <motion.img
                        whileHover={{
                            scale: 1.05,
                        }}
                        drag
                        dragConstraints={{
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                        }}
                        dragElastic={0.1}
                        onDragEnd={(e, info) => {
                            info.offset.x = 0
                            info.offset.y = 0
                        }}
                        src={project.heroImage}
                        alt="project hero image"
                        className={styles.projectImage}
                        onClick={() => {
                            setModalImage(`/${project.heroImage}`)
                            open()
                        }}
                    />
                </div>

                <Box
                    component="div"
                    sx={{ width: '100%', padding: `20px 20px` }}
                >
                    <Typography
                        variant={'h3'}
                        sx={{
                            fontSize: {
                                ...projects.singleProjectCardHeading,
                            },
                            textAlign: { xs: `center`, md: `left` },
                            width: { lg: `80%`, md: `100%`, xs: `100%` },
                        }}
                    >
                        {project.name}
                    </Typography>
                    <Typography
                        component={'p'}
                        mt={2}
                        sx={{
                            fontSize: {
                                ...projects.singleProjectDescription,
                            },
                            textAlign: { md: `left`, xs: `center` },
                            width: { lg: `80%`, md: `100%`, xs: `100%` },
                        }}
                    >
                        {project.description}
                    </Typography>
                    <Box
                        component="div"
                        sx={{
                            position: {
                                lg: `absolute`,
                                md: `static`,
                            },

                            marginTop: {
                                md: `50px`,
                            },
                            bottom: 10,
                        }}
                    >
                        <Stack
                            direction={'row'}
                            spacing={2}
                            className={styles.techStack}
                            sx={{
                                transition: `all 1s ease`,
                                justifyContent: {
                                    xs: `center`,
                                    md: `flex-start`,
                                },
                                marginTop: { xs: `20px` },
                            }}
                        >
                            {project.techStack.map((singleItem: string) => (
                                <motion.img
                                    key={singleItem}
                                    className={styles.techStackImage}
                                    src={`/static/TECH_ICONS/${singleItem}`}
                                    alt="tech stack image"
                                    whileHover={{ scale: 1.1 }}
                                />
                            ))}
                        </Stack>
                    </Box>
                    <Stack
                        direction={'row'}
                        spacing={2}
                        sx={{
                            position: { md: `absolute`, xs: `static` },
                            bottom: 5,
                            right: 30,
                            justifyContent: { xs: `center` },
                            gap: { xs: 2 },
                            margin: { xs: `15px 0 0` },
                        }}
                    >
                        <a
                            href={project.gitLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GitHubIcon
                                sx={{
                                    height: { md: 50, xs: 20 },
                                    width: { md: 50, xs: 20 },
                                }}
                            />
                        </a>
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <LaunchIcon
                                sx={{
                                    height: { md: 50, xs: 20 },
                                    width: { md: 50, xs: 20 },
                                }}
                            />
                        </a>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}

import { Box, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material'

import { SingleProjectCard } from '../SingleProjectCard'
import { PROJECT_ARRAY, ISingleProject } from '../../constants/projectDesc'
import { FONT_SIZES } from '../../constants/fontsSize'
import PageSwapMotion from '../PageSwapMotion'

const Projects = () => {
    const theme: any = useTheme()
    const { projects } = FONT_SIZES

    const {
        palette: { mode },
    } = theme
    return (
        <Box component="div" id="projects" sx={{ position: `relative` }}>
            <PageSwapMotion>
                <Typography
                    variant="h2"
                    mt={10}
                    textAlign={'center'}
                    sx={{
                        fontSize: {
                            lg: projects.mainHeading.lg,
                            md: projects.mainHeading.md,
                            xs: projects.mainHeading.xs,
                        },
                        width: `100vw`,
                    }}
                >
                    Projects I&apos;ve made
                </Typography>
                <Box
                    component="div"
                    sx={{
                        width: '75%',
                        margin: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 10,
                        marginTop: 3,
                        zIndex: 10,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 3,
                        padding: { lg: 4, xs: 0 },
                        paddingTop: { xs: 0 },
                        // position: 'relative',
                    }}
                >
                    {PROJECT_ARRAY.map((one: ISingleProject) => (
                        <SingleProjectCard key={one.name} project={one} />
                    ))}
                </Box>
            </PageSwapMotion>
        </Box>
    )
}
export default Projects

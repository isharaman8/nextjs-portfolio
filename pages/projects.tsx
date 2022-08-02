import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material'
import React from 'react'
import { SingleProjectCard } from '../components/SingleProjectCard'
import { PROJECT_ARRAY, ISingleProject } from '../constants/projectDesc'
import { LIGHTTHEME, DARKTHEME } from '../constants/themeColor'
import { useTheme } from '@mui/material'

const Projects = () => {
    const theme: any = useTheme()
    const {
        palette: { mode },
    } = theme
    return (
        <>
            <Typography variant="h2" mt={10} textAlign={'center'}>
                Projects I've made
            </Typography>
            <Box
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
                    padding: 4,
                }}
            >
                {PROJECT_ARRAY.map((one: ISingleProject) => (
                    <SingleProjectCard key={one.name} project={one} />
                ))}
            </Box>
        </>
    )
}
export default Projects

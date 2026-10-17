// THIRD PARTY IMPORTS
import dynamic from 'next/dynamic'
import { Box, Button, Container, IconButton, Typography } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'

// INNER IMPORTS
import Reveal from '../Reveal'
import CanvasErrorBoundary from '../CanvasErrorBoundary'
import { MONO_FONT_FAMILY } from '../../constants/fonts'
import { HERO_STATS, PROFILE } from '../../constants/profile'

// Loaded client-side after the page renders so the 3D bundle and model
// don't delay the first paint
const ThreeComponent = dynamic(() => import('../ThreeComponent'), {
    ssr: false,
})

function HeroBackground() {
    const theme = useTheme()

    return (
        <Box
            aria-hidden
            sx={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                backgroundImage: `radial-gradient(${theme.palette.divider} 1px, transparent 1px)`,
                backgroundSize: '28px 28px',
                maskImage:
                    'radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)',
                '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(600px circle at 75% 35%, ${alpha(
                        theme.palette.primary.main,
                        0.14
                    )}, transparent 60%)`,
                },
            }}
        />
    )
}

function StatusPill() {
    return (
        <Box
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 1.5,
                py: 0.5,
                mb: 3,
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                bgcolor: 'background.paper',
                fontFamily: MONO_FONT_FAMILY,
                fontSize: 13,
                color: 'text.secondary',
            }}
        >
            <Box
                component="span"
                sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                }}
            />
            {PROFILE.availability} · {PROFILE.location}
        </Box>
    )
}

function HeroActions() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 1.5,
                mt: 4,
            }}
        >
            <Button variant="contained" href="#contact">
                Get in touch
            </Button>
            <Button
                variant="outlined"
                color="inherit"
                href={PROFILE.resume}
                target="_blank"
                rel="noreferrer"
                endIcon={<ArrowOutwardIcon fontSize="small" />}
                sx={{ borderColor: 'divider' }}
            >
                Resume
            </Button>
            <Box sx={{ display: 'flex' }}>
                <IconButton
                    href={PROFILE.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    color="inherit"
                >
                    <GitHubIcon />
                </IconButton>
                <IconButton
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    color="inherit"
                >
                    <LinkedInIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

function HeroStats() {
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
                gap: 2,
                mt: { xs: 6, md: 8 },
            }}
        >
            {HERO_STATS.map((stat, index) => (
                <Reveal key={stat.label} delay={0.1 * index}>
                    <Box
                        sx={{
                            height: '100%',
                            p: { xs: 2, md: 2.5 },
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 3,
                            bgcolor: 'background.paper',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: { xs: 28, md: 34 },
                                fontWeight: 700,
                                color: 'primary.main',
                                letterSpacing: '-0.02em',
                            }}
                        >
                            {stat.value}
                        </Typography>
                        <Typography
                            sx={{ fontSize: 14, color: 'text.secondary', mt: 0.5 }}
                        >
                            {stat.label}
                        </Typography>
                    </Box>
                </Reveal>
            ))}
        </Box>
    )
}

const Home = () => {
    return (
        <Box
            component="section"
            id="home"
            sx={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                pt: { xs: 14, md: 12 },
                pb: { xs: 6, md: 8 },
                overflow: 'hidden',
            }}
        >
            <HeroBackground />
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1.25fr 1fr' },
                        alignItems: 'center',
                        gap: { xs: 2, md: 4 },
                    }}
                >
                    <Reveal>
                        <StatusPill />
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: 48, sm: 60, md: 76 },
                                fontWeight: 800,
                                letterSpacing: '-0.035em',
                                lineHeight: 1.02,
                            }}
                        >
                            {PROFILE.name}
                        </Typography>
                        <Typography
                            component="p"
                            sx={{
                                mt: 2,
                                fontFamily: MONO_FONT_FAMILY,
                                fontSize: { xs: 16, md: 20 },
                                color: 'primary.main',
                            }}
                        >
                            {PROFILE.role}
                        </Typography>
                        <Typography
                            component="p"
                            sx={{
                                mt: 2.5,
                                maxWidth: 560,
                                fontSize: { xs: 17, md: 19 },
                                lineHeight: 1.65,
                                color: 'text.secondary',
                            }}
                        >
                            {PROFILE.tagline}
                        </Typography>
                        <HeroActions />
                    </Reveal>

                    <Box
                        sx={{
                            height: { xs: 260, md: 440 },
                            cursor: 'grab',
                            '&:active': { cursor: 'grabbing' },
                        }}
                    >
                        <CanvasErrorBoundary>
                            <ThreeComponent />
                        </CanvasErrorBoundary>
                    </Box>
                </Box>

                <HeroStats />
            </Container>
        </Box>
    )
}

export default Home

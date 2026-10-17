import * as React from 'react'
import { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlined from '@mui/icons-material/LightModeOutlined'
import { alpha, useTheme } from '@mui/material/styles'

import ColorModeContext from './ColorModeContext'
import { MONO_FONT_FAMILY } from '../constants/fonts'

// Each entry must match a section `id` on the page
const pages = ['About', 'Experience', 'Skills', 'Projects', 'Contact']

const getHref = (page: string) => `#${page.toLowerCase()}`

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
    const [isScrolled, setIsScrolled] = useState(false)
    const theme = useTheme()
    const colorMode = React.useContext(ColorModeContext)
    const isDark = theme.palette.mode === 'dark'

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 24)
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                color: 'text.primary',
                transition: 'background-color .3s ease, border-color .3s ease',
                backgroundColor: isScrolled
                    ? alpha(theme.palette.background.default, 0.75)
                    : 'transparent',
                backdropFilter: isScrolled ? 'blur(12px)' : 'none',
                borderBottom: 1,
                borderColor: isScrolled ? 'divider' : 'transparent',
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ gap: 1 }}>
                    <Typography
                        component="a"
                        href="#home"
                        sx={{
                            fontFamily: MONO_FONT_FAMILY,
                            fontWeight: 700,
                            fontSize: 20,
                            flexGrow: 1,
                        }}
                    >
                        ak
                        <Box component="span" sx={{ color: 'primary.main' }}>
                            .
                        </Box>
                    </Typography>

                    <Box
                        component="nav"
                        sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}
                    >
                        {pages.map((page) => (
                            <Box
                                component="a"
                                key={page}
                                href={getHref(page)}
                                sx={{
                                    px: 1.5,
                                    py: 1,
                                    fontSize: 15,
                                    color: 'text.secondary',
                                    borderRadius: 2,
                                    transition: 'color .2s ease',
                                    '&:hover': { color: 'text.primary' },
                                }}
                            >
                                {page}
                            </Box>
                        ))}
                    </Box>

                    <IconButton
                        onClick={colorMode.toggleColorMode}
                        aria-label={
                            isDark ? 'Switch to light mode' : 'Switch to dark mode'
                        }
                        color="inherit"
                    >
                        {isDark ? <LightModeOutlined /> : <DarkModeOutlined />}
                    </IconButton>

                    <IconButton
                        aria-label="Open navigation menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        sx={{ display: { xs: 'inline-flex', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                        {pages.map((page) => (
                            <MenuItem
                                key={page}
                                component="a"
                                href={getHref(page)}
                                onClick={handleCloseNavMenu}
                            >
                                {page}
                            </MenuItem>
                        ))}
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar

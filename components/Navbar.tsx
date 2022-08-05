import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import Link from 'next/link'
import ColorModeContext from './ColorModeContext'
import * as React from 'react'
import style from '../styles/Navbar.module.css'
import { styled, useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'

import MaterialUISwitch from './MaterialUISwitch'
import { Stack } from '@mui/material'
import { useRouter } from 'next/router'

const pages = ['Home', 'About', 'Tech', 'Projects', 'Contact']

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
    const theme = useTheme()
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const colorMode = React.useContext(ColorModeContext)
    const router = useRouter()
    return (
        <AppBar
            position="fixed"
            sx={{
                height: 'max-content',
                color: theme.palette.mode === 'dark' ? `white` : `black`,
                background: `transparent`,
                boxShadow: `none`,
                // opacity: 0,
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontSize: '25px',
                            cursor: 'pointer',
                        }}
                    >
                        <motion.span
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9, rotate: 0 }}
                            animate={{ rotate: 0 }}
                            onClick={() => router.push('/#')}
                        >
                            Ak.
                        </motion.span>
                    </Typography>

                    <Box
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                            alignItems: `center`,
                            // justifyContent: `f`,
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <MaterialUISwitch
                            onChange={colorMode.toggleColorMode}
                            checked={
                                theme.palette.mode === 'dark' ? true : false
                            }
                        />

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Link
                                        href={`/#${
                                            page.toLowerCase() === 'home'
                                                ? ''
                                                : page.toLowerCase()
                                        }`}
                                    >
                                        <Typography textAlign="center">
                                            {page}
                                        </Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Stack spacing={2} direction={`row`} alignItems={`center`}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'flex', md: 'none' },
                                justifyContent: 'flex-end',
                                cursor: 'pointer',
                                fontSize: '25px',
                            }}
                        >
                            <motion.span
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9, rotate: 0 }}
                                animate={{ rotate: 0 }}
                                onClick={() => router.push('/#')}
                            >
                                Ak.
                            </motion.span>
                        </Typography>
                    </Stack>
                    <Box
                        component="div"
                        className={style.linkBox}
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            justifyContent: 'flex-end',
                            fontSize: '20px',
                            gap: '15px',
                        }}
                    >
                        <MaterialUISwitch
                            onChange={colorMode.toggleColorMode}
                            checked={
                                theme.palette.mode === 'dark' ? true : false
                            }
                        />
                        {pages.map((page) => (
                            <Link
                                key={page}
                                href={`/#${
                                    page.toLowerCase() === 'home'
                                        ? ''
                                        : page.toLowerCase()
                                }`}
                            >
                                <motion.span
                                    style={{ cursor: `pointer` }}
                                    whileHover={{
                                        scale: 1.1,
                                        boxShadow: `0 0x 20px rgb(255, 255, 255)`,
                                    }}
                                >
                                    {page}
                                </motion.span>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar

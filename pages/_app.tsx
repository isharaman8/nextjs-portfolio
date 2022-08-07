import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useTheme } from '@emotion/react'
import * as React from 'react'
import { Button } from '@mui/material'
import ColorModeContext from '../components/ColorModeContext'
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps }: AppProps) {
    const theme = useTheme()
    const [mode, setMode] = React.useState<'light' | 'dark'>('dark')
    const particlesInit = async (main: any) => {
        console.log(main)
        await loadFull(main)
    }
    const particlesLoaded = (container: any): any => {
        console.log(container)
    }
    const darkTheme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
                transitions: {
                    duration: {
                        shortest: 150,
                        shorter: 200,
                        short: 250,
                        // most basic recommended timing
                        standard: 300,
                        // this is to be used in complex animations
                        complex: 375,
                        // recommended when something is entering screen
                        enteringScreen: 225,
                        // recommended when something is leaving screen
                        leavingScreen: 195,
                    },
                    easing: {
                        // This is the most common easing curve.
                        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        // Objects enter the screen at full velocity from off-screen and
                        // slowly decelerate to a resting point.
                        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
                        // Objects leave the screen at full velocity. They do not decelerate when off-screen.
                        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
                        // The sharp curve is used by objects that may return to the screen at any time.
                        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
                    },
                },
            }),

        [mode]
    )

    darkTheme.transitions.create(['background-color', 'transform'])

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
            },
        }),
        [mode]
    )

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Navbar />
                <Component {...pageProps} />
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default MyApp

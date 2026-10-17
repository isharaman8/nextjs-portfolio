// third party imports
import * as React from 'react'
import type { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// inner imports
import '../styles/globals.css'
import Navbar from '../components/Navbar'
import ColorModeContext from '../components/ColorModeContext'

function MyApp({ Component, pageProps }: AppProps) {
    const [mode, setMode] = React.useState<'light' | 'dark'>('dark')
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

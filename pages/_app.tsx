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
    const darkTheme = createTheme({
        palette: {
            mode,
        },
    })

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
            },
        }),
        [mode]
    )

    return (
        <>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <Navbar />
                    <Particles
                        id="tsparticles"
                        init={particlesInit}
                        loaded={particlesLoaded}
                        options={{
                            background: {
                                opacity: 0,
                            },
                            fpsLimit: 120,
                            interactivity: {
                                events: {
                                    onClick: {
                                        enable: true,
                                        mode: 'push',
                                    },
                                    onHover: {
                                        enable: true,

                                        mode: 'repulse',
                                    },
                                    resize: true,
                                },
                                modes: {
                                    push: {
                                        quantity: 0,
                                    },
                                    repulse: {
                                        distance: 200,
                                        duration: 0.4,
                                    },
                                },
                            },
                            particles: {
                                color: {
                                    value:
                                        mode === 'light'
                                            ? '#5c7aff'
                                            : '#ffffff',
                                },
                                links: {
                                    color:
                                        mode === 'light'
                                            ? '#5c7aff'
                                            : '#ffffff',
                                    distance: 150,
                                    enable: true,
                                    opacity: 0.4,
                                    width: 0.5,
                                },

                                collisions: {
                                    enable: true,
                                },
                                move: {
                                    direction: 'none',
                                    enable: true,
                                    outModes: {
                                        default: 'bounce',
                                    },
                                    random: false,
                                    speed: 1,
                                    straight: false,
                                },
                                number: {
                                    density: {
                                        enable: true,
                                        area: 2000,
                                    },
                                    value: 80,
                                },
                                opacity: {
                                    value: 0.5,
                                },
                                shape: {
                                    type: 'square',
                                },
                                size: {
                                    value: { min: 1, max: 5 },
                                },
                            },
                            detectRetina: false,
                        }}
                    />
                    <Component {...pageProps} />
                </ThemeProvider>
            </ColorModeContext.Provider>
        </>
    )
}

export default MyApp

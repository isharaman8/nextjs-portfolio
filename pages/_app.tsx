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
        []
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

// third party imports
import * as React from 'react'
import type { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// inner imports
import '../styles/globals.css'
import Navbar from '../components/Navbar'
import { sansFont } from '../constants/fonts'
import ColorModeContext from '../components/ColorModeContext'
import { DARKTHEME, LIGHTTHEME } from '../constants/themeColor'

const buildTheme = (mode: 'light' | 'dark') => {
    const tokens = mode === 'dark' ? DARKTHEME : LIGHTTHEME

    return createTheme({
        palette: {
            mode,
            primary: {
                main: tokens.accent,
                contrastText: tokens.accentContrast,
            },
            background: tokens.background,
            text: tokens.text,
            divider: tokens.border,
        },
        // square corners everywhere; numeric sx borderRadius values multiply this
        shape: { borderRadius: 0 },
        typography: {
            fontFamily: sansFont.style.fontFamily,
            button: { textTransform: 'none', fontWeight: 600 },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: { transition: 'background-color .3s ease' },
                },
            },
            MuiButton: {
                defaultProps: { disableElevation: true },
                styleOverrides: {
                    root: {
                        paddingInline: 20,
                        paddingBlock: 10,
                    },
                },
            },
        },
    })
}

function MyApp({ Component, pageProps }: AppProps) {
    const [mode, setMode] = React.useState<'light' | 'dark'>('dark')
    const theme = React.useMemo(() => buildTheme(mode), [mode])

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
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Navbar />
                <Component {...pageProps} />
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default MyApp

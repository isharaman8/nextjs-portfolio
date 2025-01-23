// THIRD PARTY IMPORTS
import { Box } from '@mui/system'
import type { NextPage } from 'next'
import { useTheme } from '@emotion/react'
import { Avatar, Typography } from '@mui/material'

// INNER IMPORTS
import ThreeComponent from '../ThreeComponent'
import PageSwapMotion from '../PageSwapMotion'
import { FONT_SIZES } from '../../constants/fontsSize'

const Home: NextPage = () => {
    const theme: any = useTheme()

    return (
        <PageSwapMotion>
            <Box
                component="div"
                id="home"
                sx={{
                    height: `100vh`,
                    width: `100vw`,
                    overflowY: `hidden`,
                    scrollBarWidth: 'none',
                }}
            >
                <Box
                    component="div"
                    sx={{
                        height: `100vh`,
                        display: `flex`,
                        zIndex: 5,
                        justifyContent: `center`,
                        alignItems: `center`,
                        flexDirection: `column`,
                        overflow: `hidden`,
                    }}
                >
                    <ThreeComponent />
                    <Box
                        component="div"
                        sx={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection: 'column',
                            padding: '20px',
                            width: `100vw`,
                            // backgroundColor: `red`,
                        }}
                    >
                        <Box
                            sx={{
                                width: { xs: `80%`, md: `50%` },
                                padding: `10px`,
                                display: 'flex',
                                borderRadius: `10px`,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: `${
                                    theme.palette.mode === 'dark'
                                        ? '#313134'
                                        : '#E1E1E1'
                                }`,
                            }}
                        >
                            <Typography
                                variant="p"
                                sx={{
                                    fontSize: {
                                        ...FONT_SIZES.index.pFont,
                                    },
                                    textAlign: `center`,
                                }}
                            >
                                Hi, I'm a web developer from Jammu and Kashmir,
                                India!
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                height: `100%`,
                                padding: `20px`,
                                display: 'flex',
                                marginTop: `20px`,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: { xs: `80%`, md: `50%` },
                                flexDirection: {
                                    lg: 'row',
                                    xs: 'column-reverse',
                                },
                            }}
                        >
                            <span>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontSize: {
                                            ...FONT_SIZES.index.h1,
                                        },
                                        textAlign: { xs: 'center' },
                                        marginTop: { xs: '20px' },
                                    }}
                                >
                                    Aman Kumar
                                </Typography>
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontSize: {
                                            ...FONT_SIZES.index.h3,
                                        },
                                        marginTop: 1,
                                        textAlign: { xs: 'center' },
                                    }}
                                >
                                    💻 Full Stack Web Developer
                                </Typography>
                            </span>

                            <span>
                                <Avatar
                                    sx={{
                                        width: {
                                            lg: `160px`,
                                            xs: `120px`,
                                        },
                                        height: {
                                            lg: `160px`,
                                            xs: `120px`,
                                        },
                                        borderColor:
                                            theme.palette.mode === 'dark'
                                                ? '#E1E1E1'
                                                : '#212121',
                                        borderWidth: 3,
                                        borderStyle: 'solid',
                                        marginTop: { xs: '40px' },
                                    }}
                                    src="/static/personal3.png"
                                />
                            </span>
                        </Box>
                        {/* <h1 ref={textRef}></h1> */}
                    </Box>
                </Box>
            </Box>
        </PageSwapMotion>
    )
}

export default Home

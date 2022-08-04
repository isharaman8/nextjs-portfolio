import { Box, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'

import styles from '../styles/Contact.module.scss'
import { FONT_SIZES } from '../constants/fontsSize'
import { LIGHTTHEME, DARKTHEME } from '../constants/themeColor'

const imagesArr = [
    {
        img: 'icons8-github-128.png',
        link: `https://github.com/isharaman8/`,
    },
    {
        img: 'icons8-linkedin-144.png',
        link: `https://www.linkedin.com/in/aman-kumar-71b655158/`,
    },
    {
        img: 'icons8-mail-96.png',
        link: `jacobreynolds@gmail.com`,
    },
    {
        img: 'twitter-svgrepo-com.svg',
        link: `https://twitter.com/AmanKum34033445`,
    },
]

function Contact() {
    const theme: any = useTheme()
    const {
        palette: { mode },
    } = theme

    const { contact } = FONT_SIZES
    return (
        <>
            <Box
                sx={{
                    marginTop: { lg: `200px`, md: `150px`, xs: `100px` },
                    display: `flex`,
                    flexDirection: `column`,
                    justifyContent: `center`,
                    alignItems: `center`,
                    background:
                        mode === 'dark'
                            ? DARKTHEME.background.default
                            : `white`,
                    zIndex: '5',
                    position: `absolute`,
                    left: `50%`,
                    top: { xs: `40%`, lg: `30%` },
                    transform: `translate(-50%, -50%)`,
                    width: `100%`,
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: {
                            ...contact.mainHeading,
                        },
                        textAlign: `center`,
                    }}
                >
                    Let's Talk
                </Typography>
                <Typography
                    paragraph={true}
                    textAlign={'center'}
                    sx={{
                        fontSize: { ...contact.description },
                        marginTop: { lg: `50px`, xs: `30px` },
                    }}
                >
                    Get in touch with me through the below links
                </Typography>
                <Stack
                    direction="row"
                    sx={{
                        marginTop: { lg: `100px`, xs: `50px` },
                        display: { lg: 'flex', xs: `grid` },
                        gridTemplateColumns: { xs: `repeat(2, auto)` },
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: { lg: `20px`, xs: `50px` },
                    }}
                >
                    {imagesArr.map((c) => {
                        return (
                            <a href={c.link} target="_blank">
                                <img
                                    key={c.link}
                                    className={styles.contactImage}
                                    src={`/static/ICONS/${c.img}`}
                                    alt="image"
                                />
                            </a>
                        )
                    })}
                </Stack>
            </Box>
        </>
    )
}

export default Contact

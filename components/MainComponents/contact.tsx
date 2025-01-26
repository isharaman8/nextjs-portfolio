// third part imports
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    TextField,
    Typography,
} from '@mui/material'

// inner imports
import styles from '../../styles/Contact.module.scss'
import { FONT_SIZES } from '../../constants/fontsSize'
import { _validateEmail } from '../../utils/stringFunctions'

const imagesArr = [
    {
        img: 'github.svg',
        link: `https://github.com/isharaman8/`,
    },
    {
        img: 'linkedin-original.svg',
        link: `https://www.linkedin.com/in/aman-kumar-71b655158/`,
    },
    {
        img: 'twitter.svg',
        link: `https://twitter.com/AmanKum34033445`,
    },
]

function Contact() {
    const { contact } = FONT_SIZES
    const [loading, setLoading] = useState(false)
    const [buttonText, setButtonText] = useState('Say Hi!')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        text: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const updatedFormData = {
            ...formData,
            [name]: value,
        }
        setFormData(updatedFormData)
        console.log(updatedFormData)
    }

    const handleSubmit = async () => {
        const { name, email, text } = formData

        if (!name || !email || !text || !_validateEmail(email)) return
        setLoading(true)

        const FORM_SUBMIT_KEY = process.env.NEXT_PUBLIC_FORM_SUBMIT_KEY
        const EMAIL_API = `https://formsubmit.co/ajax/${FORM_SUBMIT_KEY}`

        fetch(EMAIL_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                name,
                message: text,
                email,
            }),
        })
            .then((_data) => {
                setFormData({
                    name: '',
                    email: '',
                    text: '',
                })

                setButtonText('Message Sent ✓')
                setTimeout(() => {
                    setButtonText('Say Hi!')
                }, 2000)
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return (
        <>
            {/* <PageSwapMotion> */}
            <Box
                component="div"
                id="contact"
                sx={{
                    zIndex: '5',
                    width: `100vw`,
                    height: `100vh`,
                    display: `flex`,
                    position: `relative`,
                    alignItems: `center`,
                    flexDirection: `column`,
                    justifyContent: `center`,
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
                    Let&apos;s Talk
                </Typography>

                <Stack
                    component="form"
                    sx={{
                        gap: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        width: { lg: '50%', xs: '80%' },
                        marginTop: { lg: '50px', xs: '30px' },
                    }}
                >
                    <TextField
                        fullWidth
                        name="name"
                        label="Name"
                        variant="outlined"
                        onChange={handleChange}
                        value={formData.name}
                        required
                    />
                    <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        variant="outlined"
                        onChange={handleChange}
                        value={formData.email}
                        required
                    />
                    <TextField
                        rows={4}
                        value={formData.text}
                        multiline
                        fullWidth
                        name="text"
                        label="Message"
                        variant="outlined"
                        onChange={handleChange}
                        required
                    />
                    <Button
                        variant="outlined"
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{
                            color: 'white',
                            fontSize: '20px',
                            marginTop: '20px',
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            borderColor: 'white',
                            '&:hover': {
                                borderColor: 'white',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            },
                        }}
                    >
                        {loading ? (
                            <CircularProgress sx={{ color: 'white' }} />
                        ) : (
                            buttonText
                        )}
                    </Button>
                </Stack>

                <Typography
                    paragraph={true}
                    textAlign={'center'}
                    sx={{
                        fontSize: { ...contact.description },
                        marginTop: { lg: `50px`, xs: `30px` },
                    }}
                >
                    Or, get in touch with me through below links.
                </Typography>
                <Stack
                    direction="row"
                    sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: { lg: `20px`, xs: `50px` },
                        display: 'flex',
                        marginTop: '50px',
                    }}
                >
                    {imagesArr.map((c) => {
                        return (
                            <a
                                key={c.link}
                                href={c.link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <motion.img
                                    className={styles.contactImage}
                                    src={`/static/ICONS/${c.img}`}
                                    alt="image"
                                    initial={{ scale: 0.3 }}
                                    animate={{ scale: 1 }}
                                    whileHover={{ scale: 1.2 }}
                                />
                            </a>
                        )
                    })}
                </Stack>
            </Box>
            {/* </PageSwapMotion> */}
        </>
    )
}

export default Contact

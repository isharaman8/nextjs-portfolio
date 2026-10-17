// third part imports
import React, { useState } from 'react'
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined'
import MailOutlined from '@mui/icons-material/MailOutlined'

// inner imports
import Reveal from '../Reveal'
import Section from '../Section'
import { PROFILE } from '../../constants/profile'
import { MONO_FONT_FAMILY } from '../../constants/fonts'
import { _validateEmail } from '../../utils/stringFunctions'

type FormStatus = 'idle' | 'sending' | 'sent' | 'invalid' | 'error'

const STATUS_MESSAGES: Record<FormStatus, string> = {
    idle: '',
    sending: '',
    sent: "Thanks! Your message is on its way and I'll get back to you soon.",
    invalid: 'Please fill in every field with a valid email address.',
    error: `Something went wrong. Please email me directly at ${PROFILE.email}.`,
}

const EMPTY_FORM = { name: '', email: '', text: '' }

const contactLinks = [
    { label: PROFILE.email, href: `mailto:${PROFILE.email}`, icon: <MailOutlined /> },
    { label: 'GitHub', href: PROFILE.github, icon: <GitHubIcon /> },
    { label: 'LinkedIn', href: PROFILE.linkedin, icon: <LinkedInIcon /> },
    { label: 'Resume (PDF)', href: PROFILE.resume, icon: <DescriptionOutlined /> },
]

const sendMessage = async (formData: typeof EMPTY_FORM) => {
    const FORM_SUBMIT_KEY = process.env.NEXT_PUBLIC_FORM_SUBMIT_KEY
    const EMAIL_API = `https://formsubmit.co/ajax/${FORM_SUBMIT_KEY}`

    const response = await fetch(EMAIL_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            name: formData.name,
            message: formData.text,
            email: formData.email,
        }),
    })

    return response.ok
}

function ContactLinks() {
    return (
        <Stack spacing={1.5} sx={{ mt: 4 }}>
            {contactLinks.map((link) => (
                <Box
                    component="a"
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel="noreferrer"
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1.5,
                        width: 'fit-content',
                        color: 'text.secondary',
                        transition: 'color .2s ease',
                        '&:hover': { color: 'primary.main' },
                    }}
                >
                    {link.icon}
                    <Typography sx={{ fontFamily: MONO_FONT_FAMILY, fontSize: 15 }}>
                        {link.label}
                    </Typography>
                </Box>
            ))}
        </Stack>
    )
}

function Contact() {
    const [status, setStatus] = useState<FormStatus>('idle')
    const [formData, setFormData] = useState(EMPTY_FORM)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const { name, email, text } = formData

        if (!name || !text || !_validateEmail(email)) {
            setStatus('invalid')
            return
        }

        setStatus('sending')
        const isSent = await sendMessage(formData).catch(() => false)
        if (!isSent) {
            setStatus('error')
            return
        }

        setFormData(EMPTY_FORM)
        setStatus('sent')
    }

    const isSending = status === 'sending'

    return (
        <Section id="contact" index="06" title="Let's talk">
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1.2fr' },
                    gap: { xs: 6, md: 10 },
                }}
            >
                <Reveal>
                    <Typography
                        sx={{
                            fontSize: { xs: 17, md: 18 },
                            lineHeight: 1.75,
                            color: 'text.secondary',
                        }}
                    >
                        I&apos;m open to backend roles, remote or in Bengaluru,
                        and always happy to talk about distributed systems, Go
                        or Node.js. Email is the fastest way to reach me, or use
                        the form.
                    </Typography>
                    <ContactLinks />
                </Reveal>

                <Reveal delay={0.15}>
                    <Stack
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        spacing={2}
                        sx={{
                            p: { xs: 3, md: 4 },
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 4,
                            bgcolor: 'background.paper',
                        }}
                    >
                        <TextField
                            fullWidth
                            name="name"
                            label="Name"
                            onChange={handleChange}
                            value={formData.name}
                            required
                        />
                        <TextField
                            fullWidth
                            name="email"
                            type="email"
                            label="Email"
                            onChange={handleChange}
                            value={formData.email}
                            required
                        />
                        <TextField
                            rows={5}
                            multiline
                            fullWidth
                            name="text"
                            label="Message"
                            onChange={handleChange}
                            value={formData.text}
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={isSending}
                            sx={{ alignSelf: 'flex-start', minWidth: 160 }}
                        >
                            {isSending ? (
                                <CircularProgress size={22} color="inherit" />
                            ) : (
                                'Send message'
                            )}
                        </Button>
                        {STATUS_MESSAGES[status] && (
                            <Typography
                                role="status"
                                sx={{
                                    fontSize: 14,
                                    color:
                                        status === 'sent'
                                            ? 'primary.main'
                                            : 'error.main',
                                }}
                            >
                                {STATUS_MESSAGES[status]}
                            </Typography>
                        )}
                    </Stack>
                </Reveal>
            </Box>
        </Section>
    )
}

export default Contact

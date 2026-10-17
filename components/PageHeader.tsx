import { Typography } from '@mui/material'

import { MONO_FONT_FAMILY } from '../constants/fonts'

interface IProps {
    eyebrow: string
    title: string
    eyebrowDateTime?: string
}

// Page-level heading for standalone pages (blog list, blog post)
export default function PageHeader({ eyebrow, title, eyebrowDateTime }: IProps) {
    return (
        <>
            <Typography
                component={eyebrowDateTime ? 'time' : 'p'}
                dateTime={eyebrowDateTime}
                sx={{
                    display: 'block',
                    fontFamily: MONO_FONT_FAMILY,
                    fontSize: 14,
                    color: 'primary.main',
                    mb: 1.5,
                }}
            >
                {eyebrow}
            </Typography>
            <Typography
                variant="h1"
                sx={{
                    fontSize: { xs: 34, md: 48 },
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                }}
            >
                {title}
            </Typography>
        </>
    )
}

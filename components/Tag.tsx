import { Box } from '@mui/material'

import { MONO_FONT_FAMILY } from '../constants/fonts'

interface IProps {
    label: string
    icon?: React.ReactNode
}

export default function Tag({ label, icon }: IProps) {
    return (
        <Box
            component="span"
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                px: 1.25,
                py: 0.5,
                borderRadius: 2,
                border: 1,
                borderColor: 'divider',
                bgcolor: 'background.default',
                color: 'text.secondary',
                fontFamily: MONO_FONT_FAMILY,
                fontSize: 13,
                lineHeight: 1.6,
                whiteSpace: 'nowrap',
                transition: 'color .2s ease, border-color .2s ease',
                '& .MuiSvgIcon-root': { fontSize: 15 },
                '&:hover': icon
                    ? { color: 'text.primary', borderColor: 'primary.main' }
                    : undefined,
            }}
        >
            {icon}
            {label}
        </Box>
    )
}

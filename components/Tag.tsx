import { Box } from '@mui/material'

import { MONO_FONT_FAMILY } from '../constants/fonts'

export default function Tag({ label }: { label: string }) {
    return (
        <Box
            component="span"
            sx={{
                display: 'inline-block',
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
            }}
        >
            {label}
        </Box>
    )
}

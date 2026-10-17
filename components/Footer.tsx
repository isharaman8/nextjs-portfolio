import { Box, Container, Typography } from '@mui/material'

import { PROFILE } from '../constants/profile'

export default function Footer() {
    return (
        <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', py: 4 }}>
            <Container maxWidth="lg">
                <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                    {PROFILE.name} · {PROFILE.location} · Built with Next.js
                </Typography>
            </Container>
        </Box>
    )
}

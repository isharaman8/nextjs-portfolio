import { Box, Container, Typography } from '@mui/material'

import Reveal from './Reveal'
import { MONO_FONT_FAMILY } from '../constants/fonts'

interface IProps {
    id: string
    index: string
    title: string
    children: React.ReactNode
}

export default function Section({ id, index, title, children }: IProps) {
    return (
        <Box component="section" id={id} sx={{ py: { xs: 10, md: 14 } }}>
            <Container maxWidth="lg">
                <Reveal>
                    <Typography
                        component="p"
                        sx={{
                            fontFamily: MONO_FONT_FAMILY,
                            fontSize: 14,
                            color: 'primary.main',
                            mb: 1.5,
                        }}
                    >
                        {index} / {id}
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: 32, md: 44 },
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                            mb: { xs: 5, md: 7 },
                        }}
                    >
                        {title}
                    </Typography>
                </Reveal>
                {children}
            </Container>
        </Box>
    )
}

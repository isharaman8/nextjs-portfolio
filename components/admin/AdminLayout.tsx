import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Box, Button, Container, Typography } from '@mui/material'

import { adminRequest } from './adminApi'
import { MONO_FONT_FAMILY } from '../../constants/fonts'

interface IProps {
    title: string
    showLogout?: boolean
    actions?: React.ReactNode
    children: React.ReactNode
}

export default function AdminLayout({ title, showLogout = true, actions, children }: IProps) {
    const router = useRouter()

    const handleLogout = async () => {
        await adminRequest({ url: '/api/admin/logout', method: 'POST' })
        router.replace('/admin/login')
    }

    return (
        <>
            <Head>
                <title>{`${title} – Admin`}</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <Box component="header" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Container
                    maxWidth="lg"
                    sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}
                >
                    <Typography
                        component={Link}
                        href="/admin"
                        sx={{ fontFamily: MONO_FONT_FAMILY, fontWeight: 700, flexGrow: 1 }}
                    >
                        ak
                        <Box component="span" sx={{ color: 'primary.main' }}>
                            .
                        </Box>{' '}
                        admin
                    </Typography>
                    <Button component={Link} href="/blog" color="inherit" size="small">
                        View blog
                    </Button>
                    {showLogout && (
                        <Button onClick={handleLogout} color="inherit" size="small">
                            Log out
                        </Button>
                    )}
                </Container>
            </Box>
            <Container component="main" maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                        mb: 4,
                    }}
                >
                    <Typography variant="h1" sx={{ fontSize: { xs: 26, md: 32 }, fontWeight: 700 }}>
                        {title}
                    </Typography>
                    {actions}
                </Box>
                {children}
            </Container>
        </>
    )
}

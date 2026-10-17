import { useState } from 'react'
import { useRouter } from 'next/router'
import type { GetServerSideProps } from 'next'
import { Alert, Box, Button, TextField } from '@mui/material'

import AdminLayout from '../../components/admin/AdminLayout'
import { adminRequest } from '../../components/admin/adminApi'
import { isAdminRequest } from '../../lib/auth'

export default function AdminLogin() {
    const router = useRouter()
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setIsSubmitting(true)
        setError('')
        try {
            await adminRequest({ url: '/api/admin/login', method: 'POST', body: { password } })
            router.replace('/admin')
        } catch (err) {
            setError((err as Error).message)
            setIsSubmitting(false)
        }
    }

    return (
        <AdminLayout title="Sign in" showLogout={false}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'grid', gap: 2, maxWidth: 380 }}
            >
                {error && <Alert severity="error">{error}</Alert>}
                <TextField
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    autoFocus
                    required
                />
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                    Sign in
                </Button>
            </Box>
        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    if (isAdminRequest(req)) {
        return { redirect: { destination: '/admin', permanent: false } }
    }
    return { props: {} }
}

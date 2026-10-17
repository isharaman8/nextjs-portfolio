import type { GetServerSideProps } from 'next'

import AdminLayout from '../../../components/admin/AdminLayout'
import PostEditor from '../../../components/admin/PostEditor'
import { isAdminRequest, redirectToLogin } from '../../../lib/auth'

export default function NewPost() {
    return (
        <AdminLayout title="New post">
            <PostEditor />
        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    if (!isAdminRequest(req)) return redirectToLogin()
    return { props: {} }
}

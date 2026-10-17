import type { GetServerSideProps } from 'next'

import AdminLayout from '../../../components/admin/AdminLayout'
import PostEditor from '../../../components/admin/PostEditor'
import { isAdminRequest, redirectToLogin } from '../../../lib/auth'
import { getPostById } from '../../../lib/posts'
import type { Post } from '../../../lib/postTypes'

interface IProps {
    post: Post
}

export default function EditPost({ post }: IProps) {
    return (
        <AdminLayout title="Edit post">
            {/* key remounts the editor when navigating from "new" to the saved post */}
            <PostEditor key={post.id} initialPost={post} />
        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps<IProps> = async ({ req, params }) => {
    if (!isAdminRequest(req)) return redirectToLogin()

    const post = await getPostById({ id: String(params?.id) })
    if (!post) return { notFound: true }
    return { props: { post } }
}

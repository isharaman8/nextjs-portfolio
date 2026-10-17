import { Box } from '@mui/material'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

import { MONO_FONT_FAMILY } from '../constants/fonts'

interface IProps {
    content: string
}

// Body images have unknown dimensions, so a plain lazy <img> instead of next/image
const components: Components = {
    img: ({ src, alt }) => {
        if (!src) return null
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={String(src)} alt={alt ?? ''} loading="lazy" decoding="async" />
    },
}

// Raw HTML in posts is ignored (react-markdown's default), so content needs no sanitizing
export default function Markdown({ content }: IProps) {
    return (
        <Box
            sx={{
                color: 'text.primary',
                fontSize: { xs: 16, md: 17 },
                lineHeight: 1.8,
                overflowWrap: 'break-word',
                '& > :first-child': { mt: 0 },
                '& h1, & h2, & h3, & h4': {
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                    mt: 5,
                    mb: 2,
                },
                '& h1': { fontSize: { xs: 28, md: 34 } },
                '& h2': { fontSize: { xs: 24, md: 28 } },
                '& h3': { fontSize: { xs: 20, md: 22 } },
                '& p, & ul, & ol, & blockquote, & pre, & table': { my: 2.5 },
                '& li': { mb: 0.75 },
                '& a': {
                    color: 'primary.main',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                },
                '& blockquote': {
                    mx: 0,
                    pl: 2.5,
                    borderLeft: 3,
                    borderColor: 'primary.main',
                    color: 'text.secondary',
                },
                '& code': {
                    fontFamily: MONO_FONT_FAMILY,
                    fontSize: '0.88em',
                },
                '& :not(pre) > code': {
                    px: 0.75,
                    py: 0.25,
                    border: 1,
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                },
                '& pre': {
                    overflowX: 'auto',
                    border: 1,
                    borderColor: 'divider',
                },
                // highlight.js theme supplies the code block colors
                '& pre code.hljs': { p: 2.5, display: 'block' },
                '& img': {
                    display: 'block',
                    maxWidth: '100%',
                    height: 'auto',
                    mx: 'auto',
                    border: 1,
                    borderColor: 'divider',
                },
                '& hr': { border: 0, borderTop: 1, borderColor: 'divider', my: 5 },
                '& table': {
                    display: 'block',
                    overflowX: 'auto',
                    borderCollapse: 'collapse',
                },
                '& th, & td': {
                    border: 1,
                    borderColor: 'divider',
                    px: 1.5,
                    py: 1,
                    textAlign: 'left',
                },
            }}
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </Box>
    )
}

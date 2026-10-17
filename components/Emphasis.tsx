import { Fragment } from 'react'
import { Box } from '@mui/material'

// Renders "plain **highlighted** plain" with the highlighted parts in bold
export default function Emphasis({ text }: { text: string }) {
    const parts = text.split('**')

    return (
        <>
            {parts.map((part, index) => {
                const isHighlighted = index % 2 === 1
                if (!isHighlighted) return <Fragment key={index}>{part}</Fragment>

                return (
                    <Box
                        component="strong"
                        key={index}
                        sx={{ color: 'text.primary', fontWeight: 600 }}
                    >
                        {part}
                    </Box>
                )
            })}
        </>
    )
}

import { useRef } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'

interface IProps {
    url: string | null
    alt: string
    isUploading: boolean
    onSelectFile: (file: File) => void
    onAltChange: (alt: string) => void
    onRemove: () => void
}

export default function CoverImageField({
    url,
    alt,
    isUploading,
    onSelectFile,
    onAltChange,
    onRemove,
}: IProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        // reset so choosing the same file again still fires onChange
        event.target.value = ''
        if (file) onSelectFile(file)
    }

    return (
        <Box sx={{ display: 'grid', gap: 1.5 }}>
            <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
                Cover image (cards, post header and share preview)
            </Typography>
            {url && (
                <Box
                    component="img"
                    src={url}
                    alt={alt}
                    sx={{
                        width: '100%',
                        maxWidth: 420,
                        aspectRatio: '16 / 9',
                        objectFit: 'cover',
                        border: 1,
                        borderColor: 'divider',
                    }}
                />
            )}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center' }}>
                <Button
                    variant="outlined"
                    startIcon={<ImageOutlinedIcon />}
                    onClick={() => inputRef.current?.click()}
                    disabled={isUploading}
                >
                    {url ? 'Replace cover' : 'Upload cover'}
                </Button>
                {url && (
                    <Button color="inherit" onClick={onRemove}>
                        Remove
                    </Button>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                />
            </Box>
            {url && (
                <TextField
                    label="Cover alt text"
                    value={alt}
                    onChange={(event) => onAltChange(event.target.value)}
                    size="small"
                    sx={{ maxWidth: 420 }}
                />
            )}
        </Box>
    )
}

import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Button, useTheme } from '@mui/material'

import { LIGHTTHEME, DARKTHEME } from '../constants/themeColor'
import styles from '../styles/singleProject.module.scss'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { lg: `80vw`, xs: `100vw`, md: `90vw` },
    height: `max-content`,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    paddingBottom: 2,
    overflow: `scroll`,
}

export default function ImageModal({
    image,
    handleClose,
    handleOpen,
    open,
}: any) {
    const theme: any = useTheme()
    const {
        palette: { mode },
    } = theme
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <img src={image} alt={image} className={styles.modalImage} />
                <Button
                    onClick={handleClose}
                    sx={{
                        marginBottom: 0,
                        color:
                            mode === `dark`
                                ? DARKTHEME.button.active
                                : LIGHTTHEME.button.active,
                    }}
                >
                    Close
                </Button>
            </Box>
        </Modal>
    )
}

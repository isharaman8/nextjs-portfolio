import { AnimatePresence, motion } from 'framer-motion'
import Backdrop from './Backdrop'

import styles from '../styles/singleProject.module.scss'

const dropIn = {
    hidden: {
        y: '-100vh',
        opacity: 0,
    },
    visible: {
        y: '0',
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: '100vh',
        opacity: 0,
    },
}

export default function FramerModal({ handleClose, image }: any) {
    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className={styles.modalBody}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <img
                    src={image}
                    className={styles.modalImage}
                    alt="modal image"
                />
                {/* <AnimatePresence> */}
                <motion.button
                    className={styles.modalCloseButton}
                    initial={{ translateX: 20, opacity: 0 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    drag
                    exit={{ opacity: 0 }}
                    transition={{ type: `spring` }}
                    whileHover={{
                        scale: 1.2,
                    }}
                    onClick={handleClose}
                >
                    Close
                </motion.button>
                {/* </AnimatePresence> */}
            </motion.div>
        </Backdrop>
    )
}

import { motion } from 'framer-motion'
import styles from '../styles/singleProject.module.scss'

export default function Backdrop({ children, onClick }: any) {
    return (
        <motion.div
            onClick={onClick}
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </motion.div>
    )
}

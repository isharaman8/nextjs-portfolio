import { motion } from 'framer-motion'

export default function PageSwapMotion({ children }: any) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: `tween`, duration: 0.5 }}
        >
            {children}
        </motion.div>
    )
}

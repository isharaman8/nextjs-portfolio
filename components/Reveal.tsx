import { motion } from 'framer-motion'

interface IProps {
    children: React.ReactNode
    delay?: number
}

// Fades children up into place the first time they scroll into view
export default function Reveal({ children, delay = 0 }: IProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay }}
        >
            {children}
        </motion.div>
    )
}

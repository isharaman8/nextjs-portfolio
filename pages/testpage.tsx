import ThreeComponent from '../components/ThreeComponent'
import { motion } from 'framer-motion'

export default function Testpage() {
    return (
        <motion.div
            animate={{ x: `100px` }}
            style={{ marginTop: 130, backgroundColor: `red` }}
        >
            I'm Animated
        </motion.div>
    )
}

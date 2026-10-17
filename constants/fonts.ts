import { Inter, JetBrains_Mono } from 'next/font/google'

export const sansFont = Inter({ subsets: ['latin'], display: 'swap' })
export const monoFont = JetBrains_Mono({ subsets: ['latin'], display: 'swap' })

export const MONO_FONT_FAMILY = monoFont.style.fontFamily

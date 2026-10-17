import * as React from 'react'
import { createContext } from 'react'

const ColorModeContext = createContext({ toggleColorMode: () => {} })

export default ColorModeContext

import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'
import { motion } from 'framer-motion'

import { ICONS } from '../constants/icons'
import { CapitalizeString } from '../utils/stringFunctions'
import styles from '../styles/tech.module.scss'
import { FONT_SIZES } from '../constants/fontsSize'
import PageSwapMotion from '../components/PageSwapMotion'
import { useTheme } from '@emotion/react'
import { DARKTHEME, LIGHTTHEME } from '../constants/themeColor'

export default function Tech() {
    const theme: any = useTheme()
    const {
        palette: { mode },
    } = theme
    return (
        <PageSwapMotion>
            <Box component={'div'} mt={15} id="tech">
                <Typography
                    variant={'h2'}
                    component={'h2'}
                    textAlign={'center'}
                    sx={{
                        fontSize: {
                            ...FONT_SIZES.tech.h2,
                        },
                    }}
                >
                    Techolologies I've worked on
                </Typography>
                <Grid
                    container
                    spacing={5}
                    mt={2}
                    width={'60%'}
                    ml={'auto'}
                    mr={'auto'}
                    // style={{ background: `red` }}
                >
                    {ICONS.map((one: string) => {
                        return (
                            <Grid
                                key={one}
                                item
                                lg={4}
                                md={6}
                                xs={6}
                                sx={{
                                    zIndex: 5,
                                    padding: 0,
                                }}
                                className={styles.customGridBox}
                            >
                                <motion.div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: `fit-content`,
                                        borderRadius: '10px',
                                        flexDirection: 'column',
                                        cursor: `pointer`,
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    initial={{ scale: 1 }}
                                    whileTap={{ scale: 1 }}
                                >
                                    <img
                                        className={styles.techstackicon}
                                        src={'/static/TECH_ICONS/' + one}
                                    />
                                    <Typography
                                        variant={'h5'}
                                        mt={3}
                                        sx={{
                                            fontSize: {
                                                ...FONT_SIZES.tech.h5,
                                            },
                                        }}
                                    >
                                        {one === 'material-ui-1.svg'
                                            ? 'MaterialUI'
                                            : CapitalizeString(one)}
                                    </Typography>
                                </motion.div>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
        </PageSwapMotion>
    )
}

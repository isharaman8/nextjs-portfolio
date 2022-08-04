import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'
import { ICONS } from '../constants/icons'
import { CapitalizeString } from '../utils/stringFunctions'

import styles from '../styles/tech.module.scss'
import { FONT_SIZES } from '../constants/fontsSize'

export default function Tech() {
    return (
        <Box mt={15}>
            <Typography
                variant={'h2'}
                component={'h2'}
                textAlign={'center'}
                sx={{
                    fontSize: {
                        lg: FONT_SIZES.tech.h2.lg,
                        md: FONT_SIZES.tech.h2.md,
                        xs: FONT_SIZES.tech.h2.xs,
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
            >
                {ICONS.map((one: string) => {
                    return (
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xs={12}
                            sx={{
                                zIndex: 5,
                                padding: 0,
                            }}
                            className={styles.customGridBox}
                        >
                            <Box
                                style={{
                                    backgroundColor: `#5a5a5a`,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '200px',
                                    borderRadius: '10px',
                                    flexDirection: 'column',
                                }}
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
                                            lg: FONT_SIZES.tech.h5.lg,
                                            md: FONT_SIZES.tech.h5.md,
                                            xs: FONT_SIZES.tech.h5.xs,
                                        },
                                    }}
                                >
                                    {one === 'material-ui-1.svg'
                                        ? 'MaterialUI'
                                        : CapitalizeString(one)}
                                </Typography>
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}

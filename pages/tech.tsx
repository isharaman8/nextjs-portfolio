import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'
import { ICONS } from '../constants/icons'

export default function Tech() {
    return (
        <Box mt={15}>
            <Typography variant={'h2'} component={'h2'} textAlign={'center'}>
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
                        <Grid item xs={4} style={{ zIndex: 5 }}>
                            <Box
                                style={{
                                    backgroundColor: `#5a5a5a`,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '200px',
                                    borderRadius: '10px',
                                    zIndex: 5,
                                    flexDirection: 'column',
                                }}
                            >
                                <img
                                    src={`/static/TECH_ICONS/${one}`}
                                    width={100}
                                    height={100}
                                />
                                <Typography variant={'h5'} mt={3}>
                                    CSS
                                </Typography>
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}

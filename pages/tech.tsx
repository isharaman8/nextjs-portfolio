import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'

export default function Tech() {
    return (
        <Box mt={15}>
            <Typography variant={'h2'} component={'h2'} textAlign={'center'}>
                Techolologies I've worked on
            </Typography>
            <Grid container spacing={2} mt={5}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((one: number) => {
                    return (
                        <Grid item xs={3}>
                            <Box
                                style={{
                                    backgroundColor: `rgba(255, 255, 255, 0.3)`,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '200px',
                                    borderRadius: '10px',
                                }}
                            >
                                {' '}
                                Card
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}

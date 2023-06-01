import { Box, Divider, IconButton, Typography, makeStyles } from '@material-ui/core'
import { AddCircleOutlined } from '@material-ui/icons'
import React from 'react'
import { ToolbarStyles } from '../styles'

const ToolbarAutomations: React.FC<{
    onClick: () => void
}> = ({ onClick }) => {
    const classes = ToolbarStyles()
    return (
        <>
            <Box className={classes.box}>
                <Typography variant='h5'>
                    Automations
                </Typography>
                <Box>
                    <Box className={classes.addBox}>
                        <IconButton className={classes.iconButton} onClick={onClick}>
                            <AddCircleOutlined />
                        </IconButton>
                        <Typography variant='body2' className={classes.typography}>Create a new Automations</Typography>
                    </Box>
                </Box>
            </Box>
            <Divider />
        </>
    )
}

export default ToolbarAutomations
import { TableColumnVisibility } from '@devexpress/dx-react-grid'
import { Box, Divider, IconButton, Typography } from '@material-ui/core'
import { AddCircleOutlined } from '@material-ui/icons'
import React from 'react'

interface Props {
    onClick: () => void
}

const ToolbarAutomations: React.FC<Props> = ({onClick}) => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px', alignItems: 'center' }}>
                <Typography variant='h5'>
                    Automations
                </Typography>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton style={{ padding: 1 }} onClick={onClick}>
                            <AddCircleOutlined />
                        </IconButton>
                        <Typography variant='body2' style={{ marginLeft: 3 }}>Create a new Automations</Typography>
                    </Box>
                </Box>
            </Box>
            <Divider />
        </>
    )
}

export default ToolbarAutomations
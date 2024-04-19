import React, { useContext } from 'react';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import { serialMonitorContext } from './SerialMonitorContext';

export const SerialStatus = () => {

    const {portStatus} = useContext(serialMonitorContext);

    return (
        <Box display={'flex'} 
            justifyContent={'space-around'}             
            margin={3}
            padding={1}
            boxShadow={0}
            borderRadius={1}
            overflow={'hidden'}
            flexWrap={'wrap'}
            >
            
            <Box minWidth={'30%'}>
                <Typography>
                <strong>Serial Port Conexion Status:</strong> 
                {portStatus.connected ? 'Connected' : 'Disconnected'}
                </Typography>            
            </Box>
            <Box minWidth={'30%'}>
                <Typography>
                <strong>Port Name:</strong> {portStatus.portName ? portStatus.portName : 'N/A'}
                </Typography>                        
            </Box>
            <Box minWidth={'30%'}>
                <Typography>
                <strong>Baud Rate</strong>: {portStatus.baudRate ? portStatus.baudRate : 'N/A'}
                </Typography>            
            </Box>            
        </Box>
    );
}
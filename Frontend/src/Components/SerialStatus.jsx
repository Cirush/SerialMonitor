import React, { useContext } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { serialMonitorContext } from './SerialMonitorContext';

export const SerialStatus = () => {

    const {portStatus} = useContext(serialMonitorContext);

    return (
        <Card sx={{ maxWidth: 275, margin: '20px auto' }}>
        <CardContent>
            <Typography color="text.secondary" gutterBottom>
            Serial Port Conexion Status
            </Typography>
            <Typography variant="h5" component="div">
            {portStatus.connected ? 'Connected' : 'Disconnected'}
            </Typography>
            <Typography color="text.secondary">
            Port Name: {portStatus.portName ? portStatus.portName : 'N/A'}
            </Typography>
            <Typography variant="body2">
            Baud Rate: {portStatus.baudRate ? portStatus.baudRate : 'N/A'}
            </Typography>
        </CardContent>
        </Card>
    );
}

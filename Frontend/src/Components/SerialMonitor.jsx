import React from 'react'
import Ports from './Ports'
import { SerialCharts } from './SerialCharts'
import { Box, Container, Paper } from '@mui/material'
import { SerialStatus } from './SerialStatus'
import { SerialMonitorContext } from './SerialMonitorContext'
import { TrackBar } from './TrackBar'

export const SerialMonitor = () => {

  return (
    <SerialMonitorContext>   
    <SerialStatus />
    <Container>
            <Ports />
            <Box display={'flex'} justifyContent={'center'} margin={5} flexWrap={'wrap'} gap={5}>
              <TrackBar name='Motor DC'/>
              <TrackBar name='Motor 2'/>
            </Box>
            <SerialCharts />
    </Container>
    </SerialMonitorContext>
  );
}

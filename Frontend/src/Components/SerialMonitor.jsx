import React from 'react'
import Ports from './Ports'
import { SerialCharts } from './SerialCharts'
import { Paper } from '@mui/material'
import { SerialStatus } from './SerialStatus'
import { SerialMonitorContext } from './SerialMonitorContext'

export const SerialMonitor = () => {

  return (
    <SerialMonitorContext>   
          <Paper elevation={3} sx={{ p: 2 }}>
            <SerialStatus />
            <Ports />
            <SerialCharts />
          </Paper>
    </SerialMonitorContext>
  );
}

import * as React from 'react';
import './App.css'
import { CssBaseline, Container, Typography, Box } from '@mui/material';
import { SerialMonitor } from './Components/SerialMonitor';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box display="flex" alignItems="center" justifyContent="center" >
          <SerialMonitor />
        </Box>
      </Container>
    </>
  );
}

export default App

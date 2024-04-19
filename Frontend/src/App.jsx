import * as React from 'react';
import { CssBaseline, Container, Box } from '@mui/material';
import { SerialMonitor } from './Components/SerialMonitor';
import './App.css'

function App() {
  return (
    <>
    <CssBaseline />
      <Container>
          <SerialMonitor />
      </Container>
    </>
  );
}

export default App

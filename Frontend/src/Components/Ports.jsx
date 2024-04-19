import React, { useState, useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, TextField, Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import { serialMonitorContext } from './SerialMonitorContext';
import usePorts from './Hooks/usePorts';

const Ports = () => {

  const {portStatus} = useContext(serialMonitorContext);
  const {ports, connect, disconnect} = usePorts();
  const [selectedPort, setSelectedPort] = useState('');

  const handleChange = (event) => {
    setSelectedPort(event.target.value);
  };

  const handleClick = () => {
    portStatus.connected ? disconnect() : connect(selectedPort);
  }

  return (
    <Box justifyContent={'center'} display={'flex'}>
      <FormControl>
        <Stack direction="row" spacing={1} justifyContent={'center'}>
          <InputLabel>Port</InputLabel>        
          <Select
            value={portStatus.connected ? portStatus.portName : selectedPort}
            label="Port"
            onChange={handleChange}
            sx={{ minWidth: 80 }}
            disabled={portStatus.connected}
            > 
            { 
              ports 
              &&
              ports.map((item, index) => (
                <MenuItem key={index} value={item}>{item}</MenuItem>
              ))
            }
          </Select>
          
          <TextField
            disabled={portStatus.connected}
            defaultValue={"9600"}
            />
          
          <Button variant="contained"
            color={portStatus.connected ? "error" : "success"}
            onClick={handleClick}>
            {
              portStatus.connected ? 'Disconnect' : 'Connect'
            }      
          </Button>
        </Stack>
      </FormControl>  
    </Box>
  );
}

export default Ports;

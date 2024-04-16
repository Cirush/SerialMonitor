import React, { useState, useEffect, useContext } from 'react';
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { serialMonitorContext } from './SerialMonitorContext';

const Ports = () => {

  const {portStatus} = useContext(serialMonitorContext);

  const [ports, setPorts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPort, setSelectedPort] = useState('');

  const handleChange = (event) => {
    setSelectedPort(event.target.value);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    
    const connect = async () => {
      try{
        const response = await fetch("api/port/connect", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            name: selectedPort, 
            baudRate: 9600,
          })
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
      }catch(error){
        console.error(error);
      }
    };

    const disconnect = async () => {
      try{
        const response = await fetch("api/port/disconnect", {
          method: 'POST',
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
      }catch(error){
        console.error(error);
      }
    };

    portStatus.connected ? disconnect() : connect();
  }
  
  useEffect(() => {
    
    const url = "api/ports";
    const fetchPorts = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPorts(data);
        setLoading(false); 
      } catch (error) {
        setError(error.message); 
        setLoading(false);
      }
    };

    fetchPorts();
  }, []); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
      <Box sx={{ display: 'inline-flex', margin: '20px auto' }}>
        <FormControl fullWidth>
          <Stack direction="row" spacing={1}>
            <InputLabel id="demo-simple-select-label">Port</InputLabel>
            
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={portStatus.connected ? portStatus.portName : selectedPort}
              label="Port"
              onChange={handleChange}
              sx={{ minWidth: 80 }}
              disabled={portStatus.connected}
            > 
              {
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

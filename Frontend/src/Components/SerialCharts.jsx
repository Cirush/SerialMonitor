import React, { useContext, useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Card, Typography } from '@mui/material';
import { serialMonitorContext } from './SerialMonitorContext';
import { SerialChart } from './SerialChart';

export const SerialCharts = () => {

  const {data, portStatus} = useContext(serialMonitorContext);
  
  const maxPoints = 300;

  const [xData, setxData] = useState([0]);
  const [temperature, setTemperature] = useState([0]);
  const [humidity, setHumidity] = useState([0]);
  const [brightness, setBrightness] = useState([0]);
  const [angleX, setAngleX] = useState([0]);
  const [angleY, setAngleY] = useState([0]);

  useEffect(() => {
    if(portStatus.connected)
    {
      setTemperature(prevTemperature => [...prevTemperature, data.temperature].slice(-maxPoints));
      setHumidity(prevHumidity => [...prevHumidity, data.humidity].slice(-maxPoints));
      setBrightness(prevBrightness => [...prevBrightness, data.brightness].slice(-maxPoints));
      setAngleX(prevAngleX => [...prevAngleX, data.angleX].slice(-maxPoints));
      setAngleY(prevAngleY => [...prevAngleY, data.angleY].slice(-maxPoints));
      setxData(prevxData => {
        if(prevxData.length == 0) 
          return [0];
        else
          return (prevxData.length < maxPoints) ? [prevxData[0] - 1, ...prevxData] : prevxData;
      }); 
    }
  }, [data])
  
  return (
      <Box display="flex" justifyContent="center"  flexWrap="wrap" gap={2} >
        <SerialChart Tile="Temperature Cº" xData={xData} yData={temperature}/>
        <SerialChart Tile="Humidity" xData={xData} yData={humidity}/>
        <SerialChart Tile="Brightness" xData={xData} yData={brightness}/>
        <SerialChart Tile="X Angle" xData={xData} yData={angleX}/>
        <SerialChart Tile="Y Angle" xData={xData} yData={angleY}/>
      </Box>
  );
};
import React, { useContext, useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box, Card, Typography } from '@mui/material';
import { serialMonitorContext } from './SerialMonitorContext';

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
        <Card sx={{ flex: '1 0 calc(50% - 16px)', maxWidth: "500px", minWidth: "500px" }}>
          <Typography variant="h5" component="div">
          Temperature Cº
          </Typography>
          <LineChart skipAnimation={xData.length < maxPoints ? false : true}
          xData={[{ data: xData }]}
          series={[
            {
              data: temperature,
              area: false,
              showMark: false,
              curve: "linear",
            },
          ]}
          width={500}
          height={300}
          />
        </Card>
        <Card sx={{ flex: '1 0 calc(50% - 16px)', maxWidth: "500px", minWidth: "500px" }}>
          <Typography variant="h5" component="div">
          Humidity
          </Typography>
          <LineChart skipAnimation={xData.length < maxPoints ? false : true}
          xData={[{ data: xData }]}
          series={[
            {
              data: humidity,
              area: false,
              showMark: false,
              curve: "linear"
            },
          ]}
          width={500}
          height={300}
          />
        </Card>
        <Card sx={{ flex: '1 0 calc(50% - 16px)', maxWidth: "500px", minWidth: "500px" }}>
          <Typography variant="h5" component="div">
          Brightness
          </Typography>
          <LineChart skipAnimation={xData.length < maxPoints ? false : true}
          xData={[{ data: xData }]}
          series={[
            {
              data: brightness,
              area: false,
              showMark: false,
              curve: "linear"
            },
          ]}
          width={500}
          height={300}
          />
        </Card>
        <Card sx={{ flex: '1 0 calc(50% - 16px)', maxWidth: "500px", minWidth: "500px" }}>
          <Typography variant="h5" component="div">
          AngleX
          </Typography>
          <LineChart skipAnimation={xData.length < maxPoints ? false : true}
          xData={[{ data: xData }]}
          series={[
            {
              data: angleX,
              area: false,
              showMark: false,
              curve: "linear"
            },
          ]}
          width={500}
          height={300}
          />
        </Card>
        <Card sx={{ flex: '1 0 calc(50% - 16px)', maxWidth: "500px", minWidth: "500px" }}>
          <Typography variant="h5" component="div">
          AngleY
          </Typography>
          <LineChart skipAnimation={xData.length < maxPoints ? false : true}
          xData={[{ data: xData }]}
          series={[
            {
              data: angleY,
              area: false,
              showMark: false,
              curve: "linear"
            },
          ]}
          width={500}
          height={300}
          />
        </Card>
      </Box>
  );
};
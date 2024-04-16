import React, { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

export const serialMonitorContext = React.createContext(null);

export const SerialMonitorContext = ( { children }) => {

    const [connection, setConnection] = useState(null);
    const [data, setData] = useState([]);
    const [portStatus, setPortStatus] = useState({
        connected: false,
        portName: '',
        baudRate: 9600,
      });
  
    useEffect(() => {
      const connect = new signalR.HubConnectionBuilder()
        .withUrl("/api/ws")
        .configureLogging(signalR.LogLevel.Information)
        .build();
  
      setConnection(connect);
    }, []);
  
    useEffect(() => {
      if (connection) {
        connection.start()
          .then(result => {
            console.log('Connected!');
  
            connection.on('ReceiveSerialData', serialData => {
              setData(serialData);
              console.log(serialData);
            });
  
            connection.on('ReceivePortStatus', portStatus => {
              setPortStatus(portStatus);
            });
          })
          .catch(e => console.log('Connection failed: ', e));
      }
    }, [connection]);

    return (
        <serialMonitorContext.Provider
            value={{
                connection,
                data,
                portStatus,
            }}>
            { children }
        </serialMonitorContext.Provider>
    )
}

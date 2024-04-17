import { useState, useEffect } from 'react'

const usePorts = () => {
    const [ports, setPorts] = useState(null);
    
    const url = "api/ports";

    const connect = (selectedPort) => {
        fetch("api/port/connect", 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name: selectedPort, 
                baudRate: 9600,
            })
        })
        .catch(error => {
            console.error(error);
        });
    };

    const disconnect = () => {
        fetch("api/port/disconnect", 
        {
            method: 'POST'
        })
        .catch(error => {
            console.error(error);
        });
    };

    const fetchPorts = async () => {
        fetch(url)
            .then( response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                return response.json();
            })
            .then( data => {
                setPorts(data);
            })
            .catch( error => {
                console.error(error);
            })
    };

    useEffect(() => {    
        fetchPorts();
      }, []);

      return {
        ports, 
        connect,
        disconnect
      };
}

export default usePorts;
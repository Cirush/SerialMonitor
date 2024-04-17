using System;
using System.IO.Ports;

public interface ISerialPortManager
{
    string[] GetPortNames();
    void Connect(string portName);
    void Disconnect();
    SensorData Read();
    void Write();

    PortStatus PortStatus {get;}
}

public class SerialPortManager : ISerialPortManager
{
    SerialPort _serialPort;
    ILogger<SerialPortManager> _logger;

    public SerialPortManager(ILogger<SerialPortManager> logger)
    {
        _logger = logger;
        _serialPort = new SerialPort();
    }
    public PortStatus PortStatus { get => new PortStatus{
        PortName = _serialPort.PortName,
        BaudRate = _serialPort.BaudRate,
        Connected = _serialPort.IsOpen
    };}

    public void Connect(string portName)
    {
        if(_serialPort.IsOpen) _serialPort.Close();

        _serialPort = new SerialPort(portName);

        // Configurar el puerto serie
        _serialPort.BaudRate = 9600;
        _serialPort.Parity = Parity.None;
        _serialPort.StopBits = StopBits.One;
        _serialPort.DataBits = 8;
        _serialPort.Handshake = Handshake.None;

        // Configurar los timeouts (opcional pero recomendado)
        _serialPort.ReadTimeout = 1000;    // Timeout de lectura en milisegundos
        _serialPort.WriteTimeout = 1000;   // Timeout de escritura en milisegundos

        try
        {
            _serialPort.Open();
            _logger.LogInformation("Puerto abierto correctamente");
        }
        catch (Exception ex)
        {
            _logger.LogError("Error al abrir el puerto serie: " + ex.Message);
        }

    }

    public void Disconnect()
    {
        try
        {
            if(_serialPort.IsOpen) _serialPort.Close();
            _logger.LogInformation("Puerto cerrado correctamente");
        }
        catch (Exception ex)
        {
            _logger.LogError("Error al cerrar el puerto serie: " + ex.Message);
        }

    }

    public string[] GetPortNames() => SerialPort.GetPortNames();

    public SensorData Read()
    {
        char[] readBuffer = new char[256];
        if(_serialPort.IsOpen)
        {
            try
            {
                var command = "[S]".ToCharArray();
                _serialPort.Write(command, 0, command.Length);
                _serialPort.Read(readBuffer, 0, readBuffer.Length);
                return ParseAndValidateMessage(new String(readBuffer));
            }catch(Exception ex){
                _logger.LogError(ex, "There was a problem reading data.");
            }
        }
        
        return new SensorData();
    }

    public void Write()
    {
        throw new NotImplementedException();
    }

    private SensorData ParseAndValidateMessage(String message)
    {
        message = message.Replace("\0", "");
        message = message.Trim();
        _logger.LogInformation(message);

        if (message.StartsWith("[") && message.EndsWith("]"))
        {
            message = message.Substring(1, message.Length - 2);

            string[] parts = message.Split(',');

            string checksumHex = parts[parts.Length - 1];
            byte expectedChecksum = Convert.ToByte(checksumHex, 16);

            string dataToCheck = message.Substring(0, message.LastIndexOf(',') + 1);
            byte calculatedChecksum = CalculateXORChecksum(dataToCheck);
  
            if (calculatedChecksum == expectedChecksum)
            {
                return new SensorData
                {
                    Temperature = double.Parse(parts[1]),
                    Humidity = double.Parse(parts[2]),
                    Brightness = double.Parse(parts[3]),
                    AngleX = double.Parse(parts[4]),
                    AngleY = double.Parse(parts[5])
                };
            }
            else
            {
                _logger.LogError("Checksum validation failed.");
            }
        }
        else
        {
            _logger.LogError("Message format is invalid.");
        }

        return new SensorData();
    }

    private byte CalculateXORChecksum(string data)
    {
        byte checksum = 0;
        foreach (char c in data)
        {
            checksum ^= (byte)c;
        }

        return checksum;
    }
}
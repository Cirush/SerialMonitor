public interface IClientSerialHub
{
    Task ReceivePortNames(string[] portNames);

    Task ReceiveSerialData(SensorData sensorData);

    Task ReceivePortStatus(PortStatus portStatus);
}
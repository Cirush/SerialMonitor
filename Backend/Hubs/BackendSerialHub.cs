using Microsoft.AspNetCore.SignalR;

public class BackendSerialHub : Hub<IClientSerialHub>
{
    private ISerialPortManager _serialPortManager;

    public BackendSerialHub(ISerialPortManager serialPortManager)
    {
        _serialPortManager = serialPortManager;
    }

    public async Task GetPortNames()
    {
        await Clients.Caller.ReceivePortNames(_serialPortManager.GetPortNames()); 
    }

    public void Connect(Port port)
    {
        if(port?.Name != null){
            _serialPortManager.Connect(port.Name);
        }
    }

    public void Disconnect()
    {
        _serialPortManager.Disconnect();
    }

    public void Write()
    {

    }
}
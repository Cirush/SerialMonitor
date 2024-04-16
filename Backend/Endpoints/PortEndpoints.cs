using System.IO.Ports;

public static class PortEndpoints
{
    public static void MapPortEndpoints(this WebApplication app)
    {
        app.MapGet("ports", GetAllPorts).WithName("Ports").WithOpenApi();
        app.MapPost("port/connect", ConnectPort).WithName("Port").WithOpenApi();
        app.MapPost("port/disconnect", DisconnectPort).WithName("Disconnect").WithOpenApi();
        app.MapHub<BackendSerialHub>("ws");
    }

    public static IResult GetAllPorts()
    {
        Console.WriteLine("Available serial ports on this machine:");
        string[] portNames = SerialPort.GetPortNames();

        return Results.Ok(portNames);
    }

    public static IResult ConnectPort(ISerialPortManager serialPortManager, Port port)
    {
        Console.WriteLine($"ConnectPort endpoint llamado! {port.Name}");

        if(port?.Name != null)
        {
            Console.WriteLine("Valido!");
            serialPortManager.Connect(port.Name);
            return Results.Ok($"Port {port?.Name} opened successfully.");
        } 
        return Results.BadRequest();
    }

    public static IResult DisconnectPort(ISerialPortManager serialPortManager)
    {
        serialPortManager.Disconnect();

        return Results.Ok($"Port disconnected successfully.");
    }
}
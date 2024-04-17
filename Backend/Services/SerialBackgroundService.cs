using Microsoft.AspNetCore.SignalR;

public class SerialBackgroundService : BackgroundService
{
    private readonly ILogger<SerialBackgroundService> _logger;
    private readonly IHubContext<BackendSerialHub, IClientSerialHub> _hubContext;
    
    private readonly ISerialPortManager _serialPortManager;

    public SerialBackgroundService(ILogger<SerialBackgroundService> logger, 
    IHubContext<BackendSerialHub, IClientSerialHub> hubContext,
    ISerialPortManager serialPortManager)
    {
        _logger = logger;
        _hubContext = hubContext;
        _serialPortManager = serialPortManager;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("SerialBackgroundService is starting.");

        stoppingToken.Register(() =>
            _logger.LogInformation("SerialBackgroundService is stopping."));

        while (!stoppingToken.IsCancellationRequested)
        {
            await _hubContext.Clients.All.ReceiveSerialData(_serialPortManager.Read());

            await Task.Delay(TimeSpan.FromMilliseconds(1000), stoppingToken);
        }
    }
}

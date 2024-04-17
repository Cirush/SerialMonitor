using Microsoft.AspNetCore.SignalR;

public class PortStatusBackgroundService : BackgroundService
{
    private readonly ILogger<PortStatusBackgroundService> _logger;
    private readonly IHubContext<BackendSerialHub, IClientSerialHub> _hubContext;

    private readonly ISerialPortManager _serialPortManager;
    public PortStatusBackgroundService(ILogger<PortStatusBackgroundService> logger, 
        IHubContext<BackendSerialHub, IClientSerialHub> hubContext,
        ISerialPortManager serialPortManager)
    {
        _logger = logger;
        _hubContext = hubContext;
        _serialPortManager = serialPortManager;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("PortStatusBackgroundService is starting.");

        stoppingToken.Register(() =>
            _logger.LogInformation("PortStatusBackgroundService is stopping."));

        while (!stoppingToken.IsCancellationRequested)
        {
            var portStatus = _serialPortManager.PortStatus;

            await _hubContext.Clients.All.ReceivePortStatus(portStatus);

            await Task.Delay(TimeSpan.FromMilliseconds(1000), stoppingToken);
        }
    }
}

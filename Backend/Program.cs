var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();
builder.Services.AddHostedService<SerialBackgroundService>();
builder.Services.AddHostedService<PortStatusBackgroundService>();
builder.Services.AddSingleton<ISerialPortManager, SerialPortManager>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

PortEndpoints.MapPortEndpoints(app);

app.UseHttpsRedirection();

app.Run();

using System.IO.Ports;

public class Port 
{
    public string? Name {get; set;}
    public int? BaudRate {get; set;}
    public Parity? Parity {get; set;}
    public int? DataBits {get;set;}
    public StopBits? StopBits {get; set;}
}
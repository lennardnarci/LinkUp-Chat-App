using Microsoft.AspNetCore.SignalR;

namespace LinkUp_Chat_App.Server.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ILogger<ChatHub> _logger;

        public ChatHub(ILogger<ChatHub> logger)
        {
            _logger = logger;
        }

        public override async Task OnConnectedAsync()
        {
            Console.WriteLine($"Client connected: {Context.ConnectionId}");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            Console.WriteLine($"Client disconnected: {Context.ConnectionId}");
            if (exception != null)
            {
                Console.WriteLine($"Reason: {exception.Message}");
            }
            await base.OnDisconnectedAsync(exception);
        }


        public async Task SendMessage(string user, string message)
        {
            _logger.LogInformation("Received message from user {User}: {Message}", user, message);
            Console.WriteLine($"Received message from user {user}: {message}");

            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}

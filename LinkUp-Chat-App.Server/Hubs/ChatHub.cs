﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace LinkUp_Chat_App.Server.Hubs
{
    [Authorize]
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

        //Join a chatroom
        public async Task JoinRoom(string roomName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
            await Clients.Group(roomName).SendAsync("ReceiveMessage", "System", $"{Context.User?.Identity?.Name ?? "Unknown"} has joined the room.");
        }

        // Leave a chat room
        public async Task LeaveRoom(string roomName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
            await Clients.Group(roomName).SendAsync("ReceiveMessage", "System", $"{Context.User?.Identity?.Name ?? "Unknown"} has left the room.");
        }

        public async Task SendMessage(string roomName, string message)
        {
            _logger.LogInformation("Received message from user {User}: {Message}", Context.User?.Identity?.Name ?? "Unknown", message);
            Console.WriteLine($"Received message from user {Context.User?.Identity?.Name ?? "Unknown"}: {message} in room: {roomName}");

            await Clients.Group(roomName).SendAsync("ReceiveMessage", Context.User?.Identity?.Name ?? "Unknown", message);
        }
    }
}

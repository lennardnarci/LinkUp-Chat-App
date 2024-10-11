using LinkUp_Chat_App.Server.Data.Interfaces;
using LinkUp_Chat_App.Server.Models;
using LinkUp_Chat_App.Server.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System.Security.Claims;

namespace LinkUp_Chat_App.Server.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly ILogger<ChatHub> _logger;
        private readonly IChatRepo _chatRepo;
        private readonly IUserRepo _userRepo;

        public ChatHub(ILogger<ChatHub> logger, IChatRepo chatRepo, IUserRepo userRepo)
        {
            _logger = logger;
            _chatRepo = chatRepo;
            _userRepo = userRepo;
        }

        public override async Task OnConnectedAsync()
        {
            if (Context.User?.Identity != null && Context.User.Identity.IsAuthenticated)
            {
                var username = Context.User?.Identity?.Name;
                if (!string.IsNullOrEmpty(username))
                {
                    // Get the user from the repository
                    if (!Guid.TryParse(Context.User?.FindFirst(ClaimTypes.NameIdentifier)?
                                                                .Value, out Guid userId))
                    {
                        _logger.LogError("Cannot parse user id. OnConnect");
                        throw new Exception("Cannot parse user id. OnConnect");
                    }
                    var user = await _userRepo.GetUserByIdAsync(userId);
                    if (user != null)
                    {
                        // Retrieve the user's rooms from the database
                        var userChatRooms = await _chatRepo.GetUserRoomsAsync(user.Id);
                        foreach (var chatRoom in userChatRooms)
                        {
                            // Add the user to the group for each room they belong to
                            await Groups.AddToGroupAsync(Context.ConnectionId, chatRoom.Name);

                            var messages = await _chatRepo.GetMessagesAsync(chatRoom);
                            foreach (var message in messages)
                            {
                                string finalMessage = message.MessageText;

                                //if (IsBase64String(message.MessageText))
                                //{
                                //    // Om meddelandet är krypterat, försök dekryptera det
                                //    finalMessage = EncryptionHelper.Decrypt(message.MessageText);
                                //}
                                //else
                                //{
                                //    // Om meddelandet inte är krypterat, använd det som det är
                                //    finalMessage = message.MessageText;
                                //}

                                await Clients.Caller.SendAsync("ReceiveMessage",
                                                                                chatRoom.Name,
                                                                                message.User.Username.ToString(),
                                                                                finalMessage,
                                                                                message?.Date ?? DateTime.MinValue);
                            }
                        }
                    }
                }
                Console.WriteLine($"Client connected: {Context.ConnectionId}");
            }
            else
            {
                await Clients.Caller.SendAsync("ReceiveMessage", 
                                                "System", 
                                                "You are not authorized.");
            }
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

        //Create a chatroom
        public async Task CreateRoom(string roomName)
        {
            if (string.IsNullOrEmpty(roomName))
            {
                throw new ArgumentException("Room name is required.");
            }

            await _chatRepo.CreateRoomAsync(roomName);
        }

        //Join a chatroom
        public async Task JoinRoom(string roomName)
        {
            //Get the user from the userrepo
            var username = Context.User?.Identity?.Name;
            if (!Guid.TryParse(Context.User?.FindFirst(ClaimTypes.NameIdentifier)?
                                                        .Value, out Guid userId))
            {
                throw new Exception("Cannot parse user id. JoinRoom.");
            }

            var user = await _userRepo.GetUserByIdAsync(userId);
            if (user == null)
            {
                throw new Exception("User not found.");
            }

            //Get the room from the chatrepo
            var room = await _chatRepo.GetRoomByNameAsync(roomName);
            if (room == null)
            {
                throw new Exception("Room not found.");
            }

            //If user is not already in room
            var userIsInRoom = await _chatRepo.UserIsInRoomAsync(user.Id, room.Id);
            if (!userIsInRoom)
            {
                // Add the user to the room
                await _chatRepo.AddUserToRoomAsync(user.Id, room.Id);

                // Notify all clients in the room that a user has joined
                await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
                await Clients.Group(roomName).SendAsync("ReceiveMessage", 
                                                        room.Name,
                                                        "System", 
                                                        $"{username} has joined the room.");
            }
            else
            {
                await Clients.Caller.SendAsync("ReceiveMessage", 
                                                room.Name, 
                                                "System", 
                                                $"{username}, you are already in this room.");
            }
        }

        //Get users chatrooms
        public async Task GetRooms()
        {
            var username = Context.User?.Identity?.Name;
            if (!string.IsNullOrEmpty(username))
            {
                // Get the user from the repository
                if (!Guid.TryParse(Context.User?.FindFirst(ClaimTypes.NameIdentifier)?
                                                            .Value, out Guid userId))
                {
                    throw new Exception("Cannot parse user id. OnConnect");
                }
                var user = await _userRepo.GetUserByIdAsync(userId);
                if (user != null)
                {
                    // Retrieve the user's rooms from the database
                    var userChatRooms = await _chatRepo.GetUserRoomsAsync(user.Id);

                    // Fetch the latest message for each room
                    var roomsWithLatestMessages = new List<object>();
                    foreach (var room in userChatRooms)
                    {
                        var latestMessage = await _chatRepo.GetLatestMessageAsync(room.Id);

                        string finalMessage = "No messages yet";
                        if (latestMessage != null)
                        {
                            if (IsBase64String(latestMessage.MessageText))
                            {
                                // Om meddelandet är krypterat, försök dekryptera det
                                //finalMessage = EncryptionHelper.Decrypt(latestMessage.MessageText);
                                finalMessage = latestMessage.MessageText;
                            }
                            else
                            {
                                // Om meddelandet inte är krypterat, använd det som det är
                                finalMessage = latestMessage.MessageText;
                            }
                        }

                        roomsWithLatestMessages.Add(new
                        {
                            RoomId = room.Id,
                            RoomName = room.Name,
                            LatestMessage = finalMessage,
                            Timestamp = latestMessage?.Date ?? DateTime.MinValue
                        });
                    }

                    // Send the rooms with their latest messages to the client
                    await Clients.Caller.SendAsync("ReceiveRooms", roomsWithLatestMessages);
                }
            }
        }

        // Leave a chat room
        public async Task LeaveRoom(string roomName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
            await Clients.Group(roomName).SendAsync("ReceiveMessage",
                                                    roomName,
                                                    "System", 
                                                    $"{Context.User?.Identity?.Name ?? "Unknown"} has left the room.");
        }

        public async Task SendMessage(string roomName, string message)
        {
            var encryptedMessage = EncryptionHelper.Encrypt(message);
            var username = Context.User?.Identity?.Name;
            if (string.IsNullOrEmpty(username))
            {
                throw new Exception("User cannot be found");
            }
            // Get the user from the repository
            if (!Guid.TryParse(Context.User?.FindFirst(ClaimTypes.NameIdentifier)?
                                                        .Value, out Guid userId))
            {
                throw new Exception("Cannot parse user id. SendMessage");
            }
            var user = await _userRepo.GetUserByIdAsync(userId);

            if (user == null)
            {
                throw new Exception("User is null");
            }
            // GEt the room from the repository
            var room = await _chatRepo.GetRoomByNameAsync(roomName);
            if (room == null)
            {
                throw new Exception($"{roomName} does not exist");
            }
            var chatMessage = new Message
            {
                User = user,
                MessageText = encryptedMessage,
                ChatRoom = room,
                Date = DateTime.Now,
            };

            //Save to the database
            await _chatRepo.SaveMessageAsync(chatMessage);
            _logger.LogInformation("Received message from user {User}: {Message}", Context.User?.Identity?.Name ?? "Unknown", message);
            Console.WriteLine($"Received message from user {Context.User?.Identity?.Name ?? "Unknown"}: {message} in room: {roomName}");

            await Clients.Group(roomName).SendAsync("ReceiveMessage",
                                                    room.Name,
                                                    Context.User?.Identity?.Name ?? "Unknown", 
                                                    chatMessage.MessageText,
                                                    chatMessage.Date);
        }

        // Check if string is divisible by 4 and that it only conmtains valid Base64 characters
        private static bool IsBase64String(string base64)
        {
            Span<byte> buffer = new Span<byte>(new byte[base64.Length]);
            return base64.Length % 4 == 0 && Convert.TryFromBase64String(base64, buffer, out _);
        }
    }
}

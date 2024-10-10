using LinkUp_Chat_App.Server.Data.Interfaces;
using LinkUp_Chat_App.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace LinkUp_Chat_App.Server.Data.Repos
{
    public class ChatRepo : IChatRepo
    {
        private readonly UsersContext _context;

        public ChatRepo(UsersContext context)
        {
            _context = context;
        }

        public async Task<ChatRoom?> GetRoomByIdAsync(Guid roomId)
        {
            return await _context.ChatRooms
                .Include(x => x.UserChatRooms)
                    .ThenInclude(u => u.User)
                .FirstOrDefaultAsync(r => r.Id == roomId);
        }

        public async Task<IEnumerable<ChatRoom>> GetAllRoomsAsync()
        {
            return await _context.ChatRooms.ToListAsync();
        }

        public async Task CreateRoomAsync(string roomName)
        {
            ChatRoom room = new ChatRoom
            {
                Name = roomName
            };

            var existingRoom = await _context.ChatRooms
                .FirstOrDefaultAsync(x => x.Name == roomName);

            if (existingRoom == null)
            {
                await _context.ChatRooms.AddAsync(room);
                await _context.SaveChangesAsync();
            }
            else
            {
                Console.WriteLine($"Room {roomName} already exists.");
            }
        }

        public async Task<bool> UserIsInRoomAsync(Guid userId, Guid roomId)
        {
            return await _context.UserChatRooms.AnyAsync(uc => uc.UserId == userId && uc.ChatRoomId == roomId);
        }

        public async Task AddUserToRoomAsync(Guid userId, Guid roomId)
        {
            var userChatRoom = new UserChatRoom
            {
                UserId = userId,
                ChatRoomId = roomId
            };

            await _context.UserChatRooms.AddAsync(userChatRoom);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<ChatRoom>> GetUserRoomsAsync(Guid userId)
        {
            return await _context.UserChatRooms
                .Where(uc => uc.UserId == userId)
                .Select(uc => uc.ChatRoom)
                .ToListAsync();
        }

        public async Task<ChatRoom?> GetRoomByNameAsync(string roomName)
        {
            return await _context.ChatRooms.FirstOrDefaultAsync(cr => cr.Name == roomName);
        }

        public async Task SaveMessageAsync(Message message)
        {
            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Message>> GetMessagesAsync(ChatRoom room)
        {
            return await _context.Messages
                .Where(m => m.ChatRoom == room)
                .OrderBy(m => m.Date)
                .Include(m => m.User)
                .Take(50)
                .ToListAsync();
        }

        public async Task<Message?> GetLatestMessageAsync(Guid roomId)
        {
            return await _context.Messages
                .Where(m => m.ChatRoom.Id == roomId)
                .OrderByDescending(m => m.Date)
                .FirstOrDefaultAsync();
        }
    }
}


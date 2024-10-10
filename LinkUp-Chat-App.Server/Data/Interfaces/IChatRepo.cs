using LinkUp_Chat_App.Server.Models;

namespace LinkUp_Chat_App.Server.Data.Interfaces
{
    public interface IChatRepo
    {
        Task<ChatRoom?> GetRoomByIdAsync(Guid roomId);
        Task<ChatRoom?> GetRoomByNameAsync(string roomName);
        Task<IEnumerable<ChatRoom>> GetAllRoomsAsync();
        Task CreateRoomAsync(string roomName);
        Task<bool> UserIsInRoomAsync(Guid userId, Guid roomId);
        Task AddUserToRoomAsync(Guid userId, Guid roomId);
        Task<IEnumerable<ChatRoom>> GetUserRoomsAsync(Guid userId);

        Task SaveMessageAsync(Message message);
        Task<List<Message>> GetMessagesAsync(ChatRoom room);
        Task<Message?> GetLatestMessageAsync(Guid roomId);
    }
}

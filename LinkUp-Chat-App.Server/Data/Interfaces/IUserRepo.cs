using LinkUp_Chat_App.Server.Models;

namespace LinkUp_Chat_App.Server.Data.Interfaces
{
    public interface IUserRepo
    {
        Task<bool> CreateUserAsync(User user);
        Task<bool> DeleteUserAsync(string username);
        Task<User?> GetUserByIdAsync(int id);
        Task<bool> CheckIfUserExistAsync(string username);
        Task<bool> UpdateUserAsync(User user);
        Task<User?> ValidateCredentialsAsync(string username, string password);
    }
}

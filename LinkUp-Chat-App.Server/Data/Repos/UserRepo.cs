using LinkUp_Chat_App.Server.Data.Interfaces;
using LinkUp_Chat_App.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace LinkUp_Chat_App.Server.Data.Repos
{
    public class UserRepo : IUserRepo
    {
        private readonly UsersContext _context;
        public UserRepo(UsersContext context)
        {
            _context = context;
        }

        public async Task<bool> CheckIfUserExistAsync(string username)
        {
            return await _context.Users.AnyAsync(u => u.Username == username);
        }

        public async Task<bool> CreateUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteUserAsync(string username)
        {
            var user = await _context.Users.FindAsync(username);
            if (user == null)
            {
                return false;
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<bool> UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<User?> ValidateCredentialsAsync(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                // User doesn't exist
                return null;
            }

            // Use BCrypt Verify method to check if the password matches the stored hash
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);

            if (isPasswordValid)
            {
                return user; // Password is correct, return the user object
            }

            return null; // Password is incorrect, return null
        }
    }
}

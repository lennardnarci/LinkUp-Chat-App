using LinkUp_Chat_App.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace LinkUp_Chat_App.Server.Data
{
    public class UsersContext : DbContext
    {
        public UsersContext(DbContextOptions<UsersContext> options) : base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Message> Messages { get; set; }
    }
}

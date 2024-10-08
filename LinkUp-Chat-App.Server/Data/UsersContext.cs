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
        public DbSet<ChatRoom> ChatRooms { get; set; }
        public DbSet<UserChatRoom> UserChatRooms { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the many-to-many relationship between User and ChatRoom
            modelBuilder.Entity<UserChatRoom>()
                .HasKey(uc => new { uc.UserId, uc.ChatRoomId }); // Composite primary key

            modelBuilder.Entity<UserChatRoom>()
                .HasOne(uc => uc.User)
                .WithMany(u => u.UserChatRooms)
                .HasForeignKey(uc => uc.UserId);

            modelBuilder.Entity<UserChatRoom>()
                .HasOne(uc => uc.ChatRoom)
                .WithMany(cr => cr.UserChatRooms)
                .HasForeignKey(uc => uc.ChatRoomId);
        }
    }
}

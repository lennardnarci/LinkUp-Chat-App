using System.ComponentModel.DataAnnotations;

namespace LinkUp_Chat_App.Server.Models
{
    public class User
    {
        public Guid Id { get; set; }
        [Required(ErrorMessage = "Email is required.")]
        [MaxLength(50, ErrorMessage = "Email cannot exceed 50 characters.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string Email { get; set; } = string.Empty;
        [Required(ErrorMessage = "Username is required.")]
        [MaxLength(20, ErrorMessage = "Username cannot exceed 20 characters.")]
        [MinLength(3, ErrorMessage = "Username must be at least 3 characters long.")]
        public string Username { get; set; } = string.Empty;
        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        public List<UserChatRoom> UserChatRooms { get; set; } = new List<UserChatRoom>();

    }
}

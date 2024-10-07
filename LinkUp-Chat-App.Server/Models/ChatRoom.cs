using System.ComponentModel.DataAnnotations;

namespace LinkUp_Chat_App.Server.Models
{
    public class ChatRoom
    {
        [Key]
        public Guid Id { get; set; } = new Guid();
        [Required]
        public string Name { get; set; } = string.Empty;
        public List<UserChatRoom> UserChatRooms { get; set; } = new List<UserChatRoom>();
    }

}

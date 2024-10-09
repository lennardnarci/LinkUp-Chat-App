using System.ComponentModel.DataAnnotations;

namespace LinkUp_Chat_App.Server.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public DateTime Date { get; set; } = DateTime.Now;
        [Required]
        public User User { get; set; }
        [Required]
        public string MessageText { get; set; }
        public ChatRoom ChatRoom { get; set; }
    }
}

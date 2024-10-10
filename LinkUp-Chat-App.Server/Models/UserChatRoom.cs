namespace LinkUp_Chat_App.Server.Models
{
    //Många till många koppling i databasen. Kopplar användare till chatrum.
    public class UserChatRoom
    {
        public Guid UserId { get; set; }
        public User User { get; set; }

        public Guid ChatRoomId { get; set; }
        public ChatRoom ChatRoom { get; set; }
    }
}

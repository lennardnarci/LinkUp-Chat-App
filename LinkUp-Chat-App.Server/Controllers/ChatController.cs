using LinkUp_Chat_App.Server.Data.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LinkUp_Chat_App.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IChatRepo _chatRepo;
        private readonly IUserRepo _userRepo;
        public ChatController(IChatRepo chatRepo, IUserRepo userRepo)
        {
            _chatRepo = chatRepo;
            _userRepo = userRepo;
        }

        // POST: api/chat/rooms/join
        //[HttpPost("rooms/join")]
        //public async Task<IActionResult> JoinRoom([FromBody] string username, [FromBody] Guid roomId)
        //{
        //    // Validate request
        //    if (string.IsNullOrEmpty(username) || roomId == Guid.Empty)
        //    {
        //        return BadRequest("Invalid room or user information.");
        //    }

        //    // Get the user and room
        //    var user = await _userRepo.CheckIfUserExistAsync(username);
        //    if (!user)
        //    {
        //        return NotFound("User not found.");
        //    }

        //    var room = await _chatRepo.GetChatRoomByIdAsync(roomId);
        //    if (room == null)
        //    {
        //        return NotFound("Room not found.");
        //    }

        //    // Add the user to the room if not already added
        //    if (!room.UserChatRooms.Any(ucr => ucr.UserId == user.Id))
        //    {
        //        await _chatRepo.AddUserToRoomAsync(user.Id, room.Id);
        //    }

        //    return Ok("User added to the room.");
        //}
    }
}

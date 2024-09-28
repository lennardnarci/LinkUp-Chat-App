using LinkUp_Chat_App.Server.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace LinkUp_Chat_App.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatsController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatsController(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }

    }
}

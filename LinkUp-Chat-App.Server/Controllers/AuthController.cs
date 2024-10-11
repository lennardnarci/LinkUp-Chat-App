using LinkUp_Chat_App.Server.Data;
using LinkUp_Chat_App.Server.Data.Interfaces;
using LinkUp_Chat_App.Server.Data.Repos;
using LinkUp_Chat_App.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LinkUp_Chat_App.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepo _userRepo;
        private readonly IChatRepo _chatRepo;
        private readonly IConfiguration _configuration;

        public AuthController(IUserRepo userRepo, IChatRepo chatRepo, IConfiguration configuration)
        {
            _userRepo = userRepo;
            _chatRepo = chatRepo;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Credentials credentials)
        {
            //Check if credentials received are null or empty
            if (credentials == null || string.IsNullOrEmpty(credentials.Username) || string.IsNullOrEmpty(credentials.Password))
            {
                return BadRequest(new { message = "Username or password cannot be empty." });
            }

            //Use repo to check if credentials match
            User? existingUser = await _userRepo.ValidateCredentialsAsync(credentials.Username, credentials.Password);

            //Validate user credentials
            if (existingUser == null)
            {
                return Unauthorized(new { message = "Invalid username or password." });
            }

            var tokenHandler = new JwtSecurityTokenHandler();

            // JWT Secret Key
            var key = Encoding.ASCII.GetBytes(_configuration["JWT:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
            {
                //Add user id and username to JWT
                new Claim(ClaimTypes.NameIdentifier, existingUser.Id.ToString()),
                new Claim(ClaimTypes.Name, credentials.Username)
            }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { token = tokenString });
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] Credentials credentials)
        {
            //Check if input is valid
            if (!ModelState.IsValid || credentials.Email.IsNullOrEmpty())
            {
                return BadRequest(new { message = "Fields cannot be empty" });
            }

            //Check if user exists
            if (await _userRepo.CheckIfUserExistAsync(credentials.Username))
            {
                return Conflict(new { message = "A user with this username already exist." });
            }

            User user = new User();
            user.Email = credentials.Email;
            user.Username = credentials.Username;
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(credentials.Password);


            try
            {
                await _userRepo.CreateUserAsync(user);

                //Adds the user to the default public room
                var defaultRoom = await _chatRepo.GetRoomByNameAsync("Public Room");
                if (defaultRoom == null)
                {
                    await _chatRepo.CreateRoomAsync("Public Room");
                    var room = await _chatRepo.GetRoomByNameAsync("Public Room");
                    await _chatRepo.AddUserToRoomAsync(user.Id, room.Id);
                }
                else
                {
                    await _chatRepo.AddUserToRoomAsync(user.Id, defaultRoom.Id);
                }

                
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while creating the user.", error = ex.Message });
            }


            return Created();
        }
    }
}

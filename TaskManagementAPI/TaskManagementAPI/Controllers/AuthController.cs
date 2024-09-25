using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly TaskManagementContext _context;

        public AuthController(TaskManagementContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel model)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == model.Username && u.Password == model.Password);
            if (user == null) return Unauthorized();

            // Normally you would generate and return a JWT token here
            return Ok(new { Token = "dummy-jwt-token", User = user });
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel model)
        {
            var userExists = _context.Users.Any(u => u.Username == model.Username);
            if (userExists) return BadRequest("User already exists");

            var newUser = new User {
                Username = model.Username,
                Password = model.Password, 
                Email = model.Email
            };
            _context.Users.Add(newUser);
            _context.SaveChanges();

            return Ok(newUser);
        }
    }

    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class RegisterModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }

}

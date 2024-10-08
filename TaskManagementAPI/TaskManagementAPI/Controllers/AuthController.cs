using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly TaskManagementContext _context;
        private static Dictionary<string, OTPInfo> otpStore = new Dictionary<string, OTPInfo>(); // To store OTPs temporarily.
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

        [HttpPost("sendOTP")]
        public IActionResult SendOTP([FromBody] ForgotPasswordModel model)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == model.Email);
            if (user == null) return BadRequest("Email does not exist");

            var otp = new Random().Next(100000, 999999).ToString();
            var expiry = DateTime.Now.AddMinutes(2); // OTP valid for 2 minutes

            // Store OTP in-memory (can use DB instead)
            otpStore[model.Email] = new OTPInfo { OTP = otp, Expiry = expiry };

            // Send OTP to email (basic example using SMTP)
            SendEmail(model.Email, otp);

            return Ok("OTP sent to your email");
        }
        [HttpPost("verifyOTP")]
        public IActionResult VerifyOTP([FromBody] VerifyOtpModel model)
        {
            if (!otpStore.ContainsKey(model.Email)) return BadRequest("OTP expired or not found");

            var otpInfo = otpStore[model.Email];
            if (otpInfo.Expiry < DateTime.Now) return BadRequest("OTP expired");
            if (otpInfo.OTP != model.OTP) return BadRequest("Invalid OTP");

            return Ok("OTP verified");
        }
        [HttpPost("changePassword")]
        public IActionResult ChangePassword([FromBody] ChangePasswordModel model)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == model.Email);
            if (user == null) return BadRequest("User not found");
            user.Password = model.NewPassword; 
            _context.SaveChanges();

            return Ok("Password changed successfully");
        }

        private void SendEmail(string email, string otp)
        {
            var fromAddress = new MailAddress("vudinhtu2904@gmail.com", "Radley Task Manager");
            var toAddress = new MailAddress(email);
            const string fromPassword = "cohz vkfx mgoi mtyl"; 
            const string subject = "Your OTP Code";
            string body = $"Your OTP code is {otp}. It will expire in 2 minutes.";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            };
            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }
        }

        public class OTPInfo
        {
            public string OTP { get; set; }
            public DateTime Expiry { get; set; }
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
    public class ForgotPasswordModel
    {
        public string Email { get; set; }
    }

    public class VerifyOtpModel
    {
        public string Email { get; set; }
        public string OTP { get; set; }
    }

    public class ChangePasswordModel
    {
        public string Email { get; set; }
        public string NewPassword { get; set; }
    }
}

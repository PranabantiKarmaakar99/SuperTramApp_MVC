
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SuperTramApp.Data.Models.Repository;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using SuperTramApp.Data.Models.Domain;

namespace JWTAuth.WebApi.Controllers
{
    [Route("api/token")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        public IConfiguration _configuration;
        private readonly SuperTramAppContext context;

        public TokenController(IConfiguration config, SuperTramAppContext context)
        {
            _configuration = config;
            context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Post(User  _userData)
        {
            if (_userData != null && _userData.Email != null && _userData.PasswordHash==null)
            {
                var user = await GetUser(_userData.Email, _userData.PasswordHash);

                if (user != null)
                {
                    //create claims details based on the user information
                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserId", user.Id),
                       
                        new Claim("UserName", user.UserName),
                        new Claim("Email", user.Email)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:Issuer"],
                        _configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddMinutes(10),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }

        private async Task<User> GetUser(string email, string password)
        {
            return await context.Users.FirstOrDefaultAsync(u => u.Email == email && u.PasswordHash == password);
        }
    }
}

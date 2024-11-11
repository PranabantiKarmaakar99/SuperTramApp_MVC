using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SuperTramApp.Data.Models.Repository;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    public SuperTramAppContext context;

    public AuthController(IConfiguration configuration)
    {
        _configuration = configuration;
        context = new SuperTramAppContext();
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] UserLoginModel userLogin)
    {
        // Validate the user credentials (this is just an example, validate against your user store)
      
        if (userLogin.Username == "Username" && userLogin.Password == "password")
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, userLogin.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return Ok(new
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }

        return Unauthorized();
    }
}
public class UserLoginModel
{
    [Required]
    [EmailAddress]
    public string Username { get; set; }

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }
}
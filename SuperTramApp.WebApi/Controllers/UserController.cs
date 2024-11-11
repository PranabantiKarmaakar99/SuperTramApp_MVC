using Microsoft.AspNetCore.Mvc;
using SuperTramApp.Services.IServices;
using SuperTramApp.Services.Services;
using SuperTramApp.Data.Models.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using SuperTramApp.Data.Models.Repository;
using Microsoft.EntityFrameworkCore;
//using System.Web.Http;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SuperTramApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {   IUserService userService;
        private readonly UserManager<User> _userManager;
        User user;
        SuperTramAppContext context;

        public UserController(UserManager<User> userManager) 
        {
            userService = new UserService();
          
            context = new SuperTramAppContext();
            user = new User();
            this._userManager = userManager;
        }

        [HttpGet("roles")]
        [Authorize]  // Ensure the user is authenticated
        public async Task<IActionResult> GetUserRoles()
        {
            var Name = User.Identity.Name;
            //var userId = User.Claims.FirstOrDefault(a=>a.Type=="String")!.Value;
            //ClaimsPrincipal currentUser = this.User;
            //var currentUserName = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;

            Console.WriteLine("Name: ", Name);

            //List<CartTicket> cart1 = JsonConvert.DeserializeObject<List<CartTicket>>("cart");
            User user = context.Users.FirstOrDefault(o => o.Email == Name);

            if (user == null)
            {
                return NotFound("User not found");
            }

            // Get the user's roles
            var roles = await _userManager.GetRolesAsync(user);

            return Ok(roles);
        }
        // GET: api/<User>

        [HttpGet("GetUser")]

        [Authorize(Roles = "Admin")]
       
        public ActionResult GetUsers()
        {
            List<User> users = userService.GetUsers();
            return Ok(users);


        }

        // GET api/<User>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<User>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<User>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<User>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

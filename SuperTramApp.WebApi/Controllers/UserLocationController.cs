using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SuperTramApp.Services.IServices;
using SuperTramApp.Data.Models.Repository;
using SuperTramApp.Data.Models.Domain;

namespace SuperTramApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLocationController : ControllerBase
    {
        private readonly SuperTramAppContext _context;

        public UserLocationController(SuperTramAppContext context)
        {
            _context = context;
        }

        [HttpPut("user-location")]
        public async Task<IActionResult> SaveLocation([FromBody] UserLocation location)
        {
            if (location == null)
            {
                return BadRequest("Location data is null.");
            }

            var existingLocation = await _context.UserLocation.FirstOrDefaultAsync(l => l.Id == 1);

            if (existingLocation != null)
            {
                existingLocation.Latitude = location.Latitude;
                existingLocation.Longitude = location.Longitude;
                _context.UserLocation.Update(existingLocation);
            }
            else
            {
                location.Id = 1;
                _context.UserLocation.Add(location);
            }

            await _context.SaveChangesAsync();

            return Ok("Location data saved successfully.");
        }
    }
}

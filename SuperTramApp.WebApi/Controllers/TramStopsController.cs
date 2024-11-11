using Microsoft.AspNetCore.Mvc;
using SuperTramApp.Services.Services;
using SuperTramApp.Data.Models.Domain;
using SuperTramApp.Services.IServices;

namespace SuperTramApp.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TramStopsController : ControllerBase
    {
        private readonly ITramStopsService _tramStopsService;

        public TramStopsController(ITramStopsService tramStopsService)
        {
            _tramStopsService = tramStopsService;
        }

        [HttpGet("all-tram-stop-names")]
        public async Task<ActionResult<List<string>>> GetAllTramStopNames()
        {
            var tramStopNames = await _tramStopsService.GetAllTramStopNames();
            return Ok(tramStopNames);
        }

        [HttpGet("reachable-termini")]
        public async Task<IActionResult> GetReachableTermini([FromQuery] string tramStopName)
        {
            if (string.IsNullOrEmpty(tramStopName))
            {
                return BadRequest("Tram stop name is required.");
            }

            var reachableTermini = await _tramStopsService.GetReachableTermini(tramStopName);
            return Ok(reachableTermini);
        }
    }
}
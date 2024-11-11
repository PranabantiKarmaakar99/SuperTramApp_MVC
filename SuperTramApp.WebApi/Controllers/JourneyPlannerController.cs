using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using SuperTramApp.Services.Services;
using SuperTramApp.Data.Models.Domain;

namespace SuperTramApp.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JourneyPlannerController : ControllerBase
    {
        private readonly JourneyPlanner _journeyPlanner;

        public JourneyPlannerController(JourneyPlanner journeyPlanner)
        {
            _journeyPlanner = journeyPlanner;
        }

        [HttpGet("direct-route")]
        public async Task<ActionResult<List<RouteDetails>>> GetDirectRoute([FromQuery] string startStop, [FromQuery] string endStop)
        {
            var result = await _journeyPlanner.GetDirectRoute(startStop, endStop);
            return Ok(result);
        }

        [HttpGet("find-transfer")]
        public async Task<ActionResult<string>> GetTransferStop([FromQuery] string startStop, [FromQuery] string endStop)
        {
            var result = await _journeyPlanner.GetTransferStop(startStop, endStop);
            return Ok(result);
        }

        [HttpGet("find-route")]
        public async Task<ActionResult<List<RouteDetails>>> FindRoute([FromQuery] string startStop, [FromQuery] string endStop)
        {
            var result = await _journeyPlanner.FindRoute(startStop, endStop);
            if (result == null || !result.Any())
            {
                return NotFound("No route found.");
            }
            return Ok(result);
        }      

    }
}

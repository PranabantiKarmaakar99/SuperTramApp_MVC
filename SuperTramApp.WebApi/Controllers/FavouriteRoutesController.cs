using Microsoft.AspNetCore.Mvc;
using SuperTramApp.Services.Services;
using SuperTramApp.Data.Models.Domain;

using System.Collections.Generic;
using System.Threading.Tasks;

namespace SuperTramApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouriteRoutesController : ControllerBase
    {
        private readonly FavouriteRoutesService _favouriteRoutesService;

        public FavouriteRoutesController(FavouriteRoutesService favouriteRoutesService)
        {
            _favouriteRoutesService = favouriteRoutesService;
        }

        [HttpPost("favourite-routes")]
        public async Task<ActionResult<FavouriteRoutes>> SaveFavouriteRoute([FromBody] FavouriteRoutes favouriteRoute)
        {
            var result = await _favouriteRoutesService.SaveFavouriteRoute(favouriteRoute);
            return CreatedAtAction(nameof(SaveFavouriteRoute), new { id = result.Id }, result);
        }

        [HttpGet("favourite-routes")]
        public async Task<ActionResult<List<FavouriteRoutes>>> GetFavouriteRoutes()
        {
            var result = await _favouriteRoutesService.GetFavouriteRoutes();
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFavouriteRoute(int id)
        {
            var success = await _favouriteRoutesService.DeleteFavouriteRoute(id);
            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
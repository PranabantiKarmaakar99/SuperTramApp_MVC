using Microsoft.AspNetCore.Mvc;
using SuperTramApp.Services.Services;
using SuperTramApp.Services.IServices;
using SuperTramApp.Data.Models.Domain;
using SuperTramApp.Data.Models.Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SuperTramApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService ticketService;
        SuperTramAppContext context;
        public TicketController()
        {
            ticketService = new TicketService();
            context = new SuperTramAppContext();

        }



        // GET: api/<TicketController>
        [HttpGet]
        public List<Ticket> Get()
        {
            return context.Tickets1.ToList();
        }

        // GET api/<TicketController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        
        

        

        [HttpPost("get-ticket-details")]
        public async Task<IActionResult> GetTicketDetails([FromBody] TicketRequest request)
        {
            var result = await ticketService.GetTicket(request.ticketType, request.TravellerType, request.Zone);
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
           
        }

        [HttpPost("get-pass-details")]
        public async Task<IActionResult> GetPassDetails([FromBody] TicketRequest2 request)
        {
            var result = await ticketService.GetPass(request.Duration ,request.TravellerType);
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);

        }

        // PUT api/<TicketController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TicketController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }


    public class TicketRequest
    {
        
        public string ticketType { get; set; }
        public string TravellerType { get; set; }
        public string Zone { get; set; }

    }

    public class TicketRequest2
    {

        public string Duration { get; set; }
        public string TravellerType { get; set; }
       

    }
}

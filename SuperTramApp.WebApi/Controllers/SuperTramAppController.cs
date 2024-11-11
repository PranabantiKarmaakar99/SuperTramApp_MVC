using Humanizer.Localisation;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SuperTramApp.Data.Models.Domain;
using SuperTramApp.Services.IServices;
using SuperTramApp.Services.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SuperTramApp.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class SuperTramAppController : ControllerBase
    {
        ITicketService ticketService;
        public IList<Ticket>  tickets;
        public IHttpContextAccessor httpContextAccessor;

      
        public SuperTramAppController()
        {
            
            ticketService = new TicketService();
            string tickets = JsonConvert.SerializeObject(ticketService.GetTicketList());
            httpContextAccessor = new HttpContextAccessor();
            httpContextAccessor.HttpContext.Session.SetString("tickets", tickets);


        }
       

    }
}

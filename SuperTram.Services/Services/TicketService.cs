using SuperTramApp.Data.DAO;
using SuperTramApp.Data.IDAO;
using SuperTramApp.Data.Models.Domain;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SuperTramApp.Services.IServices;

namespace SuperTramApp.Services.Services
{
    public class TicketService:ITicketService
    {   ITicketDAO ticketDAO;
        public TicketService() {
            ticketDAO = new TicketDAO();
        }
        public async Task<Ticket> GetTicket(string ticketType, string TravellerType, string Zone) {
            return await ticketDAO.GetTicket( ticketType, TravellerType, Zone);
        }
        public async Task<Ticket> GetPass(string Duration, string TravellerType)
        {
            return await ticketDAO.GetPass(Duration, TravellerType);
        }
        public IList<Ticket> GetTicketList() { 
        
            return ticketDAO.GetTickets();
        }

        public Ticket GetTicket(string ticketId)
        {
            return ticketDAO.GetTicket(ticketId);
        }
    }
}

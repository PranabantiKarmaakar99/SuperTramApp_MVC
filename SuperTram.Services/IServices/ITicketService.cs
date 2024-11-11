using SuperTramApp.Data.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuperTramApp.Services.IServices
{
    public interface ITicketService
    {
        Task<Ticket> GetTicket(string ticketType, string TravellerType, string Zone);

        IList<Ticket> GetTicketList();
         Ticket GetTicket(string ticketId);
        Task<Ticket> GetPass(string Duration, string TravellerType);
    }
}

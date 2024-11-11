using SuperTramApp.Data.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuperTramApp.Data.IDAO
{
   public interface ITicketDAO
    {
        Task<Ticket> GetTicket(string ticketType, string TravellerType, string Zone);
         IList<Ticket> GetTickets();
        Task<Ticket> GetPass(string Duration, string TravellerType);

         Ticket GetTicket(string ticketId);
    }

}

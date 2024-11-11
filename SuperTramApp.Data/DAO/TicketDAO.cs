using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SuperTramApp.Data.IDAO;
using SuperTramApp.Data.Models.Domain;
using SuperTramApp.Data.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuperTramApp.Data.DAO
{
    public class TicketDAO:ITicketDAO
    {
        SuperTramAppContext context;
        public TicketDAO() {
        
            context = new SuperTramAppContext();
        }



        public async Task<Ticket> GetTicket(string ticketType, string TravellerType, string Zone)
        {  
            Ticket ticket = await context.Tickets1
              
                .FirstOrDefaultAsync(t => t.TicketType.Name == ticketType && t.TravellerType.Title == TravellerType && t.Zone.Title == Zone );

           
            if (ticket == null)
            {
                return null;
            }

         

            return ticket;
        }

        public async Task<Ticket> GetPass(string Duration, string TravellerType)
        {
            Ticket ticket = await context.Tickets1

                .FirstOrDefaultAsync(t =>  t.TravellerType.Title == TravellerType && t.Duration.Title == Duration);


            if (ticket == null)
            {
                return null;
            }



            return ticket;
        }

        public IList<Ticket> GetTickets()
        {
            return context.Tickets1.ToList();

        }

        public Ticket GetTicket(string ticketId)
        {
            return context.Tickets1.FirstOrDefault(o=>o.Id==ticketId);
        }
    }

    

}


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuperTramApp.Data.Models.Domain
{
    public class Ticket
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public string Type { get; set; }
        public double Price { get; set; }
        public string Logo { get; set; }
        public string Image { get; set; }

        public Zone? Zone { get; set; } = new Zone();
        public TravellerType? TravellerType { get; set; } = new TravellerType();
        public Duration? Duration { get; set; } = new Duration();

        public  ICollection<OrderLine>? OrderLines = new List<OrderLine>();   


        public TicketType? TicketType { get; set; }

    }
}

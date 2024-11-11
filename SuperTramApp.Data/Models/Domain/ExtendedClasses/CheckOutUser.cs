using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuperTramApp.Data.Models.Domain.ExtendedClasses
{
   public class CheckOutUser
    {
        public User User { get; set; }

        public string DelAddress {get; set;}

        public ICollection<CartTicket> CartTickets = new List<CartTicket>();
    }
}

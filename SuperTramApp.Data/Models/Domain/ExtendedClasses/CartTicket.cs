using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuperTramApp.Data.Models.Domain.ExtendedClasses
{
    public class CartTicket
    {
        public Ticket Ticket { get; set; }

        public int Quantity { get; set; }
        

    }
}

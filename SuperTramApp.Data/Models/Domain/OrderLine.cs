using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuperTramApp.Data.Models.Domain
{
    public class OrderLine
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        public virtual Ticket Ticket { get; set; }
        public virtual Order order { get; set; }

        
    }
}

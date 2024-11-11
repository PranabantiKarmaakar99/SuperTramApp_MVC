using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuperTramApp.Data.Models.Domain
{
    public class Order
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public ICollection<OrderLine> OrderLines = new List<OrderLine>();
        public User User { get; set; }
        public DateTime Created { get; set; }
    }
}

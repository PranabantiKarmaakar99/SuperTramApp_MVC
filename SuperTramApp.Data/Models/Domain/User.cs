using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace SuperTramApp.Data.Models.Domain
{
    public class User:IdentityUser
    {
        public string Id { get; set; }
        public string Name { get; set; }
        
        public string BillAddress { get; set; }
        public double WalletMoney { get; set; }

        public ICollection<Order> Orders = new List<Order>();
    }
}

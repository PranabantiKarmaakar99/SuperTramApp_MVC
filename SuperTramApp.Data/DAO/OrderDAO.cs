using SuperTramApp.Data.IDAO;
using SuperTramApp.Data.Models.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SuperTramApp.Data.Models.Domain;

namespace SuperTramApp.Data.DAO
{
    public class OrderDAO:IOrderDAO
    {
        SuperTramAppContext context;
        public OrderDAO() { 
        
            context = new SuperTramAppContext();
        }

        public void AddOrder(Order order)
        {
            context.Orders.Add(order);
        }
        
    }
}

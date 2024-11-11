using Microsoft.EntityFrameworkCore;
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
    public class UserDAO:IUserDAO
    {
        SuperTramAppContext context;

        public UserDAO()
        {
            context = new SuperTramAppContext();
        }

        public List<User> GetUsers()
        {
            return context.Users.ToList();
        }
        public void AddOrder(Order order, string UserId)
        {
            User user = context.Users.FirstOrDefault(a => a.Id == UserId);

            if (user == null) {
                Console.WriteLine("User not found");
            }

            order.User = user;

            context.Orders.Add(order);
            context.SaveChanges();

        }
    }
}

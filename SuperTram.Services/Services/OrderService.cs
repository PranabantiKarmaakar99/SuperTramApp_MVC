using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SuperTramApp.Data.Models.Domain.ExtendedClasses;
using SuperTramApp.Data.Models.Domain;
using SuperTramApp.Services.IServices;
using SuperTramApp.Data.IDAO;
using SuperTramApp.Data.DAO;
using SuperTramApp.Data.Models.Repository;

namespace SuperTramApp.Services.Services
{
    public class OrderService: IOrderService
    {
        Random random;
        IOrderDAO orderDAO;
        IUserService userService;
        SuperTramAppContext context;
        public OrderService() {
        

            random = new Random();
            orderDAO = new OrderDAO();
            userService = new UserService();
            context = new SuperTramAppContext();
        
        }

        public void AddOrder(CheckOutUser checkOutUser)
        {

            //Write a 'Unit of Work' to:
            //Create OrderLine objects and add the objects
            var orderLines = new List<OrderLine>();
            foreach (var cartTicket in checkOutUser.CartTickets)
            {
                var orderLine = new OrderLine
                {
                    Id = random.Next(),
                    Quantity = cartTicket.Quantity,
                    Ticket= cartTicket.Ticket,

                };

                orderLines.Add(orderLine);

                ;

                // Step 2: Add each OrderLine object to the Music object
                cartTicket.Ticket.OrderLines.Add(orderLine);
            }

            Console.WriteLine(checkOutUser.CartTickets.ToList());


            // Step 3: Prepare Order object
            Order order = new Order
            {
                Id = random.Next().ToString(),
                Name = checkOutUser.User.UserName,
                OrderLines = orderLines,
                Created = DateTime.Now,

            };


            orderDAO.AddOrder(order);
            userService.AddOrder(order, checkOutUser.User.Id);
            Console.WriteLine("OrderName:", order.Name);
            // Step 4: Add Order object

            //Console.WriteLine(Orders);

            // Step 5: Add Order object to User object



            // Step 6: Commit all changes
            context.SaveChanges();
        }
    }
}

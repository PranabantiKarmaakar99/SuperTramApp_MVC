using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SuperTramApp.Data.DAO;
using SuperTramApp.Data.Models.Domain;
using SuperTramApp.Services.IServices;
using SuperTramApp.Data.IDAO;

namespace SuperTramApp.Services.Services
{
    public class UserService : IUserService
    {   
        IUserDAO userDAO;
    public UserService() {

            userDAO = new UserDAO(); }


    public void AddOrder(Order order, string UserId)
    {
        userDAO.AddOrder(order, UserId);

    }

        public List<User> GetUsers()
        {
            return userDAO.GetUsers();
        }
}
}

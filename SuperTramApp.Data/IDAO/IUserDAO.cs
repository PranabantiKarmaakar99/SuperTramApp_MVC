using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SuperTramApp.Data.Models.Domain;

namespace SuperTramApp.Data.IDAO
{
    public interface IUserDAO
    {
        void AddOrder(Order order, string UserId);
        List<User> GetUsers();
    }
}

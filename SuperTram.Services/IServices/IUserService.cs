using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SuperTramApp.Data.Models.Domain;

namespace SuperTramApp.Services.IServices
{
    public interface IUserService
    {
        void AddOrder(Order order,string Id);
        List<User> GetUsers();



    }
}

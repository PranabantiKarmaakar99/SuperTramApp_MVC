using SuperTramApp.Data.Models.Domain.ExtendedClasses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuperTramApp.Services.IServices
{
    public interface IOrderService
    {


        void AddOrder(CheckOutUser checkOutUser);
    }
}

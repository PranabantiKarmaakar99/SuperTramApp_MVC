using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SuperTramApp.Data.Models.Domain.ExtendedClasses;


namespace SuperTramApp.Services.IServices
{
    public interface ITramStopsService
    {




        Task<List<string>> GetAllTramStopNames();


        Task<List<ReachableTerminus>> GetReachableTermini(string tramStopName);



     
    }
}

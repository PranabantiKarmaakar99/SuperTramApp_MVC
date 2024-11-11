using SuperTramApp.Data.Models.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace SuperTramApp.Services.IServices
{
    public interface IFavouriteRoutesService
    {



        Task<List<FavouriteRoutes>> GetFavouriteRoutes();


         Task<FavouriteRoutes> SaveFavouriteRoute(FavouriteRoutes favouriteRoute);


        Task<bool> DeleteFavouriteRoute(int id);
    
    }
}
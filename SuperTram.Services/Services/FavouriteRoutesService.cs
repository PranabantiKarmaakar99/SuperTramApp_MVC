
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SuperTramApp.Data.Models.Domain;
using SuperTramApp.Data.Models.Repository;

using SuperTramApp.Services.IServices;

namespace SuperTramApp.Services.Services
{
    public class FavouriteRoutesService:IFavouriteRoutesService
    {
        private readonly SuperTramAppContext _context;

        public FavouriteRoutesService(SuperTramAppContext context)
        {
            _context = context;
        }

        public async Task<List<FavouriteRoutes>> GetFavouriteRoutes()
        {
            return await _context.FavouriteRoutes.ToListAsync();
        }

        public async Task<FavouriteRoutes> SaveFavouriteRoute(FavouriteRoutes favouriteRoute)
        {
            _context.FavouriteRoutes.Add(favouriteRoute);
            await _context.SaveChangesAsync();
            return favouriteRoute;
        }

        public async Task<bool> DeleteFavouriteRoute(int id)
        {
            var favouriteRoute = await _context.FavouriteRoutes.FindAsync(id);
            if (favouriteRoute == null)
            {
                return false;
            }

            _context.FavouriteRoutes.Remove(favouriteRoute);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
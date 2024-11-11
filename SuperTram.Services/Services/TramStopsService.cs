
using Microsoft.EntityFrameworkCore;

using SuperTramApp.Data.Models.Repository;
using SuperTramApp.Services.IServices;
using SuperTramApp.Data.Models.Domain.ExtendedClasses;

namespace SuperTramApp.Services.Services
{
    public class TramStopsService: ITramStopsService
    {
        private readonly SuperTramAppContext _context;

        public TramStopsService (SuperTramAppContext context)
        {
            _context = context;
        }

        public async Task<List<string>> GetAllTramStopNames()
        {
            return await _context.TramStops
                .Select(ts => ts.TramStopName)
                .ToListAsync();
        }

        public async Task<List<ReachableTerminus>> GetReachableTermini(string tramStopName)
        {
            return await _context.LineStops
                .Where(ls => ls.TramStop != null && ls.TramStop.TramStopName == tramStopName)
                .Select(ls => new ReachableTerminus { TramLineName = ls.TramLine.TramLineName, TramLineTerminus = ls.TramLine.TramLineTerminus })
                .Where(line => line.TramLineTerminus != tramStopName) // Excludes the tram stop itself if it is also a terminus
                .Distinct()
                .ToListAsync();
        }
    }

   
}

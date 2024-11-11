using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using SuperTramApp.Data.Models.Domain;


namespace SuperTramApp.Services.IServices
{
    public interface IJourneyPlannerService
    {


        Task<List<RouteDetails>> GetDirectRoute(string startStop, string endStop);





        Task<string> GetTransferStop(string startStop, string endStop);


        Task<List<RouteDetails>> FindRoute(string startStop, string endStop);


        List<RouteDetails> UpdateStopOrder(List<RouteDetails> route);
       
                
    }
}



namespace SuperTramApp.Data.Models.Domain 

{ 
    public class RouteDetails
    {
        public string TramLineName { get; set; }
        
        public string TramLineTerminus { get; set; }


        public string StopName { get; set; }

        public int StopOrder { get; set; }

        public decimal Latitude { get; set; }

        public decimal Longitude { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SuperTramApp.Data.Models.Domain
{
    [Table("LINE_STOPS")]
    public class LineStops
    {
        [Key]
        [Column("line_id")]
        public int LineId { get; set; }


        [Required]
        [Column("stop_id")]
        public int StopId { get; set; }

        [Required]
        [Column("stop_order")]
        public int StopOrder { get; set; }

        // Navigation properties
        public TramStops? TramStop { get; set; } // Each line stop has a tram stop, this links to the TramStops entity

        public TramLines? TramLine { get; set; } // Each line stop has a tram line, this links to the TramLines entity
    }
}

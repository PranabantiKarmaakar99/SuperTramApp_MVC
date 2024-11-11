using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SuperTramApp.Data.Models.Domain
{
    [Table("TRAM_STOPS")]
    public class TramStops
    {
        [Key]
        [Column("tram_stop_id")]
        public int TramStopId { get; set; }

        [Required]
        [Column("tram_stop_name")]
        [StringLength(50)]
        public string TramStopName { get; set; } = string.Empty; // Initialised to empty string to avoid null reference exceptions

        [Required]
        [Column("tram_stop_latitude")]
        public double TramStopLatitude { get; set; }

        [Required]
        [Column("tram_stop_longitude")]
        public double TramStopLongitude { get; set; }

        [Required]
        [Column("transfer_stop")]
        public bool TransferStop { get; set; }

        // Navigation property
        public ICollection<LineStops> LineStops { get; set; } // Each tram stop can be a part of multiple tram lines
    }
}

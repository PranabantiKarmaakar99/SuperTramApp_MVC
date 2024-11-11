using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace SuperTramApp.Data.Models.Domain
{
    [Table("TRAM_LINES")]
    public class TramLines
    {
        [Key]
        [Column("tram_line_id")]
        public int TramLineId { get; set; }

        [Required]
        [Column("tram_line_name")]
        [StringLength(50)]
        public string TramLineName { get; set; } = string.Empty; // Initialised to empty string to avoid null reference exceptions

        [Required]
        [Column("tram_line_terminus")]
        [StringLength(50)]
        public string TramLineTerminus { get; set; } = string.Empty;

        [Required]
        [Column("tram_line_terminus_id")]
        public int TramLineTerminusId { get; set; }

        // Navigation property
        public ICollection<LineStops> LineStops { get; set; } // Each tram line has multiple stops
    }
}

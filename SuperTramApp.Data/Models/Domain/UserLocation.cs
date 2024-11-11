using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SuperTramApp.Data.Models.Domain
{
    [Table("user_locations")]
    public class UserLocation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
        public int Id { get; set; }

        public decimal Latitude { get; set; }

        public decimal Longitude { get; set; }
    }
}

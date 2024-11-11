using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SuperTramApp.Data.Models.Domain
{
    [Table("favourite_routes")]
    public class FavouriteRoutes
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string StartStop { get; set; }

        public string EndStop { get; set; }
    }
}

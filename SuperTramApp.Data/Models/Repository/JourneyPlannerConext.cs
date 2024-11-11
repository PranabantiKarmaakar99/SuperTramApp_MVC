//using Microsoft.EntityFrameworkCore;

//using SuperTramApp.Data.Models.Domain;

//namespace SuperTramApp.Data.Models.Repository;
//{
//    public class JourneyPlanning : DbContext
//    {
//        public SuperTramAppContext(DbContextOptions<SuperTramAppContext> options) : base(options) { }

//        public DbSet<TramStops> TramStops { get; set; }
//        public DbSet<TramLines> TramLines { get; set; }
//        public DbSet<LineStops> LineStops { get; set; }

//        public DbSet<RouteDetails> RouteDetails { get; set; }

//        public DbSet<FavouriteRoutes> FavouriteRoutes { get; set; }

//        public DbSet<UserLocation> UserLocation { get; set; }

//        protected override void OnModelCreating(ModelBuilder modelBuilder)
//        {
//            modelBuilder.Entity<LineStops>()
//                .HasKey(ls => new { ls.LineId, ls.StopId });

//            modelBuilder.Entity<LineStops>()
//                .HasOne(ls => ls.TramStop)
//                .WithMany(ts => ts.LineStops)
//                .HasForeignKey(ls => ls.StopId);

//            modelBuilder.Entity<LineStops>()
//                .HasOne(ls => ls.TramLine)
//                .WithMany(tl => tl.LineStops)
//                .HasForeignKey(ls => ls.LineId);

//            modelBuilder.Entity<RouteDetails>()
//                .HasNoKey();

//            modelBuilder.Entity<RouteDetails>(entity =>
//            {
//                entity.Property(e => e.Latitude).HasColumnType("decimal(18, 6)");
//                entity.Property(e => e.Longitude).HasColumnType("decimal(18, 6)");
//            });
//        }
//    }
//}

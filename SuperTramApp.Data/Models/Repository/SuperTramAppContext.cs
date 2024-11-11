using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SuperTramApp.Data.Models.Domain;

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


namespace SuperTramApp.Data.Models.Repository
{
    
        public class SuperTramAppContext
            : IdentityDbContext
    {
        
        // Constructor with DbContextOptions
        public SuperTramAppContext(DbContextOptions<SuperTramAppContext> options)
            : base(options)
        {
        }

        // Parameterless constructor
        public SuperTramAppContext()
        {
        }

        //public SuperTramAppContext() { }

        public DbSet<Duration> Durations { get; set; }
        public DbSet<TicketType> Types { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Ticket> Tickets1 { get; set; }
        public DbSet<Zone> Zones { get; set; }
        public DbSet<TravellerType> TravellerTypes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderLine> OrderLines { get; set; }
        //public object Artist { get; internal set; }

        public DbSet<TramStops> TramStops { get; set; }
        public DbSet<TramLines> TramLines { get; set; }
        public DbSet<LineStops> LineStops { get; set; }

        public DbSet<RouteDetails> RouteDetails { get; set; }

        public DbSet<FavouriteRoutes> FavouriteRoutes { get; set; }

        public DbSet<UserLocation> UserLocation { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<LineStops>()
                .HasKey(ls => new { ls.LineId, ls.StopId });

            modelBuilder.Entity<LineStops>()
                .HasOne(ls => ls.TramStop)
                .WithMany(ts => ts.LineStops)
                .HasForeignKey(ls => ls.StopId);

            modelBuilder.Entity<LineStops>()
                .HasOne(ls => ls.TramLine)
                .WithMany(tl => tl.LineStops)
                .HasForeignKey(ls => ls.LineId);

            modelBuilder.Entity<RouteDetails>()
                .HasNoKey();

            modelBuilder.Entity<RouteDetails>(entity =>
            {
                entity.Property(e => e.Latitude).HasColumnType("decimal(18, 6)");
                entity.Property(e => e.Longitude).HasColumnType("decimal(18, 6)");
            });
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfiguration configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();

                var connectionString = configuration.GetConnectionString("SuperTramAppcontext");
                optionsBuilder.UseSqlServer(connectionString);
                base.OnConfiguring(optionsBuilder);

            }
        }
    }
}

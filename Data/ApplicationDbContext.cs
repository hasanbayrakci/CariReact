using Microsoft.EntityFrameworkCore;

namespace CariReact.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<CariReact.Models.Customer> Customer { get; set; } = default!;

    }
}

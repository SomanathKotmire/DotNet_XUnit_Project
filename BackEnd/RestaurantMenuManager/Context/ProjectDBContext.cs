using Microsoft.EntityFrameworkCore;
using RestaurantMenuManager.Models;

namespace RestaurantMenuManager.Context
{
    public class ProjectDBContext: DbContext
    {
        public ProjectDBContext(DbContextOptions<ProjectDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Menu> Menus { get; set; }
        public virtual DbSet<Dish> Dishes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Dish>()
                .HasOne(d => d.Menu)
                .WithMany(m => m.Dishes)
                .HasForeignKey(d => d.MenuId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

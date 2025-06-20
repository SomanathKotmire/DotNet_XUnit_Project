using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RestaurantMenuManager.Models
{
    public class Dish
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Title { get; set; }

        [ForeignKey("Menu")]
        public int MenuId { get; set; }

        [ForeignKey("MenuId")]
        public virtual Menu? Menu { get; set; } = null!;
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantMenuManager.Models
{
    public class Menu
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Title { get; set; }

        public DateTime CreatedOrModifiedDate { get; set; }

        public virtual ICollection<Dish>? Dishes { get; set; }
    }
}

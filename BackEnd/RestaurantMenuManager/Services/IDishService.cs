using RestaurantMenuManager.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RestaurantMenuManager.Services
{
    public interface IDishService
    {
        Task<List<Dish>> GetDishesAsync();
        Task<Dish> GetDishByIdAsync(int id);
        Task<Dish> AddDishAsync(Dish dish);
        Task<Dish> UpdateDishAsync(int id, Dish dish);
        Task<bool> DeleteDishAsync(int id);
    }
}

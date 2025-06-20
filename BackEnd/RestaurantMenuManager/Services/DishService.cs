using Microsoft.EntityFrameworkCore;
using RestaurantMenuManager.Context;
using RestaurantMenuManager.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantMenuManager.Services
{
    public class DishService: IDishService
    {

        private readonly ProjectDBContext _context;

        public DishService(ProjectDBContext context)
        {
            _context = context;
        }

        public async Task<List<Dish>> GetDishesAsync()
        {
            return await _context.Dishes.Include(m => m.Menu).ToListAsync();
        }

        public async Task<Dish> GetDishByIdAsync(int id)
        {
            return await _context.Dishes.Include(m => m.Menu).FirstOrDefaultAsync(d => d.Id == id);
        }

        public async Task<Dish> AddDishAsync(Dish dish)
        {
            await _context.Dishes.AddAsync(dish);
            await _context.SaveChangesAsync();
            return dish;
        }

        public async Task<Dish> UpdateDishAsync(int id, Dish dish)
        {
            _context.Dishes.Update(dish);
            await _context.SaveChangesAsync();
            return dish;
        }

        public async Task<bool> DeleteDishAsync(int id)
        {
            var dish = await _context.Dishes.FindAsync(id);
            if (dish == null)
            {
                return false;
            }
            else
            {
                _context.Dishes.Remove(dish);
                await _context.SaveChangesAsync();
                return true;
            }
        }
    }
}

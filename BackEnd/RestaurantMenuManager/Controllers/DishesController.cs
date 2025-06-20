using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantMenuManager.Context;
using RestaurantMenuManager.Models;
using RestaurantMenuManager.Services;

namespace RestaurantMenuManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DishesController : ControllerBase
    {
        private readonly IDishService _dishService;

        public DishesController(IDishService dishService)
        {
            _dishService = dishService;
        }

        [HttpGet]
        public async Task<IActionResult> GetDishes()
        {
            var dishes = await _dishService.GetDishesAsync();
            return Ok(dishes);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetDishById(int id)
        {
            var dish = await _dishService.GetDishByIdAsync(id);
            if (dish == null)
            {
                return NotFound();
            }
            return Ok(dish);
        }

        [HttpPost]
        public async Task<IActionResult> AddDish(Dish dish)
        {
            var addDish = await _dishService.AddDishAsync(dish);
            return Ok(addDish);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> EditDish(int id, Dish dish)
        {
            var updateDish = await _dishService.UpdateDishAsync(id, dish);
            return Ok(updateDish);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteDish(int id)
        {
            var deleteDish = await _dishService.DeleteDishAsync(id);
            if (!deleteDish) 
            { 
                return NotFound(); 
            }
            return Ok();
        }
    }
}

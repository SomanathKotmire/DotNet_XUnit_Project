using Microsoft.EntityFrameworkCore;
using RestaurantMenuManager.Context;
using RestaurantMenuManager.Models;
using RestaurantMenuManager.Services;
using System.Threading.Tasks;
using Xunit;
using System;

namespace RestaurantMenuManager.Tests.Services
{
    public class DishServiceTests
    {
        private ProjectDBContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<ProjectDBContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString()) 
                .Options;

            return new ProjectDBContext(options);
        }

        [Fact]
        public async Task AddDishAsync_Add_Dish()
        {
            using var context = GetDbContext();
            var service = new DishService(context);
            var dish = new Dish { Id = 1, Title = "Pasta", MenuId = 1 };

            // Act
            var result = await service.AddDishAsync(dish);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(1, result.Id);
            Assert.Equal(1, result.MenuId);
            Assert.Equal("Pasta", result.Title);
        }



        [Fact]
        public async Task GetDishesAsync_Return_All_Dishes()
        {
            //arrange
            using var context = GetDbContext();

            context.Menus.Add(new Menu { Id = 1, Title = "Fast Food" });
            context.Dishes.Add(new Dish { Id = 2, Title = "Pizza", MenuId = 1 });

            await context.SaveChangesAsync();

            var service = new DishService(context);

            // Act
            var dishes = await service.GetDishesAsync();

            // Assert
            Assert.Single(dishes);
            Assert.Equal("Pizza", dishes[0].Title);
            Assert.Equal(2, dishes[0].Id);
            Assert.Equal(1, dishes[0].MenuId);
            Assert.NotNull(dishes[0].Menu);
            Assert.Equal("Fast Food", dishes[0].Menu.Title);
        }


        [Fact]
        public async Task GetDishByIdAsync_Return_Correct_Dish()
        {
            //arrange
            using var context = GetDbContext();

            context.Menus.Add(new Menu { Id = 2, Title = "Lunch Menu" });
            var dish = new Dish { Id = 3, Title = "Burger", MenuId = 2 };
            context.Dishes.Add(dish);

            await context.SaveChangesAsync();

            var service = new DishService(context);

            // Act
            var result = await service.GetDishByIdAsync(dish.Id);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(3, result.Id);
            Assert.Equal(2, result.MenuId);
            Assert.Equal("Burger", result.Title);
            Assert.NotNull(result.Menu);
            Assert.Equal("Lunch Menu", result.Menu.Title);
        }


        [Fact]
        public async Task UpdateDishAsync_Update_Dish()
        {
            //arrange
            using var context = GetDbContext();
            var dish = new Dish { Id = 4, Title = "Soup", MenuId = 5 };
            context.Dishes.Add(dish);
            await context.SaveChangesAsync();
            var service = new DishService(context);

            // Act
            dish.MenuId = 6;
            dish.Title = "Tomato Soup";
            var updatedDish = await service.UpdateDishAsync(dish.Id, dish);

            // Assert
            Assert.Equal(4, updatedDish.Id);
            Assert.Equal(6, updatedDish.MenuId);
            Assert.Equal("Tomato Soup", updatedDish.Title);
        }

        [Fact]
        public async Task DeleteDishAsync_Remove_Dish()
        {
            //arrange
            using var context = GetDbContext();
            var dish = new Dish { Id = 5, Title = "Salad", MenuId = 7 };
            context.Dishes.Add(dish);
            await context.SaveChangesAsync();
            var service = new DishService(context);

            // Act
            var success = await service.DeleteDishAsync(dish.Id);

            // Assert
            Assert.True(success);
            Assert.Null(await context.Dishes.FindAsync(dish.Id));
        }
    }
}

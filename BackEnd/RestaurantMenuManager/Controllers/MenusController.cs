using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantMenuManager.Context;
using RestaurantMenuManager.Models;

namespace RestaurantMenuManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenusController : ControllerBase
    {
        private readonly ProjectDBContext dBContext;

        public MenusController(ProjectDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetMenus()
        {
            var menus = await this.dBContext.Menus.ToListAsync();
            return Ok(menus);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> MenusById(int id)
        {
            var menus = await this.dBContext.Menus.FindAsync(id);
            if (menus != null)
            {
                return Ok(menus);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> AddMenus([FromBody] Menu menu)
        {
            menu.CreatedOrModifiedDate = DateTime.Now;
            await this.dBContext.Menus.AddAsync(menu);
            await this.dBContext.SaveChangesAsync();
            return Ok(menu);
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> EditMenus(int id, Menu menu)
        {
            menu.CreatedOrModifiedDate = DateTime.Now;
            this.dBContext.Menus.Update(menu);
            await this.dBContext.SaveChangesAsync();
            return Ok(menu);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteMenus(int id)
        {
            var menu = await this.dBContext.Menus.FindAsync(id);
            if (menu != null)
            {
                this.dBContext.Menus.Remove(menu);
                await this.dBContext.SaveChangesAsync();
                return Ok(menu);
            }
            return NotFound();
        }

    }
}

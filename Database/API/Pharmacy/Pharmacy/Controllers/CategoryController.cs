using Microsoft.AspNetCore.Mvc;
using Pharmacy.Services;

namespace Pharmacy.Controllers
{
    [Route("api/category")]
    public class CategoryController : Controller
    {
        private CategoryService categoryService;
        
        public CategoryController(CategoryService _categoryService)
        {
           categoryService = _categoryService;
        }


        [Produces("application/json")]
        [HttpGet("findAlltruetop5")]
        public IActionResult FindAllTrueTop5()
        {
            try
            {
                return Ok(categoryService.findAlltruetop5()); 
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}

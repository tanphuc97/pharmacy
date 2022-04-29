using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;

namespace Pharmacy.Controllers
{
    [Route("api/admin/category")]
    public class CategoryAdminController : Controller
    {
        
        private CategoryAdminService categoryService;

        public CategoryAdminController(CategoryAdminService _categoryService)
        {
            categoryService = _categoryService;
        }

        [Produces("application/json")]
        [HttpGet("findall")]
        public IActionResult FindAll()
        {
            try
            {
                return Ok(categoryService.FindAll());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("find/{id}")]
        public IActionResult Find(int id)
        {
            try
            {
                return Ok(categoryService.Find(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("create")]
        public IActionResult Create([FromBody] Category category)
        {
            try
            {
                return Ok(new
                {
                    Result = categoryService.Create(category)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("update")]
        public IActionResult Update([FromBody] Category category)
        {
            try
            {
                var categoryInfo = categoryService.Find2(category.Id);
                categoryInfo.Name = category.Name;
                categoryInfo.Status = category.Status;
               

                return Ok(new
                {
                    Result = categoryService.Update(categoryInfo)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                return Ok(new
                {
                    Result = categoryService.Delete(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }


        [Produces("application/json")]
        [HttpGet("search/{keyword}")]
        public IActionResult Search(string keyword)
        {
            try
            {
                return Ok(categoryService.Search(keyword));
            }
            catch
            {
                return BadRequest();
            }
        }
        
    }
}

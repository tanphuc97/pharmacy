using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;
using System.Diagnostics;

namespace Pharmacy.Controllers
{
    [Route("api/admin/product")]
    public class ProductAdminController : Controller
    {
        
        private ProductAdminService productService;
        private ProductFileUploadAdminService productFileUploadService;

        public ProductAdminController(ProductAdminService _productService, ProductFileUploadAdminService _productFileUploadService)
        {
            productService = _productService;
            productFileUploadService = _productFileUploadService;
        }

        [Produces("application/json")]
        [HttpGet("findall")]
        public IActionResult FindAll()
        {
            try
            {
                return Ok(productService.FindAll());
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
                return Ok(new
                {
                    Product = productService.Find(id),
                    ProductImages = productFileUploadService.FindByProductId(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("find1stPhoto/{id}")]
        public IActionResult Find1stPhoto(int id)
        {
            try
            {
                return Ok(productFileUploadService.FindByProductId(id)[0].Url
                );
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("create")]
        public IActionResult Create([FromBody] Product product)
        {
            try
            {
                return Ok(new
                {
                    Result = productService.Create(product)
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
        public IActionResult Update([FromBody] Product product)
        {
            try
            {
                var productInfo = productService.Find2(product.Id);

                
                productInfo.Name = product.Name;
                productInfo.Description = product.Description;
                productInfo.Price = product.Price;
                productInfo.CategoryId = product.CategoryId;
                productInfo.Status = product.Status;

                return Ok(new
                {
                    Result = productService.Update((Product)productInfo)
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
                    Result = productService.Delete(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpDelete("deletephoto/{id}")]
        public IActionResult DeletePhoto(int id)
        {
            try
            {
                return Ok(new
                {
                    Result = productFileUploadService.Delete(id)
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
                return Ok(productService.Search(keyword));
            }
            catch
            {
                return BadRequest();
            }
        }

        

       
        [Produces("application/json")]
        [HttpPost("uploadphoto/{id}")]
        public IActionResult UploadPhoto(int id, [FromForm] IFormFile[] files)
        {
            try
            {                
                return Ok(productService.UploadPhoto(id, files));
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}

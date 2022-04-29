using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;
using System.Diagnostics;

namespace Pharmacy.Controllers
{
    [Route("api/product")]
    public class ProductController : Controller
    {
        private ProductService productService;
        private ClientService clientService;
        private InvoiceService invoiceService;
        private ProductFileUploadAdminService productFileUploadService;
        public ProductController(ProductService _productService, ClientService _clientService, InvoiceService _invoiceService, ProductFileUploadAdminService _productFileUploadService)
        {
            productFileUploadService = _productFileUploadService;
            productService = _productService;
            clientService = _clientService;
            invoiceService = _invoiceService;
        }

    


        [HttpGet("showproduct/{phonenumber}")]
        [Produces("application/json")]
        public IActionResult ShowProduct(string phonenumber)
        {
            try
            {
                return Ok(productService.showProduct(phonenumber)); 
            }
            catch
            {
                return BadRequest();
            }
        }


        [HttpGet("findall")]
        [Produces("application/json")]
        public IActionResult FindAll()
        {
            try
            {
                return Ok(productService.findAll());
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("findalltop8")]
        [Produces("application/json")]
        public IActionResult FindAlltop8()
        {
            try
            {
                return Ok(productService.findAlltop8());
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("findalltop3")]
        [Produces("application/json")]
        public IActionResult FindAlltop3()
        {
            try
            {
                return Ok(productService.findAlltop3());
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("findallPricetop8")]
        [Produces("application/json")]
        public IActionResult FindAllPricetop8()
        {
            try
            {
                return Ok(productService.findAllPricetop8());
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("findalltrue")]
        [Produces("application/json")]
        public IActionResult FindAlltrue()
        {
            try
            {
                return Ok(productService.findAlltrue());
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("findallfalse")]
        [Produces("application/json")]
        public IActionResult FindAllfalse()
        {
            try
            {
                return Ok(productService.findAllfalse());
            }
            catch
            {
                return BadRequest();
            }
        }


        [Produces("application/json")]
        [HttpGet("findid/{id}")]
        public IActionResult Find(int id)
        {
            try
            {
                return Ok(new
                {
                    Product = productService.findProById(id),
                    ProductImages = productFileUploadService.FindByProductId(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("search/{min}/{max}")]
        public IActionResult search(decimal min, decimal max)
        {
            try
            {


                return Ok(productService.searchValue(min, max));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("searchName/{name}")]
        public IActionResult searchName(string name)
        {
            try
            {


                return Ok(productService.searchName(name));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("searchCategory/{name}")]
        public IActionResult searchCategory(string name)
        {
            try
            {


                return Ok(productService.searchCategory(name));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("create")]
        public IActionResult create([FromBody] Product product)
        {

            try
            {

                return Ok(productService.create(product));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("update")]
        public IActionResult update([FromBody] Product product)
        {

            try
            {

                return Ok(productService.update(product));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpDelete("delete/{id}")]
        public IActionResult delete(int id)
        {
            try
            {
                return Ok(productService.delete(id));
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}

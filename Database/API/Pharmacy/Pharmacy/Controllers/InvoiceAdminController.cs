using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;

namespace Pharmacy.Controllers
{
    [Route("api/admin/invoice")]
    public class InvoiceAdminController : Controller
    {
        
        private InvoiceAdminService invoiceService;

        public InvoiceAdminController(InvoiceAdminService _invoiceService)
        {
            invoiceService = _invoiceService;
        }

        [Produces("application/json")]
        [HttpGet("findall")]
        public IActionResult FindAll()
        {
            try
            {
                return Ok(invoiceService.FindAll());
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
                return Ok(invoiceService.Find(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("create")]
        public IActionResult Create([FromBody] Invoice invoice)
        {
            try
            {
                return Ok(new
                {
                    Result = invoiceService.Create(invoice)
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
        public IActionResult Update([FromBody] Invoice invoice)
        {
            try
            {
                var invoiceInfo = invoiceService.Find(invoice.Id);
                
                invoiceInfo.ClientId = invoice.ClientId;
                invoiceInfo.Created = invoice.Created;
                

                return Ok(new
                {
                    Result = invoiceService.Update(invoiceInfo)
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
                    Result = invoiceService.Delete(id)
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
                return Ok(invoiceService.Search(keyword));
            }
            catch
            {
                return BadRequest();
            }
        }
        
    }
}

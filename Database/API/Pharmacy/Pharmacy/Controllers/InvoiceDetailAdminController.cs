using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;

namespace Pharmacy.Controllers
{
    [Route("api/admin/invoicedetail")]
    public class InvoiceDetailAdminController : Controller
    {
        
        private InvoiceDetailAdminService invoiceDetailService;
        

        public InvoiceDetailAdminController(InvoiceDetailAdminService _invoiceDetailService)
        {
            invoiceDetailService = _invoiceDetailService;
        }

        [Produces("application/json")]
        [HttpGet("findall")]
        public IActionResult FindAll()
        {
            try
            {
                return Ok(invoiceDetailService.FindAll());
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
                    InvoiceDetail = invoiceDetailService.Find(id),
                    Total = invoiceDetailService.Total(id)
                });
                    
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("create")]
        public IActionResult Create([FromBody] InvoiceDetail invoiceDetail)
        {
            try
            {
                return Ok(new
                {
                    Result = invoiceDetailService.Create(invoiceDetail)
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
        public IActionResult Update([FromBody] InvoiceDetail invoiceDetail)
        {
            try
            {
                var invoiceDetailInfo = invoiceDetailService.Find2(invoiceDetail.InvoiceId);
                
                invoiceDetailInfo.Quantity = invoiceDetail.Quantity;

                return Ok(new
                {
                    Result = invoiceDetailService.Update(invoiceDetailInfo)
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
                    Result = invoiceDetailService.Delete(id)
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
                return Ok(invoiceDetailService.Search(keyword));
            }
            catch
            {
                return BadRequest();
            }
        }
        
    }
}

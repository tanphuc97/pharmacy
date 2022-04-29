using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;

namespace Pharmacy.Controllers
{
    [Route("api/invoice")]
    public class InvoiceController : Controller
    {
        
        private InvoiceService invoiceService;

        public InvoiceController(InvoiceService _invoiceService)
        {
            invoiceService = _invoiceService;
        }

       
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("create")]
        public IActionResult Create([FromBody] Invoice invoice)
        {
            try
            {
                var result = invoiceService.create(invoice);
                
                return Ok(result);
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpPost("createdetail")]
        public IActionResult CreateDetail( [FromBody] InvoiceDetail invoiceDetail)
        {
            try
            {
                var result = invoiceService.createDetails(invoiceDetail);

                return Ok(result);
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("createnew/{clientId}")]
        public IActionResult CreateNew(int clientId)
        {
            try
            {
                var invoiceId = invoiceService.createNew(clientId);

                return Ok(invoiceId);
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("createinvoicedetail/{invoiceId}/{productId}")]
        public IActionResult CreateInvoiceDetail(int invoiceId,int productId)
        {
            try
            {
               

                return Ok(new
                {
                    Result = invoiceService.createInvoiceDetail(invoiceId, productId)
            });
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}

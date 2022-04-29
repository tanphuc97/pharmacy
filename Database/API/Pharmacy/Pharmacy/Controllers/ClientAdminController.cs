using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;

namespace Pharmacy.Controllers
{
    [Route("api/admin/client")]
    public class ClientAdminController : Controller
    {
        
        private ClientAdminService clientService;

        public ClientAdminController(ClientAdminService _clientService)
        {
            clientService = _clientService;
        }

        [Produces("application/json")]
        [HttpGet("findall")]
        public IActionResult FindAll()
        {
            try
            {
                return Ok(clientService.FindAll());
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
                return Ok(clientService.Find(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("create")]
        public IActionResult Create([FromBody] Client client)
        {
            try
            {
                return Ok(new
                {
                    Result = clientService.Create(client)
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
        public IActionResult Update([FromBody] Client client)
        {
            try
            {
                var clientInfo = clientService.Find2(client.Id);
                
                clientInfo.Name = client.Name;
                clientInfo.Address = client.Address;
                clientInfo.City = client.City;
                clientInfo.Country = client.Country;
                clientInfo.EmailAddress = client.EmailAddress;
                clientInfo.Phone = client.Phone;

                return Ok(new
                {
                    Result = clientService.Update(clientInfo)
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
                    Result = clientService.Delete(id)
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
                return Ok(clientService.Search(keyword));
            }
            catch
            {
                return BadRequest();
            }
        }
        
    }
}

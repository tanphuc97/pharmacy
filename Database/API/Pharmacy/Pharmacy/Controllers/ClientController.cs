using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;

namespace Pharmacy.Controllers
{
    [Route("api/client")]
    public class ClientController : Controller
    {
        public ClientService clientService;
        public ClientController(ClientService _clientService)
        {
            clientService = _clientService;
        }

        [Produces("application/json")]
        [HttpGet("find/{phonenumber}")]
        public IActionResult find(string phonenumber)
        {
            try
            {
                var client = clientService.findPhone(phonenumber);
                return Ok(new {
                    Id = client.Id,
                    Name = client.Name,
                    Address = client.Address,
                    City = client.City,
                    Country = client.Country,
                    Emailaddress = client.EmailAddress,
                    Phone = client.Phone

                    });
            }
            catch
            {
                return BadRequest();
            }
        }


        [Produces("application/json")]
        [HttpGet("findlastest")]
        public IActionResult FindLastest()
        {
            try
            {
                return Ok(clientService.findLastest());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpPost("create")]
        public IActionResult Create([FromBody] Client client)
        {
            try
            {
                return Ok(new
                {
                    Result = clientService.create(client)
                });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}

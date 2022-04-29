using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;

namespace Pharmacy.Controllers
{
    [Route("api/admin/role")]
    public class RoleAdminController : Controller
    {
        
        private RoleAdminService roleService;

        public RoleAdminController(RoleAdminService _roleService)
        {
            roleService = _roleService;
        }

        [Produces("application/json")]
        [HttpGet("findall")]
        public IActionResult FindAll()
        {
            try
            {
                return Ok(roleService.FindAll());
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
                return Ok(roleService.Find(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("create")]
        public IActionResult Create([FromBody] Role role)
        {
            try
            {
                return Ok(new
                {
                    Result = roleService.Create(role)
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
        public IActionResult Update([FromBody] Role role)
        {
            try
            {
                var roleInfo = roleService.Find2(role.Id);
                roleInfo.Name = role.Name;
                roleInfo.Status = role.Status;
               

                return Ok(new
                {
                    Result = roleService.Update(roleInfo)
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
                    Result = roleService.Delete(id)
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
                return Ok(roleService.Search(keyword));
            }
            catch
            {
                return BadRequest();
            }
        }
        
    }
}

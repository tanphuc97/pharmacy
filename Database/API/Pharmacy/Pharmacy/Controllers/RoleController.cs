using Microsoft.AspNetCore.Mvc;
using Pharmacy.Services;

namespace Pharmacy.Controllers
{
    [Route("api/role")]
    public class RoleController : Controller
    {
        private RoleService roleService;
        public RoleController(RoleService _roleService)
        {
            roleService = _roleService;
        }

        [Produces("application/json")]
        [HttpGet("findAll")]
        public IActionResult findAll()
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

       


    }
}

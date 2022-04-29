using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;
using System.Diagnostics;

namespace Pharmacy.Controllers
{
    [Route("api/admin/aboutus")]
    public class AboutUsAdminController : Controller
    {
        
        private AboutUsAdminService aboutUsAdminService;

        public AboutUsAdminController(AboutUsAdminService _aboutUsAdminService)
        {
            aboutUsAdminService = _aboutUsAdminService;
        }

        [Produces("application/json")]
        [HttpGet("find")]
        public IActionResult Find()
        {
            try
            {
                return Ok(aboutUsAdminService.Find());
            }
            catch
            {
                return BadRequest();
            }
        }

        

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("update")]
        public IActionResult Update([FromBody] AboutU content)
        {
            try
            {
                var newContent = new AboutU();
                newContent.Content = content.Content;
                newContent.Id = 1;

                return Ok(new
                {
                    Result = aboutUsAdminService.Update(newContent)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        
        
    }
}

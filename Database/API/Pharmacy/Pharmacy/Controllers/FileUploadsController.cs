using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;

namespace Pharmacy.Controllers
{
    [Route("api/fileuploads")]
    public class FileUploadsController : Controller
    {
        public static IWebHostEnvironment webHostEnvironment;
        private IHttpContextAccessor httpContextAccessor;
        public FileUploadsController(IWebHostEnvironment _webHostEnvironment, IHttpContextAccessor _httpContextAccessor)
        {
            webHostEnvironment = _webHostEnvironment;
            httpContextAccessor = _httpContextAccessor;
        }

        [HttpPost("upload")]
        [Produces("application/json")]
        public IActionResult Upload( IFormFile file) 
        {
            try
            {
                    var path = Path.Combine(webHostEnvironment.WebRootPath, "uploads", file.FileName);
                    using (var fileStream = new FileStream(path, FileMode.Create))
                    {
                    file.CopyTo(fileStream);
                    }
                // var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                return Ok();
             /*  return Ok(new
                    {
                        fileName = baseURL + "/uploads/" + file.FileName,
                        fileSize = file.Length
                    });
             */
               
            }
            catch (Exception ex)    
            {
                return BadRequest();
            }
        }
    }
}

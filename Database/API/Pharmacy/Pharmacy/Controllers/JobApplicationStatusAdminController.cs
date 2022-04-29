using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;

namespace Pharmacy.Controllers
{
    [Route("api/admin/jobapplicationstatus")]
    public class JobApplicationStatusAdminController : Controller
    {
        
        private JobApplicationStatusAdminService jobApplicationStatusService;

        public JobApplicationStatusAdminController(JobApplicationStatusAdminService _jobApplicationStatusService)
        {
            jobApplicationStatusService = _jobApplicationStatusService;
        }

        [Produces("application/json")]
        [HttpGet("findall")]
        public IActionResult FindAll()
        {
            try
            {
                return Ok(jobApplicationStatusService.FindAll());
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
                return Ok(jobApplicationStatusService.Find(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("create")]
        public IActionResult Create([FromBody] JobApplicationStatus jobApplicationStatus)
        {
            try
            {
                return Ok(new
                {
                    Result = jobApplicationStatusService.Create(jobApplicationStatus)
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
        public IActionResult Update([FromBody] JobApplicationStatus jobApplicationStatus)
        {
            try
            {
                var jobApplicationStatusInfo = jobApplicationStatusService.Find2(jobApplicationStatus.Id);
                
                jobApplicationStatusInfo.Name = jobApplicationStatus.Name;
                jobApplicationStatusInfo.Status = jobApplicationStatus.Status;

                return Ok(new
                {
                    Result = jobApplicationStatusService.Update(jobApplicationStatusInfo)
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
                    Result = jobApplicationStatusService.Delete(id)
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
                return Ok(jobApplicationStatusService.Search(keyword));
            }
            catch
            {
                return BadRequest();
            }
        }
        
    }
}

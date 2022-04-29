using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;

namespace Pharmacy.Controllers
{
    [Route("api/admin/job")]
    public class JobAdminController : Controller
    {
        
        private JobAdminService jobService;

        public JobAdminController(JobAdminService _jobService)
        {
            jobService = _jobService;
        }

        [Produces("application/json")]
        [HttpGet("findall")]
        public IActionResult FindAll()
        {
            try
            {
                return Ok(jobService.FindAll());
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
                return Ok(jobService.Find(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("create")]
        public IActionResult Create([FromBody] Job job)
        {
            try
            {
                return Ok(new
                {
                    Result = jobService.Create(job)
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
        public IActionResult Update([FromBody] Job job)
        {
            try
            {
                var jobInfo = jobService.Find2(job.Id);
                
                jobInfo.JobName = job.JobName;
                jobInfo.Description = job.Description;
                jobInfo.Location = job.Location;
                jobInfo.Salary = job.Salary;
                jobInfo.Status = job.Status;

                return Ok(new
                {
                    Result = jobService.Update(jobInfo)
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
                    Result = jobService.Delete(id)
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
                return Ok(jobService.Search(keyword));
            }
            catch
            {
                return BadRequest();
            }
        }
        
    }
}

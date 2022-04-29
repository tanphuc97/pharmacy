using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;


namespace Pharmacy.Controllers
{
    [Route("api/jobapplication")]
    public class JobApplicationController : Controller
    {
        
        private JobApplicationAdminService jobApplicationService;
        
        
        public JobApplicationController(JobApplicationAdminService _jobApplicationService)
        {
            jobApplicationService = _jobApplicationService;
            
        }

        [Produces("application/json")]
        [HttpGet("findall")]
        public IActionResult FindAll()
        {
            try
            {
                return Ok(jobApplicationService.FindAll());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("findbyjobid/{id}")]
        public IActionResult FindByJobId(int id)
        {
            try
            {
                return Ok(jobApplicationService.FindByJobId(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("findbycandidateid/{id}")]
        public IActionResult FindByCandidateId(int id)
        {
            try
            {
                return Ok(jobApplicationService.FindByCandidateId(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("find/{jobId}/{candiateId}")]
        public IActionResult Find(int jobId, int candiateId)
        {
            try
            {
                return Ok(jobApplicationService.Find(jobId, candiateId));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("create")]
        public IActionResult Create([FromBody] JobApplication jobApplication)
        {
            try
            {
                return Ok(new
                {
                    Result = jobApplicationService.Create(jobApplication)
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
        public IActionResult Update([FromBody] JobApplication jobApplication)
        {
            try
            {
                var jobApplicationInfo = jobApplicationService.Find2(jobApplication.JobId, jobApplication.CandidateId);
                
                jobApplicationInfo.DateInterview = jobApplication.DateInterview;
                jobApplicationInfo.StatusId = jobApplication.StatusId;

                return Ok(new
                {
                    Result = jobApplicationService.Update(jobApplicationInfo)
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
                    Result = jobApplicationService.Delete(id)
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
                return Ok(jobApplicationService.Search(keyword));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("send")]
        public IActionResult Send([FromBody] EmailForm emailForm)
        {
            try
            {
                return Ok (jobApplicationService.Send(emailForm));
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}

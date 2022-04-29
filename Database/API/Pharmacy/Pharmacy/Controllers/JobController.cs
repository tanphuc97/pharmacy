using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;
using System.Diagnostics;

namespace Pharmacy.Controllers
{
    [Route("api/Job")]
    public class JobController : Controller
    {
        public JobService jobService;
        public JobController(JobService _jobService)
        {
            jobService = _jobService;
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
                    result = jobService.Create(job)
                });
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("find/{id}")]
        public IActionResult Find(int id)
        {
            try
            {
                var Job = jobService.findId(id);
                return Ok(new{
                    Id = Job.Id,
                Description = Job.Description,
                JobName = Job.JobName,
                Salary = Job.Salary,
                Location = Job.Location,
                Status = Job.Status,
                Created = Job.Created
                });

            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return BadRequest();
            }
        }


        [Produces("application/json")]
        [HttpGet("findall")]
        public IActionResult FindAll()
        {
            try
            {
                return Ok(jobService.findAll());
             
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return BadRequest();
            }
        }


        [Produces("application/json")]
        [HttpGet("searchbykeyword/{keyword}")]
        public IActionResult SearchByKeyword(string keyword)
        {
            try
            {   
                var Jobs = jobService.searchByKeyword(keyword);
                // infos.Add(jobService.searchJob(jobName));
                
                return Ok(Jobs);

            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var job = jobService.findId(id);
                // infos.Add(jobService.searchJob(jobName));

                return Ok(new
                {
                    Result = jobService.delete(job)
                });

            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("update")]
        public IActionResult Update([FromBody]Job job)
        {
            try
            {
               
                // infos.Add(jobService.searchJob(jobName));

                return Ok(new{
                   Result= jobService.update(job)
                });

            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return BadRequest();
            }
        }

       

    }
}

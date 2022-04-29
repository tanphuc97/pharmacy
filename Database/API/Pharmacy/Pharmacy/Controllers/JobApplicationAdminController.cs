using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;
using System.Net;
using System.Net.Mail;

namespace Pharmacy.Controllers
{
    [Route("api/admin/jobapplication")]
    public class JobApplicationAdminController : Controller
    {
        
        private JobApplicationAdminService jobApplicationService;
        
        
        public JobApplicationAdminController(JobApplicationAdminService _jobApplicationService)
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


        public static void SendEmail(string email, string subject, string body)
        {
            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress("to.c2003l@gmail.com");
                mail.To.Add(email);
                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;
                using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtp.Credentials = new NetworkCredential("to.c2003l@gmail.com", "kahpslobpvwaaixe");
                    smtp.EnableSsl = true;
                    smtp.Send(mail);
                }
            }
        }

        [Produces("application/json")]
        [HttpGet("sendemail/{email}")]
        public IActionResult sendemail(string email)
        {
            try
            {
                var acc = jobApplicationService.FindEmail(email);
                string message = "Congratulations on your admission. Please contact us by phone number 0909.09.09.09";
                SendEmail(email, "successful application", message);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}

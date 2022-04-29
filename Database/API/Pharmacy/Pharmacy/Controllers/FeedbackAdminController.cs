
using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;

namespace Pharmacy.Controllers
{
    [Route("api/admin/feedback")]
    public class FeedbackAdminController : Controller
    {
        
        private FeedbackAdminService feedbackService;

        public FeedbackAdminController(FeedbackAdminService _feedbackService)
        {
            feedbackService = _feedbackService;
        }

        [Produces("application/json")]
        [HttpGet("findall")]
        public IActionResult FindAll()
        {
            try
            {
                return Ok(feedbackService.FindAll());
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
                return Ok(feedbackService.Find(id));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("create")]
        public IActionResult Create([FromBody] Feedback feedback)
        {
            try
            {
                return Ok(new
                {
                    Result = feedbackService.Create(feedback)
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
        public IActionResult Update([FromBody] Feedback feedback)
        {
            try
            {
                var feedbackInfo = feedbackService.Find2(feedback.Id);
                
                
                feedbackInfo.Content = feedback.Content;
                feedbackInfo.Status = feedback.Status;
                feedbackInfo.Title = feedback.Title;

                return Ok(new
                {
                    Result = feedbackService.Update(feedbackInfo)
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
                    Result = feedbackService.Delete(id)
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
                return Ok(feedbackService.Search(keyword));
            }
            catch
            {
                return BadRequest();
            }
        }
        
    }
}

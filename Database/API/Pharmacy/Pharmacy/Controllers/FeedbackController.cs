using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;
using System.Diagnostics;

namespace Pharmacy.Controllers
{
    [Route("api/feedback")]
    public class FeedbackController : Controller
    {
       
        private FeedbackService feedbackService;
        public FeedbackController(FeedbackService _feedbackService)
        {
            feedbackService = _feedbackService;
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
                    Result = feedbackService.create(feedback)
            });
            }
            catch (Exception ex)
            {
                return BadRequest(ex); 
            }
        }

        [Produces("application/json")]
        [HttpGet("findAll")]
        public IActionResult findAll()
        {
            try
            {
                return Ok(feedbackService.findAll());
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
                var feedback = feedbackService.find(id);
                return Ok(new
                {

                    result = feedbackService.delete(feedback)
                });
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
                var feedbacks = feedbackService.searchKeyword(keyword);
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("find/{id}")]
        public IActionResult find(int id)
        {
            try
            {
                var feedback = feedbackService.find(id);
                return Ok(feedback);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return BadRequest();
            }
        }
    }
}

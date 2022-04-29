using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;
using System.Diagnostics;

namespace Pharmacy.Controllers
{ 
    [Route("api/candidate")]
    public class CandidateController : Controller
    {       
        private CandidateService candidateService;
        public CandidateController(CandidateService _candidateService)
        {
            candidateService = _candidateService;
        }

        [Produces("application/json")]
        [HttpGet("findAll")]
        public IActionResult findAll()
        {
            try
            {
                return Ok(candidateService.FindAll());
            }
            catch
            {
                return BadRequest();
            }
        }

        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost("create")]
        public IActionResult Create([FromBody] Candidate candidate)
        {
            try
            {
                return Ok(new
                {
                    result = candidateService.Create(candidate)
                }); 
            }
            catch(Exception ex)
            {
                Debug.WriteLine(ex); 
                return BadRequest();
            }
        }

     


        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPut("update")]
        public IActionResult Update([FromBody] UpdateCandidate candidate)
         {
            try
            {
                var candidateinfo = candidateService.Find2(candidate.Id);
                candidateinfo.Fullname = candidate.Fullname;
                candidateinfo.Gender = candidate.Gender;
                candidateinfo.Address = candidate.Address;
                candidateinfo.Education = candidate.Education;
                candidateinfo.Dob = candidate.Dob;
                candidateinfo.Phone = candidate.Phone;
                candidateinfo.Status = candidate.Status;

                return Ok(new
                {
                    Result = candidateService.update(candidateinfo)
                });
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
                var candidate = candidateService.Find(id);
                return Ok(new
                {
                   
                    result = candidateService.Delete(candidate)
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
                var candidates = candidateService.SearchKeyword(keyword);
                return Ok(candidates);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("finduser/{accountid}")]
        public IActionResult SearchByKeyword(int accountid)
        {
            try
            {
                var candidates = candidateService.findUser(accountid);
                return Ok(candidates);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("findlastest")]
        public IActionResult FindLastestCandidate()
        {
            try
            {
                var candidate = candidateService.FindLastestCandi();
                return Ok(candidate);
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
                var candidate = candidateService.Find(id);
                return Ok(new
                {
                    Id = candidate.Id,
                    Fullname = candidate.Fullname,
                    Gender = candidate.Gender,
                    Dob = candidate.Dob,
                    Photo = candidate.Photo,
                    Resume = candidate.Resume,
                    JobInformationId = candidate.JobInformationId,
                    AccountId = candidate.AccountId,
                    Phone = candidate.Phone,
                    ApplyDate = candidate.ApplyDate,
                    InterviewDate = candidate.InterviewDate,
                    Address = candidate.Address,
                    Education = candidate.Education
                });
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpPost("uploadphoto/{id}")]
        public IActionResult UploadPhoto(int id, [FromForm] IFormFile[] file)
        {
            try
            {
                return Ok(candidateService.UploadPhoto(id, file));
            }
            catch
            {
                return BadRequest();
            }
        }


        [Produces("application/json")]
        [HttpPost("uploadcv/{id}")]
        public IActionResult UploadCV(int id, [FromForm] IFormFile[] files)
        {
            try
            {
                return Ok(candidateService.UploadCV(id, files));
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}

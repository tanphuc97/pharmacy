using Microsoft.AspNetCore.Mvc;
using Pharmacy.Models;
using Pharmacy.Services;
using System.Diagnostics;

namespace Pharmacy.Controllers
{
    [Route("api/admin/candidate")]
    public class CandidateAdminController : Controller
    {
        
        private CandidateAdminService candidateService;
        private CandidateFileUploadAdminService candidateFileUploadService;
        private IWebHostEnvironment webHostEnvironment;

        public CandidateAdminController(CandidateAdminService _candidateService, IWebHostEnvironment _webHostEnvironment, CandidateFileUploadAdminService _candidateFileUploadService)
        {
            candidateService = _candidateService;
            webHostEnvironment = _webHostEnvironment;
            candidateFileUploadService = _candidateFileUploadService;
        }

        [Produces("application/json")]
        [HttpGet("findall")]
        public IActionResult FindAll()
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

        [Produces("application/json")]
        [HttpGet("find/{id}")]
        public IActionResult Find(int id)
        {
            try
            {
                return Ok(new
                {
                    Candidate = candidateService.Find(id),
                    CandidateCV = candidateFileUploadService.FindCVByCandidateId(id),
                    CandidatePhoto = candidateFileUploadService.FindPhotoByCandidateId(id)
                });
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
                    Result = candidateService.Create(candidate)
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
        public IActionResult Update([FromBody] Candidate candidate)
        {
            try
            {
                var candidateInfo = candidateService.Find2(candidate.Id);
                
                candidateInfo.Fullname = candidate.Fullname;
                candidateInfo.Gender = candidate.Gender;
                candidateInfo.Dob = candidate.Dob;
                candidateInfo.Address = candidate.Address;
                candidateInfo.Education = candidate.Education;
                candidateInfo.Phone = candidate.Phone;
                candidateInfo.Status = candidate.Status;

                return Ok(new
                {
                    Result = candidateService.Update(candidateInfo)
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
                    Result = candidateService.Delete(id)
                });
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpDelete("deletefile/{id}")]
        public IActionResult DeleteFile(int fileId)
        {
            try
            {
                return Ok(new
                {
                    Result = candidateService.DeleteFile(fileId)
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
                return Ok(candidateService.Search(keyword));
            }
            catch
            {
                return BadRequest();
            }
        }

        
        [Produces("application/json")]
        [HttpPost("uploadphoto/{id}")]
        public IActionResult UploadPhoto(int id, [FromForm] IFormFile[] files)
        {
            try
            {
                return Ok(candidateService.UploadPhoto(id, files));
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

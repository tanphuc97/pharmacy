using Pharmacy.Models;
using System.Diagnostics;

namespace Pharmacy.Services
{
    public class CandidateServiceImpl : CandidateService
    {
        private DatabaseContext db;
       
        private IWebHostEnvironment webHostEnvironment;
        private IHttpContextAccessor httpContextAccessor;
        private CandidateFileUploadAdminService fileUploadService;
        public CandidateServiceImpl(DatabaseContext _db, IWebHostEnvironment _webHostEnvironment, IHttpContextAccessor _httpContextAccessor, CandidateFileUploadAdminService _fileUploadService)
        {
            db = _db;
            webHostEnvironment = _webHostEnvironment;
            httpContextAccessor = _httpContextAccessor;
            fileUploadService = _fileUploadService;

        }

        public int Create(Candidate candidate)
        {
            db.Candidates.Add(candidate);
            db.SaveChanges();
            return candidate.Id;
        }

        public bool Delete(Candidate candidate)
        {
            db.Candidates.Remove(candidate);
            return db.SaveChanges() > 0;
        }
        public dynamic Find(int id)
        {
            var p = db.Candidates.Find(id);
            return new
            {
                Id = p.Id,
                Fullname = p.Fullname,
                Gender = p.Gender,
                Dob = p.Dob,
                AccountId = p.AccountId,
                Phone = p.Phone,
                Address = p.Address,
                Education = p.Education
            };
        }

        public bool update(Candidate candidate)
        {
            try
            {
                db.Entry(candidate).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic findUser(int accountId)
        {
            try
            {
                var p = db.Candidates.FirstOrDefault(p => p.AccountId == accountId);
                if ( p!= null){
                    return new
                    {
                        Id = p.Id,
                        Fullname = p.Fullname,
                        Gender = p.Gender,
                        Dob = p.Dob,
                        AccountId = p.AccountId,
                        Phone = p.Phone,
                        Address = p.Address,
                        Education = p.Education
                    };
                }
                else
                {
                    return null;
                }
               
             
            }
            catch(Exception ex)
            {
                return null;
            }
           
        }
        public dynamic FindAll()
        {
            return db.Candidates.Select(p => new
            {
                Id = p.Id,
                Fullname = p.Fullname,
                Gender = p.Gender,
                Dob = p.Dob,
                AccountId = p.AccountId,
                Phone = p.Phone,
                Address = p.Address,
                Education = p.Education

            }).ToList();
        }

        public dynamic FindLastestCandi()
        {
          return  db.Candidates.OrderByDescending(p => p.Id).Take(1).Select(p => new
          {
              Id = p.Id,
              Fullname = p.Fullname,
              Gender = p.Gender,
              Dob = p.Dob,

              AccountId = p.AccountId,
              Phone = p.Phone,

              Address = p.Address,
              Education = p.Education

          });
        }

        public dynamic SearchKeyword(string keyword)
        {
           return db.Candidates.Where(p => p.Fullname.ToLower().Contains(keyword.ToLower()) || p.Education.ToLower().Contains(keyword.ToLower()) || p.Address.ToLower().Contains(keyword.ToLower()) || p.Phone.ToLower().Contains(keyword.ToLower())).Select(p => new
            {
                Id = p.Id,
                Fullname = p.Fullname,
                Gender = p.Gender,
                Dob = p.Dob,

                AccountId = p.AccountId,
                Phone = p.Phone,
      
                Address = p.Address,
                Education = p.Education

            });
        }

        public dynamic Find2(int id)
        {
            return db.Candidates.SingleOrDefault(c => c.Id.Equals(id));
        }

        public dynamic UploadCV(int id, IFormFile[] files)
        {
            var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

            foreach (var file in files)
            {
                var path = Path.Combine(webHostEnvironment.WebRootPath, "resumes", file.FileName);
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }
                db.CandidateFileUploads.Add(new CandidateFileUpload
                {
                    CandidateId = id,
                    Url = baseURL + "/resumes/" + file.FileName,
                    Length = (int)file.Length,
                    Name = file.FileName,
                    Category = "CV"
                });
            }
            db.SaveChanges();
            return true;
        }


        public dynamic UploadPhoto(int id, IFormFile[] files)
        {
            var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;

            foreach (var file in files)
            {
                var path = Path.Combine(webHostEnvironment.WebRootPath, "images", file.FileName);
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }
                db.CandidateFileUploads.Add(new CandidateFileUpload
                {
                    CandidateId = id,
                    Url = baseURL + "/images/" + file.FileName,
                    Length = (int)file.Length,
                    Name = file.FileName,
                    Category = "Photo"
                });
            }
            db.SaveChanges();
            return true;
        }

    }
}

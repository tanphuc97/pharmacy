using Pharmacy.Models;

namespace Pharmacy.Services
{
    public class CandidateAdminServiceImpl : CandidateAdminService
    {

        private DatabaseContext db;
        private IWebHostEnvironment webHostEnvironment;
        private IHttpContextAccessor httpContextAccessor;
        private CandidateFileUploadAdminService candidateFileUploadService;

        public CandidateAdminServiceImpl(DatabaseContext _db, IWebHostEnvironment _webHostEnvironment, IHttpContextAccessor _httpContextAccessor, CandidateFileUploadAdminService candidateFileUploadService)
        {
            db = _db;
            webHostEnvironment = _webHostEnvironment;
            httpContextAccessor = _httpContextAccessor;
            candidateFileUploadService = candidateFileUploadService;
        }

        public bool Create(Candidate candidate)
        {
            try
            {
                db.Candidates.Add(candidate);
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool Delete(int id)
        {
            try
            {
                var candidateFiles = candidateFileUploadService.FindByCandidateId(id);
                foreach (var candidateFile in candidateFiles)
                {
                    candidateFileUploadService.Delete(candidateFile.FileId);
                }
                db.Candidates.Remove(db.Candidates.Find(id));
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic Find(int id)
        {
            return db.Candidates.Where(p => p.Id == id).Select(p => new
            {
                Id = p.Id,
                Fullname = p.Fullname,
                Gender = p.Gender,
                Dob = p.Dob,
                Address = p.Address,
                Education = p.Education,
                AccountId = p.AccountId,
                Account = p.Account.Username,
                Phone = p.Phone,
                Status = p.Status
            }).SingleOrDefault();
        }

        public Candidate Find2(int id)
        {
            return db.Candidates.SingleOrDefault(p => p.Id == id);
        }

        public dynamic FindAll()
        {
            return db.Candidates.Select(p => new
            {
                Id = p.Id,
                Fullname = p.Fullname,
                Gender = p.Gender,
                Dob = p.Dob,
                Address = p.Address,
                Education = p.Education,
                AccountId = p.AccountId,
                Account = p.Account.Username,
                Phone = p.Phone,
                Status = p.Status
            }).ToList();
        }

        public dynamic Search(string keyword)
        {
            return db.Candidates.Where(p => p.Fullname.Contains(keyword)).Select(p => new
            {
                Id = p.Id,
                Fullname = p.Fullname,
                Gender = p.Gender,
                Dob = p.Dob,
                Address = p.Address,
                Education = p.Education,
                AccountId = p.AccountId,
                Account = p.Account.Username,
                Phone = p.Phone,
            }).ToList();
        }

        public bool Update(Candidate candidate)
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


        
        public dynamic UploadPhoto(IFormFile file)
        {
            var path = Path.Combine(webHostEnvironment.WebRootPath, "images", file.FileName);
            using (var fileStream = new FileStream(path, FileMode.Create))
            {
                file.CopyTo(fileStream);
            }
            var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
            return (new
            {
                fileURL = baseURL + "/uploads/" + file.FileName,
                fileSize = file.Length,
                fileName = file.FileName,
            });
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
                    Category =  "CV"
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

        public bool DeleteFile(int fileId)
        {
            try
            {
                return candidateFileUploadService.Delete(fileId);
            }
            catch
            {
                return false;
            }
        }

    }
}

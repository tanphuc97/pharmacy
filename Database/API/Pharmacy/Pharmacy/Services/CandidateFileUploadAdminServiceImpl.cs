using Pharmacy.Models;

namespace Pharmacy.Services
{
    public class CandidateFileUploadAdminServiceImpl : CandidateFileUploadAdminService
    {

        private DatabaseContext db;

        public CandidateFileUploadAdminServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }
          

        public dynamic FindByFileId(int fileId)
        {
            return db.CandidateFileUploads.Where(p => p.FileId == fileId).Select(p => new 
            {
                FileId = p.FileId,
                Name = p.Name,
                Length = p.Length,
                Url = p.Url,
                Category = p.Category,
                CandidateId = p.CandidateId
            }).SingleOrDefault();
        }

        public dynamic FindByCandidateId(int fileId)
        {
            return db.CandidateFileUploads.Where(p => p.CandidateId == fileId).Select(p => new
            {
                FileId = p.FileId,
                Name = p.Name,
                Length = p.Length,
                Url = p.Url,
                Category = p.Category,
                CandidateId = p.CandidateId
            }).SingleOrDefault();
        }

        public bool Delete(int fileId)
        {
            try
            {
                db.CandidateFileUploads.Remove(db.CandidateFileUploads.Find(fileId));
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic FindCVByCandidateId(int candidateId)
        {
            return db.CandidateFileUploads.Where(p => p.CandidateId == candidateId && p.Category.Contains("CV")).Select(p => new 
            {
                FileId = p.FileId,
                Name = p.Name,
                Length = p.Length,
                Url = p.Url,
                Category = p.Category,
                CandidateId = p.CandidateId
            }).ToList();
        }

        public dynamic FindPhotoByCandidateId(int candidateId)
        {
            return db.CandidateFileUploads.Where(p => p.CandidateId == candidateId && p.Category.Contains("Photo")).Select(p => new
            {
                FileId = p.FileId,
                Name = p.Name,
                Length = p.Length,
                Url = p.Url,
                Category = p.Category,
                CandidateId = p.CandidateId
            }).ToList();
        }


    }
}

using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface CandidateAdminService
    {

        public dynamic FindAll();
        public dynamic Find(int id);
        public Candidate Find2(int id);
        public bool Create(Candidate candidate);
        public bool Update(Candidate candidate);
        public bool Delete(int id);
        public bool DeleteFile(int fileId);

        public dynamic Search(string keyword);

        public dynamic UploadPhoto(int id, IFormFile[] files);

        public dynamic UploadCV(int id, IFormFile[] files);


    }
}

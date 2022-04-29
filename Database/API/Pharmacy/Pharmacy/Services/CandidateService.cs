using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface CandidateService
    {
        public dynamic FindAll();
        public int Create(Candidate candidate);
        public bool Delete(Candidate candidate);
        public dynamic Find(int id);
        public dynamic Find2(int id);
        public dynamic SearchKeyword(string keyword);
        public dynamic findUser(int accountId);
        public bool update(Candidate candidate);
        public dynamic FindLastestCandi();
        public dynamic UploadPhoto(int id, IFormFile[] files);
        public dynamic UploadCV(int id, IFormFile[] files);
    }
}

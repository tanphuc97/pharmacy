using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface CandidateFileUploadAdminService
    {

        public dynamic FindByFileId(int fileId);
        public dynamic FindByCandidateId(int candidateId);
        public dynamic FindCVByCandidateId(int candidateId);
        public dynamic FindPhotoByCandidateId(int candidateId);
        public bool Delete(int fileId);


    }
}

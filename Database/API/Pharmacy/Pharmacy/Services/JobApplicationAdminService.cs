using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface JobApplicationAdminService
    {

        public dynamic FindAll();
        public dynamic Find(int jobId, int candidateId);
        public dynamic FindByJobId(int jobId);
        public dynamic FindByCandidateId(int candidateId);
        public JobApplication Find2(int jobId, int candidateId);
        public bool Create(JobApplication jobApplication);
        public bool Update(JobApplication jobApplication);
        public bool Send(EmailForm emailForm);
        public bool Delete(int id);
        public dynamic Search(string keyword);

        public dynamic FindEmail(string email);
      
    }
}

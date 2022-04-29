using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface JobApplicationStatusAdminService
    {

        public dynamic FindAll();
        public dynamic Find(int id);
        public JobApplicationStatus Find2(int id);
        public bool Create(JobApplicationStatus jobApplicationStatus);
        public bool Update(JobApplicationStatus jobApplicationStatus);
        public bool Delete(int id);
        public dynamic Search(string keyword);


    }
}

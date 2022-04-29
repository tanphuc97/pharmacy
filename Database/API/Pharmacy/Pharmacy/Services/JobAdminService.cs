using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface JobAdminService
    {

        public dynamic FindAll();
        public dynamic Find(int id);
        public Job Find2(int id);
        public bool Create(Job job);
        public bool Update(Job job);
        public bool Delete(int id);
        public dynamic Search(string keyword);


    }
}

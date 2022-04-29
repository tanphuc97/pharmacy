using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface JobService
    {
        public bool Create(Job job);
        public dynamic findAll();
    
        public dynamic searchLocation(string location);
       
        public dynamic searchByKeyword(string keyword);
        public bool delete(Job job);
        public dynamic findId(int id);
        public bool update(Job job);
    }
}

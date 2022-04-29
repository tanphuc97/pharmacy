using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface RoleAdminService
    {

        public dynamic FindAll();
        public dynamic Find(int id);
        public Role Find2(int id);
        public bool Create(Role role);
        public bool Update(Role role);
        public bool Delete(int id);
        public dynamic Search(string keyword);


    }
}

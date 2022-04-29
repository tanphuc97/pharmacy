using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface RoleService
    {
        public List<Role> FindAll();
        public dynamic FindRoleId(int id);
        public dynamic FindRoleName(string username);
        
        

    }
}

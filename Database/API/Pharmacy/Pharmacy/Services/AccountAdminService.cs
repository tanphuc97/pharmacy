using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface AccountAdminService
    {

        public dynamic FindAll();
        public dynamic Find(int id);
        public Account Find2(int id);
        public bool Create(Account account);
        public bool Update(Account account);
        public bool Delete(int id);
        public dynamic Search(string keyword);


    }
}

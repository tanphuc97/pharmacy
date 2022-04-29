using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface CategoryAdminService
    {

        public dynamic FindAll();
        public dynamic Find(int id);
        public Category Find2(int id);
        public bool Create(Category category);
        public bool Update(Category category);
        public bool Delete(int id);
        public dynamic Search(string keyword);


    }
}

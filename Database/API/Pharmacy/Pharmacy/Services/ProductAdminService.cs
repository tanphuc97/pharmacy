using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface ProductAdminService
    {

        public dynamic FindAll();
        public dynamic Find(int id);
        public Product Find2(int id);
        public int Create(Product product);
        public bool Update(Product product);
        public bool Delete(int id);
        public dynamic Search(string keyword);

        public dynamic UploadPhoto(int id, IFormFile[] files);

    }
}

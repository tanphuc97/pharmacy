using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface ProductFileUploadAdminService
    {

        public dynamic FindByFileId(int fileId);
        public dynamic FindByProductId(int productId);
        public bool Delete(int fileId);


    }
}

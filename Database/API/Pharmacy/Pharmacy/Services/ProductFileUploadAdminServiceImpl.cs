using Pharmacy.Models;

namespace Pharmacy.Services
{
    public class ProductFileUploadAdminServiceImpl : ProductFileUploadAdminService
    {

        private DatabaseContext db;

        public ProductFileUploadAdminServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }
          

        public dynamic FindByFileId(int fileId)
        {
            return db.ProductFileUploads.Where(p => p.FileId == fileId).Select(p => new 
            {
                FileId = p.FileId,
                Name = p.Name,
                Length = p.Length,
                Url = p.Url,
                ProductId = p.ProductId
            }).SingleOrDefault();
        }

        public bool Delete(int fileId)
        {
            try
            {
                db.ProductFileUploads.Remove(db.ProductFileUploads.Find(fileId));
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic FindByProductId(int productId)
        {
            return db.ProductFileUploads.Where(p => p.ProductId == productId).Select(p => new 
            {
                FileId = p.FileId,
                Name = p.Name,
                Length = p.Length,
                Url = p.Url,
                ProductId = p.ProductId
            }).ToList();
        }

        
    }
}

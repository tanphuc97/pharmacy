using Microsoft.EntityFrameworkCore;
using Pharmacy.Models;
using System.Diagnostics;
using System.Globalization;

namespace Pharmacy.Services
{
    public class ProductAdminServiceImpl : ProductAdminService
    {

        private DatabaseContext db;
        private IWebHostEnvironment webHostEnvironment;
        private IHttpContextAccessor httpContextAccessor;
        private ProductFileUploadAdminService productFileUploadService;

        public ProductAdminServiceImpl(DatabaseContext _db, IWebHostEnvironment _webHostEnvironment, IHttpContextAccessor _httpContextAccessor, ProductFileUploadAdminService _productFileUploadService)
        {
            db = _db;
            webHostEnvironment = _webHostEnvironment;
            httpContextAccessor = _httpContextAccessor;
            productFileUploadService = _productFileUploadService;
        }

        public int Create(Product product)
        {
            
                db.Products.Add(product);
                db.SaveChanges();
                return product.Id;
            
        }

        public bool Delete(int id)
        {
            try
            {
                var productFiles = productFileUploadService.FindByProductId(id);
                foreach (var productFile in productFiles)
                {
                    productFileUploadService.Delete(productFile.FileId);
                }
                db.Products.Remove(db.Products.Find(id));
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic Find(int id)
        {
            return db.Products.AsNoTracking().Where(p => p.Id == id).Select(p => new {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Description = p.Description,
                CategoryId = p.CategoryId,
                Category = p.Category.Name,
                Status = p.Status,
                Created = p.Created
                
            }).SingleOrDefault();
        }

        public Product Find2(int id)
        {
            return db.Products.SingleOrDefault(p => p.Id == id);
        }

        public dynamic FindAll()
        {
            return db.Products.Select(p => new { 
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Description = p.Description,
                CategoryId = p.CategoryId,
                Category = p.Category.Name,
                Status = p.Status,
                Created = p.Created
            }).ToList();
        }

        public dynamic Search(string keyword)
        {
            return db.Products.Where(p => p.Name.Contains(keyword)).Select(p => new {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Description = p.Description,
                CategoryId = p.CategoryId,
                Category = p.Category.Name,
                Status = p.Status,
                Created = p.Created
            }).ToList();
        }

        public bool Update(Product product)
        {
            try
            {
                db.Entry(product).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic UploadPhoto(int id, IFormFile[] files)
        {
            try
            {
                var baseURL = httpContextAccessor.HttpContext.Request.Scheme + "://" + httpContextAccessor.HttpContext.Request.Host + httpContextAccessor.HttpContext.Request.PathBase;
                
                foreach (var file in files)
                {
                    var path = Path.Combine(webHostEnvironment.WebRootPath, "images", file.FileName);
                    using (var fileStream = new FileStream(path, FileMode.Create))
                    {
                        file.CopyTo(fileStream);
                    }

                    var fileUpload = new ProductFileUpload();
                    fileUpload.ProductId = id;
                    fileUpload.Url = baseURL + "/images/" + file.FileName;
                    fileUpload.Name = file.FileName;
                    fileUpload.Length = (int)file.Length;            
                    db.ProductFileUploads.Add(fileUpload);                    
                    
                }
                db.SaveChanges();

                return  true;
            }
            catch 
            {
                return false;
            }
            
        }
    }
}

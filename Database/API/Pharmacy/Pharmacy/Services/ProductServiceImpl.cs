using Pharmacy.Models;
using System.Diagnostics;

namespace Pharmacy.Services
{
    public class ProductServiceImpl: ProductService

    {   
        private ClientService clientService;
        public InvoiceService invoiceService;
        private DatabaseContext db;
        public ProductServiceImpl(DatabaseContext _db, InvoiceService _invoiceService, ClientService _clientService)
        {
            db = _db;
            invoiceService = _invoiceService;
            clientService = _clientService;
        }

        public dynamic findProById(int ProductId)
        {
            Product p = db.Products.Find(ProductId);
            return new
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Description = p.Description,
            
                Status = p.Status,
                CategoryId = p.CategoryId,
                CategoryName = p.Category.Name,
                Created = p.Created
            };
        }

        public dynamic showProduct(string phonenumber)
        {
            try
            {
                var client = clientService.findPhone(phonenumber);
                var products = new List<Product>();
                InvoiceDetail invoicedetail = invoiceService.findInvoiceDetailById(client.Id);
          
                    products.Add(find(invoicedetail.ProductId));


                Debug.WriteLine("products:" + products.Count());
                return products.Select(p => new
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price,
                    Description = p.Description,

                    Status = p.Status,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name,
                    Created = p.Created

                });
            }
            catch(Exception ex)
            {
                return false;
                Debug.WriteLine(ex);
            }
              
             
          
        }

        public dynamic findAll()
        {
            return db.Products.Select(p => new
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Description = p.Description,
                Status = p.Status,
                CategoryId = p.CategoryId,
                CategoryName = p.Category.Name,
                Url = p.ProductFileUploads.Select(p=>p.Url).Take(1),
                Created = p.Created
            }
            ).ToList();
        }

        public dynamic searchCategory(string category)
        {
            return db.Products.Where(p => p.Category.Name.ToLower().Contains(category.ToLower())).Select(p => new
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Status = p.Status,
                Created = p.Created,
                CategoryName = p.Category.Name,

                Description = p.Description
            }).ToList();
        }

        public dynamic searchName(string name)
        {
            return db.Products.Where(p => p.Name.ToLower().Contains(name.ToLower()) || p.Category.Name.ToLower().Contains(name.ToLower())).Select(p => new
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Status = p.Status,
                Created = p.Created,
                CategoryName = p.Category.Name,
       
                Description = p.Description,
            }).ToList();
        }

        public bool create(Product product)
        {
            db.Products.Add(product);
            return db.SaveChanges() > 0;

        }

        public bool delete(int id)
        {
            db.Products.Remove(db.Products.Find(id));
            return db.SaveChanges() > 0;
        }

        public bool update(Product product)
        {
            db.Entry(product).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return db.SaveChanges() > 0;

        }

        public dynamic searchValue(decimal min, decimal max)
        {
            return db.Products.Where(p => p.Price >= min && p.Price <= max).Select(p => new
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                CategoryName = p.Category.Name,
        
                Status = p.Status,
                Created = p.Created,
                Description = p.Description,
            }).ToList();

        }

        public dynamic find(int id)
        {
            return db.Products.Find(id);
        }

        public dynamic? findId(int id)
        {
            try
            {

                return db.Products.Where(p => p.Id == id).Select(p => new
                {
                    Id = p.Id,
                    Name = p.Name,
                    Price = p.Price,
                    CategoryName = p.Category.Name,
                  
                    Status = p.Status,
                    Created = p.Created,
                    Description = p.Description,
                }).FirstOrDefault();

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public dynamic findAlltop8()

        {


            return db.Products.Where(p => p.Status == true).Select(p => new
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Description = p.Description,
                Url = p.ProductFileUploads.Select(p => p.Url).Take(1),
                Status = p.Status,
                CategoryId = p.CategoryId,
                CategoryName = p.Category.Name,
                Created = p.Created
            }
          ).OrderByDescending(u => u.Id).Take(8).ToList();
        }
        public dynamic findAllPricetop8()

        {


            return db.Products.Select(p => new
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Description = p.Description,
                Url = p.ProductFileUploads.Select(p => p.Url).Take(1),
                Status = p.Status,
                CategoryId = p.CategoryId,
                CategoryName = p.Category.Name,
                Created = p.Created
            }
          ).OrderByDescending(u => u.Price).Take(8).ToList();
        }
        public dynamic findAllfalse()
        {
            return db.Products.Where(p => p.Status == false).Select(p => new
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Description = p.Description,
                Url = p.ProductFileUploads.Select(p => p.Url).Take(1),
                Status = p.Status,
                CategoryId = p.CategoryId,
                CategoryName = p.Category.Name,
                Created = p.Created
            }).ToList();
          
        }

        public dynamic findAlltrue()
        {
            return db.Products.Where(p => p.Status == true).Select(p => new
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Description = p.Description,
                Url = p.ProductFileUploads.Select(p => p.Url).Take(1),
                Status = p.Status,
                CategoryId = p.CategoryId,
                CategoryName = p.Category.Name,
                Created = p.Created
            }).ToList();
        }

        public dynamic findAlltop3()
        {
                return db.Products.Where(p => p.Status == true).Select(p => new
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Description = p.Description,
                Url = p.ProductFileUploads.Select(p => p.Url).Take(1),
                 Status = p.Status,
                CategoryId = p.CategoryId,
                CategoryName = p.Category.Name,
                Created = p.Created
            }
          ).OrderByDescending(u => u.Id).Take(3).ToList();
        }
    }
}

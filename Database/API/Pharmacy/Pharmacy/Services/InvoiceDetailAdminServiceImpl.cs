using Pharmacy.Models;

namespace Pharmacy.Services
{
    public class InvoiceDetailAdminServiceImpl : InvoiceDetailAdminService
    {

        private DatabaseContext db;

        public InvoiceDetailAdminServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        public bool Create(InvoiceDetail invoiceDetail)
        {
            try
            {
                db.InvoiceDetails.Add(invoiceDetail);
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool Delete(int id)
        {
            try
            {
                db.InvoiceDetails.Remove(db.InvoiceDetails.Find(id));
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        
        public dynamic Find(int id)
        {
            return db.InvoiceDetails.Where(p => p.InvoiceId == id).Select(p => new {
                InvoiceId = p.InvoiceId,
                ProductId = p.ProductId,
                Product = p.Product.Name,
                ProductImg = p.Product.ProductFileUploads.Select(p=>p.Url).Take(1),
                ProductPrice = p.Product.Price,
                Quantity = p.Quantity,
            });
        }

        public dynamic Total(int id)
        {
            
           return db.InvoiceDetails.Where(p => p.InvoiceId == id).Sum(s => s.Product.Price * s.Quantity);
        }


        public InvoiceDetail Find2(int id)
        {
            return db.InvoiceDetails.SingleOrDefault(p => p.InvoiceId == id);
        }

        public dynamic FindAll()
        {
            return db.InvoiceDetails.Select(p => new { 
                InvoiceId = p.InvoiceId,
                ProductId = p.ProductId,
               Product = p.Product.Name,
                ProductPrice = p.Product.Price,
                Quantity = p.Quantity,
            }).ToList();
        }

        public dynamic Search(string keyword)
        {
            return db.InvoiceDetails.Where(p => p.InvoiceId.ToString().Contains(keyword)).Select(p => new {
                InvoiceId = p.InvoiceId,
                ProductId = p.ProductId,
                Product = p.Product.Name,
                ProductPrice = p.Product.Price,
                Quantity = p.Quantity,
            }).ToList();
        }

        public bool Update(InvoiceDetail invoiceDetail)
        {
            try
            {
                db.Entry(invoiceDetail).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}

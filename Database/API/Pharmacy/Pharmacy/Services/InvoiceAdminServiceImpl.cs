using Pharmacy.Models;

namespace Pharmacy.Services
{
    public class InvoiceAdminServiceImpl : InvoiceAdminService
    {

        private DatabaseContext db;

        public InvoiceAdminServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        public bool Create(Invoice invoice)
        {
            try
            {
                db.Invoices.Add(invoice);
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
                db.Invoices.Remove(db.Invoices.Find(id));
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic Find(int id)
        {
            return db.Invoices.Where(p => p.Id == id).Select(p => new {
                Id = p.Id,
                ClientId = p.ClientId,
            
                Created = p.Created
            }).SingleOrDefault();
        }

        public Invoice Find2(int id)
        {
            return db.Invoices.SingleOrDefault(p => p.Id == id);
        }

        public dynamic FindAll()
        {
            return db.Invoices.Select(p => new { 
                Id = p.Id,
                ClientId = p.ClientId,
               
                Created = p.Created
            }).ToList();
        }

        public dynamic Search(string keyword)
        {
            return db.Invoices.Where( p=>p.Id.ToString().Contains(keyword)).Select(p => new {
                Id = p.Id,
                ClientId = p.ClientId,
              
                Created = p.Created
            }).ToList();
        }

        public bool Update(Invoice invoice)
        {
            try
            {
                db.Entry(invoice).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}

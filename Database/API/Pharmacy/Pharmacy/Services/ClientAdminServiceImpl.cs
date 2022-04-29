using Pharmacy.Models;

namespace Pharmacy.Services
{
    public class ClientAdminServiceImpl : ClientAdminService
    {

        private DatabaseContext db;

        public ClientAdminServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        public bool Create(Client client)
        {
            try
            {
                db.Clients.Add(client);
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
                db.Clients.Remove(db.Clients.Find(id));
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic Find(int id)
        {
            return db.Clients.Where(p => p.Id == id).Select(p => new {
                Id = p.Id,
                Name = p.Name,
                Address = p.Address,
                City = p.City,
                Country = p.Country,
                EmailAddress = p.EmailAddress,
                Phone = p.Phone,
            }).SingleOrDefault();
        }

        public Client Find2(int id)
        {
            return db.Clients.SingleOrDefault(p => p.Id == id);
        }

        public dynamic FindAll()
        {
            return db.Clients.Select(p => new { 
                Id = p.Id,
                Name = p.Name,
                Address = p.Address,
                City = p.City,
                Country = p.Country,
                EmailAddress = p.EmailAddress,
                Phone = p.Phone,
            }).ToList();
        }

        public dynamic Search(string keyword)
        {
            return db.Clients.Where(p => p.Name.Contains(keyword)).Select(p => new {
                Id = p.Id,
                Name = p.Name,
                Address = p.Address,
                City = p.City,
                Country = p.Country,
                EmailAddress = p.EmailAddress,
                Phone = p.Phone,
            }).ToList();
        }

        public bool Update(Client client)
        {
            try
            {
                db.Entry(client).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}

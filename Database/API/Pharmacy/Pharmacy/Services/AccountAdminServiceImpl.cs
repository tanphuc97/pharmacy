using Pharmacy.Models;

namespace Pharmacy.Services
{
    public class AccountAdminServiceImpl : AccountAdminService
    {

        private DatabaseContext db;

        public AccountAdminServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        public bool Create(Account account)
        {
            try
            {
                db.Accounts.Add(account);
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
                db.Accounts.Remove(db.Accounts.Find(id));
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic Find(int id)
        {
            return db.Accounts.Where(p => p.Id == id).Select(p => new {
                Id = p.Id,
                RoleId = p.RoleId,
                Role = p.Role.Name,
                Username = p.Username,
                Password = p.Password,
                Status = p.Status,
                Email = p.Email,
            }).SingleOrDefault();
        }

        public Account Find2(int id)
        {
            return db.Accounts.SingleOrDefault(p => p.Id == id);
        }

        public dynamic FindAll()
        {
            return db.Accounts.Select(p => new { 
                Id = p.Id,
                RoleId = p.RoleId,
                Role = p.Role.Name, 
                Username = p.Username, 
                Password = p.Password, 
                Status = p.Status,
                Email = p.Email,
            }).ToList();
        }

        public dynamic Search(string keyword)
        {
            return db.Accounts.Where(p => p.Username.Contains(keyword)).Select(p => new {
                Id = p.Id,
                RoleId = p.RoleId,
                Role = p.Role.Name,
                Username = p.Username,
                Password = p.Password,
                Status = p.Status,
                Email = p.Email,
            }).ToList();
        }

        public bool Update(Account account)
        {
            try
            {
                db.Entry(account).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}

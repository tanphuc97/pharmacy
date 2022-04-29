using Pharmacy.Models;

namespace Pharmacy.Services
{
    public class RoleAdminServiceImpl : RoleAdminService
    {

        private DatabaseContext db;

        public RoleAdminServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        public bool Create(Role role)
        {
            try
            {
                db.Roles.Add(role);
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
                db.Roles.Remove(db.Roles.Find(id));
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic Find(int id)
        {
            return db.Roles.Where(p => p.Id == id).Select(p => new {
                Id = p.Id,
                Name = p.Name,
                Status = p.Status
            }).SingleOrDefault();
        }

        public Role Find2(int id)
        {
            return db.Roles.SingleOrDefault(p => p.Id == id);
        }

        public dynamic FindAll()
        {
            return db.Roles.Select(p => new { 
                Id = p.Id,
                Name = p.Name, 
                Status = p.Status 
            }).ToList();
        }

        public dynamic Search(string keyword)
        {
            return db.Roles.Where(p => p.Name.Contains(keyword)).Select(p => new {
                Id = p.Id,
                Name = p.Name,
                Status = p.Status
            }).ToList();
        }

        public bool Update(Role role)
        {
            try
            {
                db.Entry(role).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}

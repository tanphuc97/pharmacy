using Pharmacy.Models;

namespace Pharmacy.Services
{
    public class CategoryAdminServiceImpl : CategoryAdminService
    {

        private DatabaseContext db;

        public CategoryAdminServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        public bool Create(Category category)
        {
            try
            {
                db.Categories.Add(category);
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
                db.Categories.Remove(db.Categories.Find(id));
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic Find(int id)
        {
            return db.Categories.Where(p => p.Id == id).Select(p => new {
                Id = p.Id,
                Name = p.Name,
                Status = p.Status
            }).SingleOrDefault();
        }

        public Category Find2(int id)
        {
            return db.Categories.SingleOrDefault(p => p.Id == id);
        }

        public dynamic FindAll()
        {
            return db.Categories.Select(p => new { 
                Id = p.Id,
                Name = p.Name, 
                Status = p.Status 
            }).ToList();
        }

        public dynamic Search(string keyword)
        {
            return db.Categories.Where(p => p.Name.Contains(keyword)).Select(p => new {
                Id = p.Id,
                Name = p.Name,
                Status = p.Status
            }).ToList();
        }

        public bool Update(Category category)
        {
            try
            {
                db.Entry(category).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}

using Pharmacy.Models;

namespace Pharmacy.Services
{
    public class CategoryServiceImpl : CategoryService
    {
        private DatabaseContext db;
        public CategoryServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        public dynamic findAll()
        {
           return db.Categories.Select(p =>new
           {
               Id = p.Id,
               Name = p.Name,
               status = p.Status
           }).ToList();
        }

        public dynamic findAlltruetop5()
        {
            return db.Categories.Where(p=>p.Status==true).Select(p => new
            {
                Id = p.Id,
                Name = p.Name,
                status = p.Status
            }).Take(5).ToList();
        }
    }
}

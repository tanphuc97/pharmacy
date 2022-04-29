using Pharmacy.Models;

namespace Pharmacy.Services
{
    public class JobAdminServiceImpl : JobAdminService
    {

        private DatabaseContext db;

        public JobAdminServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        public bool Create(Job job)
        {
            try
            {
                db.Jobs.Add(job);
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
                db.Jobs.Remove(db.Jobs.Find(id));
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic Find(int id)
        {
            return db.Jobs.Where(p => p.Id == id).Select(p => new {
                Id = p.Id,
                JobName = p.JobName,
                Description = p.Description,
                Created = p.Created,
                Salary = p.Salary,
                Location = p.Location,
                Status = p.Status
            }).SingleOrDefault();
        }

        public Job Find2(int id)
        {
            return db.Jobs.SingleOrDefault(p => p.Id == id);
        }

        public dynamic FindAll()
        {
            return db.Jobs.Select(p => new { 
                Id = p.Id,
                JobName = p.JobName,
                Description = p.Description,
                Created = p.Created,
                Salary = p.Salary,
                Location = p.Location,
                Status = p.Status 
            }).ToList();
        }

        public dynamic Search(string keyword)
        {
            return db.Jobs.Where(p => p.JobName.Contains(keyword)).Select(p => new {
                Id = p.Id,
                JobName = p.JobName,
                Description = p.Description,
                Created = p.Created,
                Salary = p.Salary,
                Location = p.Location,
                Status = p.Status
            }).ToList();
        }

        public bool Update(Job job)
        {
            try
            {
                db.Entry(job).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}

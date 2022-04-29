using Pharmacy.Models;

namespace Pharmacy.Services
{
    public class JobApplicationStatusAdminServiceImpl : JobApplicationStatusAdminService
    {

        private DatabaseContext db;

        public JobApplicationStatusAdminServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        public bool Create(JobApplicationStatus jobApplicationStatus)
        {
            try
            {
                db.JobApplicationStatuses.Add(jobApplicationStatus);
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
                db.JobApplicationStatuses.Remove(db.JobApplicationStatuses.Find(id));
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic Find(int id)
        {
            return db.JobApplicationStatuses.Where(p => p.Id == id).Select(p => new {
                Id = p.Id,
                Name = p.Name,
                Status = p.Status
            }).SingleOrDefault();
        }

        public JobApplicationStatus Find2(int id)
        {
            return db.JobApplicationStatuses.SingleOrDefault(p => p.Id == id);
        }

        public dynamic FindAll()
        {
            return db.JobApplicationStatuses.Select(p => new { 
                Id = p.Id,
                Name = p.Name, 
                Status = p.Status 
            }).ToList();
        }

        public dynamic Search(string keyword)
        {
            return db.JobApplicationStatuses.Where(p => p.Name.Contains(keyword)).Select(p => new {
                Id = p.Id,
                Name = p.Name,
                Status = p.Status
            }).ToList();
        }

        public bool Update(JobApplicationStatus jobApplicationStatus)
        {
            try
            {
                db.Entry(jobApplicationStatus).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}

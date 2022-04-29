using Pharmacy.Models;

namespace Pharmacy.Services
{
    public class JobServiceImpl : JobService
    {
        private DatabaseContext db;

        public JobServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

      

        public bool Create(Job job)
        {
             db.Jobs.Add(job);
            return db.SaveChanges() > 0;
        }

        public dynamic findAll()
        {
            return db.Jobs.Select(p=>new
            {
                Id = p.Id,
                Description = p.Description,
                JobName=p.JobName,
                Location=p.Location,
                Status=p.Status,
                Created = p.Created,
                Salary = p.Salary
            }).ToList();
        }


        public dynamic searchLocation(string location)
        {
            return db.Jobs.Where(p => p.Location.Contains(location)).Select(p => new
            {
                Id = p.Id,
                Description = p.Description,
                JobName = p.JobName,
                Location = p.Location,
                Status = p.Status,
                Created = p.Created,
                Salary = p.Salary
            }).ToList();


        }
       

        public dynamic searchByKeyword(string keyword)
        {
            return db.Jobs.Where(p => p.Location.Contains(keyword)|| p.Description.Contains(keyword) || p.JobName.Contains(keyword)).Select(p => new
            {
                Id = p.Id,
                Description = p.Description,
                JobName = p.JobName,
                Location = p.Location,
                Status = p.Status,
                Created = p.Created,
                Salary = p.Salary
            }).ToList();
        }

        public bool delete(Job job)
        {
            db.Jobs.Remove(job);
            return db.SaveChanges() > 0;
        }

        public dynamic findId(int id)
        {
           return db.Jobs.FirstOrDefault(p=>p.Id==id);
        }

        public bool update(Job job)
        {
            db.Entry(job).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
           return db.SaveChanges()>0;
        }

       
    }
}

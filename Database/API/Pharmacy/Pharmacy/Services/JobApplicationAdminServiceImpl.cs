using Pharmacy.Models;
using Pharmacy.Helpers;


namespace Pharmacy.Services
{
    public class JobApplicationAdminServiceImpl : JobApplicationAdminService
    {

        private DatabaseContext db;
        private IConfiguration configuration;
        private IWebHostEnvironment webHostEnvironment;

        public JobApplicationAdminServiceImpl(DatabaseContext _db, IConfiguration _configuration, IWebHostEnvironment _webHostEnvironment)
        {
            db = _db;
            configuration = _configuration;
            webHostEnvironment = _webHostEnvironment;
        }

        public bool Create(JobApplication jobApplication)
        {
            try
            {
                db.JobApplications.Add(jobApplication);
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
                db.JobApplications.Remove(db.JobApplications.Find(id));
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic Find(int jobId, int candidateId)
        {
            return db.JobApplications.Where(p => p.JobId == jobId && p.CandidateId == candidateId).Select(p => new {
                JobId = p.JobId,
                Job = p.Job.JobName,
                CandidateId = p.CandidateId,
                Candidate = p.Candidate.Fullname,
                ApplyDate = p.ApplyDate,
                StatusId = p.StatusId,
                Status = p.Status.Name,
                DateInterview = p.DateInterview,
                Email = p.Candidate.Account.Email
            });
        }

        public dynamic FindByJobId(int jobId)
        {
            return db.JobApplications.Where(p => p.JobId == jobId).Select(p => new {
                JobId = p.JobId,
                Job = p.Job.JobName,
                CandidateId = p.CandidateId,
                Candidate = p.Candidate.Fullname,
                ApplyDate = p.ApplyDate,
                StatusId = p.StatusId,
                Status = p.Status.Name,
                DateInterview = p.DateInterview
            });
        }

        public dynamic FindByCandidateId(int candidateId)
        {
            return db.JobApplications.Where(p => p.CandidateId == candidateId).Select(p => new
            {
                JobId = p.JobId,
                Job = p.Job.JobName,
                CandidateId = p.CandidateId,
                Candidate = p.Candidate.Fullname,
                ApplyDate = p.ApplyDate,
                StatusId = p.StatusId,
                Status = p.Status.Name,
                DateInterview = p.DateInterview
            }).ToList();

        }

        public JobApplication Find2(int jobId, int candidateId)
        {
            return db.JobApplications.SingleOrDefault(p => p.JobId == jobId && p.CandidateId == candidateId);
        }

        public dynamic FindAll()
        {
            return db.JobApplications.Select(p => new {
                JobId = p.JobId,
                Job = p.Job.JobName,
                CandidateId = p.CandidateId,
                Candidate = p.Candidate.Fullname,
                ApplyDate = p.ApplyDate,
                StatusId = p.StatusId,
                Status = p.Status.Name,
                DateInterview = p.DateInterview
            }).ToList();
        }

        public dynamic Search(string keyword)
        {
            return db.JobApplications.Where(p => p.Job.JobName.Contains(keyword) || p.Candidate.Fullname.Contains(keyword)).Select(p => new {
                JobId = p.JobId,
                Job = p.Job.JobName,
                CandidateId = p.CandidateId,
                Candidate = p.Candidate.Fullname,
                ApplyDate = p.ApplyDate,
                StatusId = p.StatusId,
                Status = p.Status.Name,
                DateInterview = p.DateInterview
            }).ToList();
        }

        public bool Update(JobApplication jobApplication)
        {
            try
            {
                db.Entry(jobApplication).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool Send(EmailForm emailForm)
        {
            try
            {
                var mailHelper = new MailHelper(configuration);

                if (mailHelper.Send(configuration["Gmail:Username"], emailForm.To, emailForm.Subject, emailForm.Content))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }

        }

        public dynamic FindEmail(string email)
        {
            return db.Accounts.SingleOrDefault(a => a.Email.Equals(email));
        }

       

    }
}

using Pharmacy.Models;

namespace Pharmacy.Services
{
    public class FeedbackAdminServiceImpl : FeedbackAdminService
    {

        private DatabaseContext db;

        public FeedbackAdminServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        public bool Create(Feedback feedback)
        {
            try
            {
                db.Feedbacks.Add(feedback);
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
                db.Feedbacks.Remove(db.Feedbacks.Find(id));
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic Find(int id)
        {
            return db.Feedbacks.Where(p => p.Id == id).Select(p => new {
                Id = p.Id,
                ClientId = p.ClientId,
                Client = p.Client.Name,
                ProductId = p.ProductId,
                Product = p.Product.Name,
                Content = p.Content,
                Status = p.Status,
                Title = p.Title,
            }).SingleOrDefault();
        }

        public Feedback Find2(int id)
        {
            return db.Feedbacks.SingleOrDefault(p => p.Id == id);
        }

        public dynamic FindAll()
        {
            return db.Feedbacks.Select(p => new { 
                Id = p.Id,
                ClientId = p.ClientId,
                Client = p.Client.Name,
                ProductId = p.ProductId,
                Product = p.Product.Name,
                Content = p.Content, 
                Status = p.Status,
                Title = p.Title,
            }).ToList();
        }

        public dynamic Search(string keyword)
        {
            return db.Feedbacks.Where(p => p.Client.Name.Contains(keyword) || p.Product.Name.Contains(keyword)).Select(p => new {
                Id = p.Id,
                ClientId = p.ClientId,
                Client = p.Client.Name,
                ProductId = p.ProductId,
                Product = p.Product.Name,
                Content = p.Content,
                Status = p.Status,
                Title = p.Title,
            }).ToList();
        }

        public bool Update(Feedback feedback)
        {
            try
            {
                db.Entry(feedback).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}

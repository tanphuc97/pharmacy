using Pharmacy.Models;
using System.Diagnostics;

namespace Pharmacy.Services
{
    public class FeedbackServiceImpl : FeedbackService
    {
        private DatabaseContext db;
        public FeedbackServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        public bool create(Feedback feedback)
        {
            
                 db.Feedbacks.Add(feedback);
                return db.SaveChanges() > 0;
          

        }

        public bool delete(Feedback feedback)
        {
            db.Feedbacks.Remove(feedback);
            return db.SaveChanges() > 0;
        }

        public dynamic find(int id)
        {
               Feedback feedback = db.Feedbacks.Find(id);
            return new
            {
                Id = feedback.Id,
              Content= feedback.Content,
              Status = feedback.Status,
              ClientId = feedback.ClientId,
              Title = feedback.Title,
              ProductId = feedback.ProductId,
            /*  ProductName= feedback.Product.Name*/
      


            };
          
          

        }

        public dynamic findAll()
        {
            return db.Feedbacks.Select(p => new
            {
                Id = p.Id,
                Content = p.Content,
                Status = p.Status,
                ClientId = p.ClientId,
            
                Title = p.Title,
                ProductId = p.ProductId,
                 /* ProductName = p.Product.Name*/
            }).ToList();
        }

        public dynamic searchKeyword(string keyword)
        {
            return db.Feedbacks.Where(p => p.Content.ToLower().Contains(keyword.ToLower()) || p.Title.ToLower().Contains(keyword.ToLower()) || p.Id.ToString().ToLower().Contains(keyword.ToLower())).Select(p => new
            {
                Id = p.Id,
                Content = p.Content,
                Status = p.Status,
                ClientId = p.ClientId,
           
                Title = p.Title,
                ProductId = p.ProductId,
                /*  ProductName = p.Product.Name*/
            });
        }
    }
}

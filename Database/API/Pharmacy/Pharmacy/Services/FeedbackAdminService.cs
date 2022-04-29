using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface FeedbackAdminService
    {

        public dynamic FindAll();
        public dynamic Find(int id);
        public Feedback Find2(int id);
        public bool Create(Feedback feedback);
        public bool Update(Feedback feedback);
        public bool Delete(int id);
        public dynamic Search(string keyword);


    }
}

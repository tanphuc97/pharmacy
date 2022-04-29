using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface FeedbackService
    {
        public bool create(Feedback feedback);
        public dynamic searchKeyword(string keyword);
        public dynamic find(int id);
        public bool delete(Feedback feedback);
        public dynamic findAll();
    }
}

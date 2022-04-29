using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface ClientService 
    {
        public Client findPhone(string phonenumber);
        public bool create(Client client);
        public dynamic findLastest();

    }
}

using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface ClientAdminService
    {

        public dynamic FindAll();
        public dynamic Find(int id);
        public Client Find2(int id);
        public bool Create(Client client);
        public bool Update(Client client);
        public bool Delete(int id);
        public dynamic Search(string keyword);


    }
}

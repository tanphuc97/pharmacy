using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface InvoiceAdminService
    {

        public dynamic FindAll();
        public dynamic Find(int id);
        public Invoice Find2(int id);
        public bool Create(Invoice invoice);
        public bool Update(Invoice invoice);
        public bool Delete(int id);
        public dynamic Search(string keyword);


    }
}

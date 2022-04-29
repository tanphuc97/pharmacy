using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface InvoiceDetailAdminService
    {

        public dynamic FindAll();
        public dynamic Find(int id);
        public dynamic Total(int id);
        public InvoiceDetail Find2(int id);
        public bool Create(InvoiceDetail invoiceDetail);
        public bool Update(InvoiceDetail invoiceDetail);
        public bool Delete(int id);
        public dynamic Search(string keyword);


    }
}

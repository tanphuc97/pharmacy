using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface InvoiceService
    {
        public Invoice findInvoiceByClient(int clientId);
        public InvoiceDetail findInvoiceDetailById(int Id);
        public bool create(Invoice invoice);

        public bool createDetails(InvoiceDetail invoiceDetail);
        public int createNew(int clientId);
        public bool createInvoiceDetail(int invoiceId,int productId);
    }
}

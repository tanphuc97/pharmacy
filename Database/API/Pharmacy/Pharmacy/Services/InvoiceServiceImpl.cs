using Pharmacy.Models;

namespace Pharmacy.Services
{
    public class InvoiceServiceImpl : InvoiceService

    {
        private DatabaseContext db;
        public InvoiceServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        public Invoice findInvoiceByClient(int clientId)
        {
           return db.Invoices.Where(p=>p.ClientId== clientId).FirstOrDefault();
        }

        public InvoiceDetail findInvoiceDetailById(int clientId)
        {
            return db.InvoiceDetails.FirstOrDefault(p => p.InvoiceId == findInvoiceByClient(clientId).Id);
        }

        public bool create(Invoice invoice)
        {
            db.Invoices.Add(invoice);
            return db.SaveChanges() > 0;
        }

        public bool createDetails(InvoiceDetail invoiceDetail)
        {
            db.InvoiceDetails.Add(invoiceDetail);
            return db.SaveChanges() > 0;
        }

        public int createNew(int clientId)
        {
            var invoice = new Invoice();
            invoice.ClientId = clientId;
            invoice.Created = DateTime.Now;
            db.Invoices.Add(invoice);
            db.SaveChanges();
            return invoice.Id;
        }

        public bool createInvoiceDetail(int invoiceId,int productId)
        {
            InvoiceDetail invoiceDetail = new InvoiceDetail();
            invoiceDetail.InvoiceId = invoiceId;
            invoiceDetail.ProductId = productId;
            invoiceDetail.Quantity = 1;
            db.InvoiceDetails.Add(invoiceDetail);
            return db.SaveChanges() > 0;

        }
    }
}

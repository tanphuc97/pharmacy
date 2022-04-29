using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface ProductService
    {
        public dynamic findProById(int productId);
        //  public List<Product> findProsByInvoice(List<InvoiceDetail> invoiceDetails);
        public dynamic showProduct(string phonenumber);
        public dynamic findAll();
        public dynamic findAlltop8();
        public dynamic findAlltop3();
        public dynamic findAllPricetop8();
        public dynamic findAllfalse();
        public dynamic findAlltrue();
        public dynamic searchValue(decimal min, decimal max);
        public dynamic searchName(string name);
        public dynamic searchCategory(string category);
        public bool create(Product product);

        public bool update(Product product);

        public bool delete(int id);

        public dynamic? findId(int id);
        public dynamic find(int id);
       
    }
}

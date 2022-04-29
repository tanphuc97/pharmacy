using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface AboutUsAdminService
    {
        public AboutU Find();        
        public bool Update(AboutU content);


    }
}

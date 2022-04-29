using Pharmacy.Models;
using System.Diagnostics;

namespace Pharmacy.Services
{
    public class AboutUsAdminServiceImpl : AboutUsAdminService
    {

        private DatabaseContext db;

        public AboutUsAdminServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        public AboutU Find()
        {
            return db.AboutUs.SingleOrDefault(p => p.Id == 1);
        }
            
        public bool Update(AboutU content)
        {
            try
            {
                db.Entry(content).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}

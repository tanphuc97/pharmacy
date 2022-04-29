using Pharmacy.Models;

namespace Pharmacy.Services
{
    public class RoleServiceImpl : RoleService
    {
        private DatabaseContext db;
        public RoleServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        public List<Role> FindAll()
        {
            return db.Roles.ToList();
        }

        public dynamic FindRoleId(int id)
        {
            return db.Roles.Find(id);
        }

        public dynamic FindRoleName(string username)
        {
            return db.Roles.SingleOrDefault(a => a.Name.Equals(username));
        }
    }
}

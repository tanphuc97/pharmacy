using Pharmacy.Models;

namespace Pharmacy.Services
{
    public interface AccountService
    {
        public Account Find(int id);
        public dynamic FindAccount(string username);
        public dynamic FindRoleName(string roleName);
        public dynamic FindAll();
        public List<Account> FindAll2();
        public bool Create(Account account);
        public bool Update(Account account);
        public dynamic AccountInfo(string username);
        public bool Delete(int id);
        public Account Login(Login login);
        public bool ChangePassword(Account account);
        public bool CheckCode(int id, string checkCodeEmail);
        public dynamic FindEmail(string email);
        public bool UpdateCode(Account account);
    }
}

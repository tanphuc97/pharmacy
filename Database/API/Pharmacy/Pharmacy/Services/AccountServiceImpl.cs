using Pharmacy.Models;

namespace Pharmacy.Services
{


    public class AccountServiceImpl : AccountService
    {
        private DatabaseContext db;
        public AccountServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        public bool Create(Account account)
        {
            try
            {
                var accounts = FindAll2();
                foreach (var acc in accounts)
                {
                    if (acc.Email == account.Email || acc.Username == account.Username)
                    {
                        return false;
                    }
                  
                    
                }
                account.Password = BCrypt.Net.BCrypt.HashPassword(account.Password);
                account.Status = false;
                db.Accounts.Add(account);
                return db.SaveChanges() > 0;

            }
            catch
            {
                return false;
            }
            return false;
        }

        public bool Update(Account account)
        {
            try
            {

               
                db.Entry(account).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public bool Delete(int id)
        {
            try
            {
                db.Accounts.Remove(db.Accounts.Find(id));
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
        }

        public dynamic FindAll()
        {

            return db.Accounts.Select(
                info => new
                {
                    Id = info.Id,
                    Username = info.Username,
                   
                    Password = info.Password,
                  /*  Fullname = info.Fullname,
                    Gender = info.Gender,
                    Status = info.Status,
                    Dob = info.Dob,*/
                    Email = info.Email,
                    Code = info.Code,


                }).ToList();
        }

        public dynamic AccountInfo(string username)
        {
            var account = FindAccount(username);
            if (account != null)
            {
                /*  return db.Accounts.Where(a => a.Username == account.Username).Select(info => new
                  {
                      id = info.Id,
                      username = info.Username,
                      fullname = info.Fullname,
                      password = info.Password,
                      gender = info.Gender,
                      status = info.Status,
                      dob = info.Dob,

                  });*/
                return FindAccount(username);

            }
            return false;

        }

        public Account Find(int id)
        {
            return db.Accounts.Find(id);
        }

        public dynamic FindAccount(string username)
        {
            return db.Accounts.SingleOrDefault(a => a.Username.Equals(username));
        }

        public Account Login(Login login)
        {
            var account = FindAccount(login.Username);
            if (account != null)
            {
                if (BCrypt.Net.BCrypt.Verify(login.Password, account.Password))
                {
                    if (account.Status == true)
                    {
                        return account;
                    }
                    
                }
            }
            else
            {
                return null;
            }
            return null;
        }

        public bool ChangePassword(Account account)
        {
            try
            {
                var accounts = FindAll2();
                foreach (var acc in accounts)
                {
                    if (acc.Code == account.Code && acc.Email == account.Email)
                    {
                        return true;
                    }
                    account.Password = BCrypt.Net.BCrypt.HashPassword(account.Password);
                    db.Entry(account).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    return db.SaveChanges() > 0;
                }

            }
            catch
            {
                return false;
            }
            return false;
        }

        public bool UpdateCode(Account account)
        {
            try
            {
                /* var accounts = FindAll2();
                 foreach(var acc in accounts)
                 {
                     if(acc.Email == account.Email)
                     {
                         return true;
                     }
                 }*/
                db.Entry(account).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                return db.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }

        }


        public bool CheckCode(int id, string checkCodeEmail)
        {
            var account = Find(id);
            if (account.Code == checkCodeEmail)
            {
                account.Status = true;
                return db.SaveChanges() > 0;
            }
            return false;
        }

        public dynamic FindEmail(string email)
        {
            return db.Accounts.SingleOrDefault(a => a.Email.Equals(email));
        }

        public List<Account> FindAll2()
        {
            return db.Accounts.ToList();
        }

        public dynamic FindRoleName(string roleName)
        {
            return db.Roles.SingleOrDefault(a => a.Name.Equals(roleName));
        }
    }
}

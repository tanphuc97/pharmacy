using Pharmacy.Models;

namespace Pharmacy.Services
{
    public class ClientServiceImpl : ClientService
    {
        private DatabaseContext db;
        public ClientServiceImpl(DatabaseContext _db)
        {
            db = _db;
        }

        public bool create(Client client)
        {
           db.Clients.Add(client);
            return db.SaveChanges() > 0;
        }

        public Client findPhone(string phonenumber)
        {
            return db.Clients.FirstOrDefault(p=>p.Phone == phonenumber);
        }
        public dynamic findLastest( )
        {
            return db.Clients.OrderByDescending(p => p.Id).Take(1).Select(p => new
            {
                Id = p.Id,
                Name = p.Name,
                Address = p.Address,
                City = p.City,
                Country = p.Country,
                Phone = p.Phone,
                EmailAddress = p.EmailAddress
            }).ToList();
        }


      
    }
}

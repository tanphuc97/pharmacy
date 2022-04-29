using System;
using System.Collections.Generic;

namespace Pharmacy.Models
{
    public partial class Account
    {
        public Account()
        {
            Candidates = new HashSet<Candidate>();
        }

        public int Id { get; set; }
        public int? RoleId { get; set; }
        public string? Email { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public bool? Status { get; set; }
        public string? Code { get; set; }

        public virtual Role? Role { get; set; }
        public virtual ICollection<Candidate> Candidates { get; set; }
    }
}

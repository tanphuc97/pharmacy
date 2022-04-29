using System;
using System.Collections.Generic;

namespace Pharmacy.Models
{
    public partial class Client
    {
        public Client()
        {
            Feedbacks = new HashSet<Feedback>();
            Invoices = new HashSet<Invoice>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public string? EmailAddress { get; set; }
        public string? Phone { get; set; }

        public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual ICollection<Invoice> Invoices { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace Pharmacy.Models
{
    public partial class Invoice
    {
        public int Id { get; set; }
        public int? ClientId { get; set; }
        public DateTime? Created { get; set; }

        public virtual Client? Client { get; set; }
    }
}

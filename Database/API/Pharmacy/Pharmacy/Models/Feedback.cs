using System;
using System.Collections.Generic;

namespace Pharmacy.Models
{
    public partial class Feedback
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public int? ProductId { get; set; }
        public int? ClientId { get; set; }
        public string? Content { get; set; }
        public bool? Status { get; set; }

        public virtual Client? Client { get; set; }
        public virtual Product? Product { get; set; }
    }
}

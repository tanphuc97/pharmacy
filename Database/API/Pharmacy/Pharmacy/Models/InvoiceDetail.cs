using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Pharmacy.Models
{
    public partial class InvoiceDetail
    {
        [Key]
        public int InvoiceId { get; set; }
        public int ProductId { get; set; }
        public int? Quantity { get; set; }

        public virtual Invoice Invoice { get; set; } = null!;
        public virtual Product Product { get; set; } = null!;
    }
}

using System;
using System.Collections.Generic;

namespace Pharmacy.Models
{
    public partial class JobApplicationStatus
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public bool? Status { get; set; }
    }
}

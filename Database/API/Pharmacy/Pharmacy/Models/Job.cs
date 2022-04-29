using System;
using System.Collections.Generic;

namespace Pharmacy.Models
{
    public partial class Job
    {
        public int Id { get; set; }
        public string? JobName { get; set; }
        public string? Description { get; set; }
        public DateTime? Created { get; set; }
        public int? Salary { get; set; }
        public string? Location { get; set; }
        public bool? Status { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace Pharmacy.Models
{
    public partial class JobInformation
    {
        public JobInformation()
        {
            Candidates = new HashSet<Candidate>();
        }

        public int Id { get; set; }
        public string? JobName { get; set; }
        public string? Description { get; set; }
        public int? Quantity { get; set; }
        public string? Location { get; set; }
        public bool? Status { get; set; }
        public DateTime? Created { get; set; }

        public virtual ICollection<Candidate> Candidates { get; set; }
    }
}

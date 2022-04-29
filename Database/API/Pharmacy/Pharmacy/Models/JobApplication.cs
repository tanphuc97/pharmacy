using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace Pharmacy.Models
{
    public partial class JobApplication
    {
   
        public int JobId { get; set; }
        public DateTime? ApplyDate { get; set; }
        public int CandidateId { get; set; }
        public int? StatusId { get; set; }
        public DateTime? DateInterview { get; set; }

        public virtual Candidate Candidate { get; set; } = null!;
        public virtual Job Job { get; set; } = null!;
        public virtual JobApplicationStatus? Status { get; set; }
    }
}

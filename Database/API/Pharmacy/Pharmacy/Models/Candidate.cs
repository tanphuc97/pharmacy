using System;
using System.Collections.Generic;

namespace Pharmacy.Models
{
    public partial class Candidate
    {
        public Candidate()
        {
            CandidateFileUploads = new HashSet<CandidateFileUpload>();
        }

        public int Id { get; set; }
        public string? Fullname { get; set; }
        public bool? Gender { get; set; }
        public DateTime? Dob { get; set; }
        public string? Address { get; set; }
        public string? Education { get; set; }
        public int? AccountId { get; set; }
        public bool? Status { get; set; }
        public string? Phone { get; set; }

        public virtual Account? Account { get; set; }
        public virtual ICollection<CandidateFileUpload> CandidateFileUploads { get; set; }
    }
}

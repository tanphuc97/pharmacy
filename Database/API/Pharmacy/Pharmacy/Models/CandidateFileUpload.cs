using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace Pharmacy.Models
{
    public partial class CandidateFileUpload
    {
       
        public int FileId { get; set; }
        public string? Category { get; set; }
        public int? Length { get; set; }
        public string? Url { get; set; }
        public int? CandidateId { get; set; }
        public string? Name { get; set; }

        public virtual Candidate? Candidate { get; set; }
    }
}

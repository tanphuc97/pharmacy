using System;
using System.Collections.Generic;

namespace Pharmacy.Models
{
    public partial class Product
    {
        public Product()
        {
            Feedbacks = new HashSet<Feedback>();
            ProductFileUploads = new HashSet<ProductFileUpload>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal? Price { get; set; }
        public string? Description { get; set; }
        public bool? Status { get; set; }
        public int? CategoryId { get; set; }
        public DateTime? Created { get; set; }

        public virtual Category? Category { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual ICollection<ProductFileUpload> ProductFileUploads { get; set; }
    }
}

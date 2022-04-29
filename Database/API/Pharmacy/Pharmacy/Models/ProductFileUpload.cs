using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Pharmacy.Models
{
    public partial class ProductFileUpload
    {
       
        public int FileId { get; set; }
        public string? Name { get; set; }
        public int? Length { get; set; }
        public string? Url { get; set; }
        public int? ProductId { get; set; }

        public virtual Product? Product { get; set; }
    }
}

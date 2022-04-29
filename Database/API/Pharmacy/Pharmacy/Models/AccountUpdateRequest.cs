namespace Pharmacy.Models
{
    public class AccountUpdateRequest
    {
        public string Username { get; set; }
        public string? Fullname { get; set; }
        public bool? Gender { get; set; }
        public DateTime? Dob { get; set; }
    }
}

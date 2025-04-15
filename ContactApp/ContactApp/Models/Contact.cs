namespace ContactApp.Models
{
    // Enums that hold information about available categories and subcategories
    // For testing purpose
    public enum CategoryName
    {
        SŁUŻBOWY,
        PRYWATNY,
        INNY
    }
    public enum SubCategoryName
    {
        SZEF,
        KLIENT,
        WSPÓŁPRACOWNIK
    }
    /// <summary>
    /// Contact class 
    /// </summary>
    public class Contact
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public CategoryName Category { get; set; }
        public SubCategoryName? SubCategory { get; set; }
        public string? CustomSubCategory { get; set; }

    }
}

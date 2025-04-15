using ContactApp.Models;

namespace ContactApp.Data
{
    /// <summary>
    /// Class for testing purpose - creates some contacts during initialization of in-memory db
    /// </summary>
    public static class Seeder
    {
        public static void SeedContacts(AppDbContext context)
        {
            if (!context.Contacts.Any())
            {
                var contacts = new List<Contact>
                {
                    new Contact
                    {
                        FirstName = "Jacek",
                        LastName = "Soplica",
                        Email = "robak1812@example.com",
                        Phone = "755644533",
                        DateOfBirth = new DateOnly(1992, 6, 24),
                        Category = CategoryName.SŁUŻBOWY,
                        SubCategory = SubCategoryName.KLIENT
                    },
                    new Contact
                    {
                        FirstName = "Andrzej",
                        LastName = "Kmicic",
                        Email = "a.kmicic@poczta.pl",
                        Phone = "112358132",
                        DateOfBirth = new DateOnly(1985, 2, 10),
                        Category = CategoryName.INNY,
                        CustomSubCategory = "Dostawca"
                    },
                    new Contact
                    {
                        FirstName = "Izabela",
                        LastName = "Łęcka",
                        Email = "izalec00mail.com",
                        Phone = "918273645",
                        DateOfBirth = new DateOnly(1990, 9, 12),
                        Category = CategoryName.PRYWATNY
                    }
                };

                context.Contacts.AddRange(contacts);
                context.SaveChanges();
            }
        }
    }
}

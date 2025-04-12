using ContactApp.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ContactApp.DTOs
{
    public class DtoTools
    {
        public static ContactDto ContactToDto(Contact c)
        {
            return new ContactDto
            {
                Id = c.Id,
                FirstName = c.FirstName,
                LastName = c.LastName,
                Email = c.Email,
                Phone = c.Phone,
                DateOfBirth = c.DateOfBirth.ToString("yyyy-MM-dd"),
                Category = c.Category.ToString(),
                //SubCategory = c.SubCategory==SubCategoryName.NULL ? "" : c.SubCategory.ToString(),
                SubCategory = c.Category == CategoryName.SŁUŻBOWY
                        ? c.SubCategory?.ToString()
                        : c.Category == CategoryName.INNY
                            ? c.CustomSubCategory
                            : null
            };
        }

        public static Contact DtoToContact(ContactDto dto)
        {
            //return new Contact
            //{
            //    Id = dto.Id,
            //    FirstName = dto.FirstName,
            //    LastName = dto.LastName,
            //    Email = dto.Email,
            //    Phone = dto.Phone,
            //    DateOfBirth = DateOnly.ParseExact(dto.DateOfBirth, "yyyy-MM-dd"),
            //    Category = Enum.Parse<CategoryName>(dto.Category),
            //    SubCategory = dto.SubCategory == "" ? SubCategoryName.NULL : Enum.Parse<SubCategoryName>(dto.SubCategory),
            //};

            Contact newContact = new Contact()
            {
                Id = dto.Id,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Phone = dto.Phone,
                DateOfBirth = DateOnly.ParseExact(dto.DateOfBirth, "yyyy-MM-dd"),
                Category = Enum.Parse<CategoryName>(dto.Category)
            };

            // Parsing subcategories
            if (newContact.Category == CategoryName.SŁUŻBOWY && Enum.TryParse(dto.SubCategory, out SubCategoryName subCat))
            {
                newContact.SubCategory = subCat;
            }
            else if (newContact.Category == CategoryName.INNY)
            {
                newContact.CustomSubCategory = dto.SubCategory;
            }

            return newContact;
        }

        // Function used to map DTO data to existing object in order to Update it in context
        public static void UpdateContactFromDto(Contact contact, ContactDto dto)
        {
            contact.FirstName = dto.FirstName;
            contact.LastName = dto.LastName;
            contact.Email = dto.Email;
            contact.Phone = dto.Phone;
            contact.DateOfBirth = DateOnly.ParseExact(dto.DateOfBirth, "yyyy-MM-dd");
            contact.Category = Enum.Parse<CategoryName>(dto.Category);

            if (contact.Category == CategoryName.SŁUŻBOWY && Enum.TryParse(dto.SubCategory, out SubCategoryName subCat))
            {
                contact.SubCategory = subCat;
            }
            else if (contact.Category == CategoryName.INNY)
            {
                contact.CustomSubCategory = dto.SubCategory;
            }
        }
    }
    public class ContactDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string DateOfBirth { get; set; }
        public string Category { get; set; }
        public string? SubCategory { get; set; }
    }
}

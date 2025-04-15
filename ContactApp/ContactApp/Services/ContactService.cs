using ContactApp.Data;
using ContactApp.DTOs;
using ContactApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactApp.Services
{
    /// <summary>
    /// Service class implementing IContactService interface
    /// </summary>
    public class ContactService : IContactService
    {
        private readonly AppDbContext _context;

        // DI constructor
        public ContactService(AppDbContext context)
        {
            _context = context;
        }

        // Get all contacts from db
        public async Task<IEnumerable<ContactDto>> GetAll()
        {
            Contact[] contacts = await _context.Contacts.ToArrayAsync();
            List<ContactDto> contactDtos = new List<ContactDto>();

            foreach (var contact in contacts)
            {
                ContactDto newContactDto = DtoTools.ContactToDto(contact);
                contactDtos.Add(newContactDto);
            }

            return contactDtos;
        }

        // Get one contact with specified id
        public async Task<ContactDto> GetById(int id)
        {
            Contact? contact = await _context.Contacts.FirstOrDefaultAsync(c => c.Id == id);

            if (contact == null) return null;

            return DtoTools.ContactToDto(contact);
        }

        // Create new entity with DTO
        public async Task<ContactDto> Create(ContactDto data)
        {
            if (await _context.Contacts.AnyAsync(c => c.Email == data.Email))
            {
                throw new ArgumentException("Contact with such email already exists");
            }
            if (!Enum.IsDefined(typeof(CategoryName), data.Category))
            {
                throw new ArgumentException("Wrong category specified");
            }

            Contact newContact = DtoTools.DtoToContact(data);

            // Add to db
            _context.Contacts.Add(newContact);
            await _context.SaveChangesAsync();

            return data;
        }
        
        // Update existing contact with new data
        public async Task<ContactDto> Update(int id, ContactDto data)
        {
            Contact? contact = await _context.Contacts.FirstOrDefaultAsync(c => c.Id == id);

            if (contact == null) return null;

            if (await _context.Contacts.AnyAsync(c => c.Email == data.Email && c.Id != id))
            {
                throw new ArgumentException("Contact with such email already exists");
            }

            DtoTools.UpdateContactFromDto(contact, data);

            _context.Contacts.Update(contact);
            await _context.SaveChangesAsync();

            return data;
        }

        // Delete contact by id
        public async Task<bool> Delete(int id)
        {
            Contact? contact = await _context.Contacts.FirstOrDefaultAsync(c => c.Id == id);

            if (contact == null) return false;

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}

using ContactApp.DTOs;

namespace ContactApp.Services
{
    /// <summary>
    /// Interface of service that manages operations on data
    /// </summary>
    public interface IContactService
    {
        Task<IEnumerable<ContactDto>> GetAll();
        Task<ContactDto> GetById(int id);
        Task<ContactDto> Create(ContactDto data);
        Task<ContactDto> Update(int id, ContactDto data);
        Task<bool> Delete(int id);
    }
}

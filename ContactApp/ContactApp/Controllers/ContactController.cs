using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ContactApp.Models;
using ContactApp.Data;
using ContactApp.Services;
using ContactApp.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace ContactApp.Controllers
{
    /// <summary>
    /// Controller class which manages basic API requests 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;

        // DI constructor
        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _contactService.GetAll());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            ContactDto dto = await _contactService.GetById(id);
            return dto==null ? NotFound() : Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ContactDto data)
        {
            try
            {
                return Ok(await _contactService.Create(data));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);  
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, ContactDto dto)
        {
            ContactDto? result = null;
            try
            {
                result = await _contactService.Update(id, dto);
            }catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            return result==null ? NotFound() : Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool result = await _contactService.Delete(id);
            return result ? Ok("Contact deleted successfully") : NotFound();
        }
    }
}

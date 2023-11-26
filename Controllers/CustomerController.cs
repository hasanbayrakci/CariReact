using CariReact.Data;
using CariReact.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CariReact.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ILogger<CustomerController> _logger;
        private readonly ApplicationDbContext _db;

        public CustomerController(ApplicationDbContext db, ILogger<CustomerController> logger)
        {
            _db = db;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var customer = _db.Customer;
            return Ok(customer.ToArray());
        }

        [HttpGet("GetCustomer")]
        public ActionResult<IEnumerable<string>> GetCustomer()
        {
            return new string[] { "Value1", "Value2" };
        }

    }
}

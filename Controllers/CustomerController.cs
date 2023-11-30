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
            var customer = _db.Customer.Take(10).OrderByDescending(x => x.Id);
            return Ok(customer.ToArray());
        }

        [HttpPost("Create")]
        public IActionResult Create([FromBody] Customer customer)
        {
            _db.Customer.Add(customer);
            _db.SaveChanges();
            return Ok("Başarılı");
        }

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var customer = _db.Customer.Find(id);
            if (customer != null)
            {
                _db.Customer.Remove(customer);
                _db.SaveChanges();
                return Ok("Başarılı");
            }
            return BadRequest();
        }

        [HttpPost("Edit/{id}")]
        public IActionResult Edit(int id, [FromBody] Customer customer)
        {
            try
            {
                customer.Id = id;
                _db.Customer.Update(customer);
                _db.SaveChanges();
                return Ok("Başarılı");
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("Detail/{id}")]
        public IActionResult Detail(int id)
        {
            var customer = _db.Customer.Find(id);
            return Ok(customer);
        }

        [HttpGet("Hasan")]
        public IActionResult Hasan()
        {
            return Ok("dfsdf");
        }

    }
}

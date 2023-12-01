using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CariReact.Data;
using CariReact.Models;

namespace CariReact.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CariHareketController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CariHareketController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var cariHareket = from CariHareket in _context.CariHareket
                              join Customer in _context.Customer
                                  on CariHareket.CustomerId equals Customer.Id into grouping
                              from Customer in grouping.DefaultIfEmpty()
                              select new
                              {
                                  Id = CariHareket.Id,
                                  Unvan = Customer.Unvan,
                                  IslemTuru = CariHareket.IslemTuru == 1 ? "Borç Fişi" :
                                              CariHareket.IslemTuru == 2 ? "Alacak Fişi" :
                                              CariHareket.IslemTuru.ToString(),
                                  Tutar = CariHareket.Tutar.ToString("N2"),
                                  Tarih = CariHareket.Tarih.ToString("dd.MM.yyyy")
                              };
            return Ok(cariHareket.ToArray());
        }

        [HttpGet("GetHareket/{id}")]
        public IActionResult GetHareket(int id)
        {
            var cariHareket = from CariHareket in _context.CariHareket
                              where CariHareket.CustomerId == id
                              select new
                              {
                                  Id = CariHareket.Id,
                                  IslemTuru = CariHareket.IslemTuru == 1 ? "Borç Fişi" :
                                              CariHareket.IslemTuru == 2 ? "Alacak Fişi" :
                                              CariHareket.IslemTuru.ToString(),
                                  Tutar = CariHareket.Tutar.ToString("N2"),
                                  Tarih = CariHareket.Tarih.ToString("dd.MM.yyyy")
                              };
            return Ok(cariHareket.ToArray());
        }

        [HttpPost("Create/{id}")]
        public IActionResult Create(int id, [FromBody] CariHareket cariHareket)
        {
            cariHareket.CustomerId = id;
            _context.CariHareket.Add(cariHareket);
            _context.SaveChanges();
            return Ok("Başarılı");
        }

        [HttpGet("Detail/{id}")]
        public IActionResult Detail(int id)
        {
            var cariHareket = _context.CariHareket.Find(id);
            return Ok(cariHareket);
        }

        [HttpPost("Edit/{id}")]
        public IActionResult Edit(int id, [FromBody] CariHareket cariHareket)
        {
            try
            {
                cariHareket.Id = id;
                _context.Update(cariHareket);
                _context.SaveChanges();
                return Ok("Başarılı");
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var cariHareket = _context.CariHareket.Find(id);
            if (cariHareket != null)
            {
                _context.CariHareket.Remove(cariHareket);
                _context.SaveChanges();
                return Ok("Başarılı");
            }
            return BadRequest();
        }

        [HttpGet("GetCariBakiye/{id}")]
        public IActionResult GetCariBakiye(int id)
        {
            var giris = _context.CariHareket.Where(x => x.CustomerId == id && x.IslemTuru == 1).Sum(x => x.Tutar);
            var cikis = _context.CariHareket.Where(x => x.CustomerId == id && x.IslemTuru == 2).Sum(x => x.Tutar);

            return Ok(giris-cikis);
        }

    }
}

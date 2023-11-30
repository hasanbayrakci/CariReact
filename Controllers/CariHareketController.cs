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

    }
}

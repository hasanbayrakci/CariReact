using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CariReact.Models
{
    public class CariHareket
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int IslemTuru { get; set; } //1:Borç Fişi, 2:Alacak Fişi
        public decimal Tutar { get; set; }
        public DateTime Tarih { get; set; } = DateTime.Now;
    }
}

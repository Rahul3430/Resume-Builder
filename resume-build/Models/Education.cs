using System.ComponentModel.DataAnnotations;

namespace ResumeBuilder.Models
{
    public class Education
    {
        public int Id { get; set; }

        [Required]
        public string Institution { get; set; }

        [Required]
        public string Degree { get; set; }

        public string Field { get; set; }

        [Required]
        public string Graduation { get; set; }

        public int ResumeId { get; set; }
    }
}
using System;
using System.ComponentModel.DataAnnotations;

namespace ResumeBuilder.Models
{
    public class Experience
    {
        public int Id { get; set; }

        [Required]
        public string Company { get; set; }

        [Required]
        public string Position { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string Responsibilities { get; set; }

        public int ResumeId { get; set; }
    }
}
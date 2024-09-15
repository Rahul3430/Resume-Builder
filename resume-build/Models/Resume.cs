using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ResumeBuilder.Models
{
    public class Resume
    {
        public int Id { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string Phone { get; set; }

        public string Summary { get; set; }
        public List<Education> Education { get; set; }
        public List<Experience> Experience { get; set; }
        public string Skills { get; set; }
    }
}
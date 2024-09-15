using Microsoft.AspNetCore.Mvc;
using ResumeBuilder.Models;
using System.Diagnostics;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using resume_build.Models;

namespace ResumeBuilder.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly string _connectionString;

        public HomeController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public IActionResult Index()
        {
            return View();  // Default action for Home page
        }

        public IActionResult About()
        {
            return View();  // View for the About page
        }

        public IActionResult Contact()
        {
            return View();  // View for the Contact page
        }

        public IActionResult ResumeBuild()
        {
            return View();  // View for the Resume Build page
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public IActionResult SaveResume([FromBody] Resume resume)
        {
            try
            {
                if (resume == null)
                {
                    return BadRequest("Invalid resume data");
                }

                using (MySqlConnection conn = new MySqlConnection(_connectionString))
                {
                    conn.Open();

                    // Insert resume data
                    string sql = @"INSERT INTO Resumes (FullName, Email, Phone, Summary, Skills) 
                                   VALUES (@FullName, @Email, @Phone, @Summary, @Skills);
                                   SELECT LAST_INSERT_ID();";
                    using (MySqlCommand cmd = new MySqlCommand(sql, conn))
                    {
                        cmd.Parameters.AddWithValue("@FullName", resume.FullName);
                        cmd.Parameters.AddWithValue("@Email", resume.Email);
                        cmd.Parameters.AddWithValue("@Phone", resume.Phone);
                        cmd.Parameters.AddWithValue("@Summary", resume.Summary);
                        cmd.Parameters.AddWithValue("@Skills", resume.Skills);

                        int resumeId = Convert.ToInt32(cmd.ExecuteScalar());

                        // Insert Education
                        foreach (var edu in resume.Education)
                        {
                            sql = @"INSERT INTO Education (ResumeId, Institution, Degree, Field, Graduation) 
                                    VALUES (@ResumeId, @Institution, @Degree, @Field, @Graduation)";
                            using (MySqlCommand eduCmd = new MySqlCommand(sql, conn))
                            {
                                eduCmd.Parameters.AddWithValue("@ResumeId", resumeId);
                                eduCmd.Parameters.AddWithValue("@Institution", edu.Institution);
                                eduCmd.Parameters.AddWithValue("@Degree", edu.Degree);
                                eduCmd.Parameters.AddWithValue("@Field", edu.Field);
                                eduCmd.Parameters.AddWithValue("@Graduation", edu.Graduation);
                                eduCmd.ExecuteNonQuery();
                            }
                        }

                        // Insert Experience
                        foreach (var exp in resume.Experience)
                        {
                            sql = @"INSERT INTO Experience (ResumeId, Company, Position, StartDate, EndDate, Responsibilities) 
                                    VALUES (@ResumeId, @Company, @Position, @StartDate, @EndDate, @Responsibilities)";
                            using (MySqlCommand expCmd = new MySqlCommand(sql, conn))
                            {
                                expCmd.Parameters.AddWithValue("@ResumeId", resumeId);
                                expCmd.Parameters.AddWithValue("@Company", exp.Company);
                                expCmd.Parameters.AddWithValue("@Position", exp.Position);
                                expCmd.Parameters.AddWithValue("@StartDate", exp.StartDate);
                                expCmd.Parameters.AddWithValue("@EndDate", exp.EndDate);
                                expCmd.Parameters.AddWithValue("@Responsibilities", exp.Responsibilities);
                                expCmd.ExecuteNonQuery();
                            }
                        }
                    }
                }

                return Json(new { success = true, message = "Resume saved successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving resume");
                return Json(new { success = false, message = "Error saving resume: " + ex.Message });
            }
        }
    }
}

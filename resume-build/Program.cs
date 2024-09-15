using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson();  // Adds support for JSON serialization with Newtonsoft.Json

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");  // Provides error handling for non-development environments
    app.UseHsts();  // Adds HTTP Strict Transport Security (HSTS) for enhanced security
}

app.UseHttpsRedirection();  // Redirects HTTP requests to HTTPS
app.UseStaticFiles();  // Serves static files from the wwwroot folder

app.UseRouting();  // Enables routing

app.UseAuthorization();  // Adds authorization middleware

// Map controller routes
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");  // Default route pattern

app.Run();  // Runs the application

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Database.efCore;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

builder.Services.AddDbContext<ApplicationDbContext>(opt => opt.UseInMemoryDatabase("JobDb"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

app.MapGet("/", () => "Hello World!");

app.Run();

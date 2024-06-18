using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Database.efCore;
using WebApi.Models.Entities;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(opt => opt.UseInMemoryDatabase("JobDb"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

app.MapGet("/", ([FromServices] ApplicationDbContext dbContext) =>
{
    var jobs = dbContext.Jobs.ToList();
    return jobs;
});

app.MapPost("/", ([FromBody] Job job, [FromServices] ApplicationDbContext dbContext) =>
{
    dbContext.Jobs.Add(job);
});

app.Run();

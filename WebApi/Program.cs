using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Database.efCore;
using WebApi.Models.Entities;
using NSwag.AspNetCore;
using WebApi.Models.DTOs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(opt => opt.UseInMemoryDatabase("JobDb"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "JobDb";
    config.Title = "JobDb v1";
    config.Version = "v1";
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "JobDb";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}

app.MapGet("/", ([FromServices] ApplicationDbContext dbContext) =>
{
    var jobs = dbContext.Jobs.ToList();
    return jobs;
});

app.MapPost("/", ([FromBody] JobCreateDTO dto, [FromServices] ApplicationDbContext dbContext) =>
{
    Job job = new Job() { TaskTitle = dto.JobTitle };

    dbContext.Jobs.Add(job);
    dbContext.SaveChanges();
});

app.Run();

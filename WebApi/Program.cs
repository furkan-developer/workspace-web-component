using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Database.efCore;
using WebApi.Models.Entities;
using NSwag.AspNetCore;
using WebApi.Models.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
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

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                      });
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

app.UseCors(MyAllowSpecificOrigins);

app.MapGet("/jobs/{stageName}", ([FromServices] ApplicationDbContext dbContext, [FromRoute] string stageName) =>
{
    var jobs = dbContext.Jobs.Where(job => job.StageName.Equals(stageName)).ToList();
    return Results.Ok(new { data = jobs, isSuccess = true });
});

app.MapPost("/jobs", ([FromBody] JobCreateDTO dto, [FromServices] ApplicationDbContext dbContext) =>
{
    Job job = new Job() { JobTitle = dto.JobTitle, StageName = dto.StageName };

    dbContext.Jobs.Add(job);
    dbContext.SaveChanges();

    return Results.Ok(new { data = job, isSuccess = true });
});

app.Run();

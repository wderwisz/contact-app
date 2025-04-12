using Microsoft.EntityFrameworkCore;
using ContactApp.Data;
using ContactApp.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Add in-memory database context
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("ContactDB"));

builder.Services.AddScoped<IContactService, ContactService>();

// CORS policy set
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        //policy.WithOrigins("http://localhost:3000")
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

//app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Use(async (context, next) =>
{
    Console.WriteLine($"[{context.Request.Method}] {context.Request.Path}");
    await next();
});


app.Run();

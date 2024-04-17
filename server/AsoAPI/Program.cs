using AsoApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using AsoApi.Services;
using Microsoft.Extensions.Options;
using AsoApi.Middlewares;

var builder = WebApplication.CreateBuilder(args);

var jwtConfig = builder.Configuration.GetSection("Jwt").Get<JwtConfig>();
var key = Encoding.ASCII.GetBytes(jwtConfig.SecretKey);


builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
    };
});



// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<Random>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});


builder.Services.Configure<JwtConfig>(builder.Configuration.GetSection("Jwt"));
builder.Services.AddSingleton<JwtService>(sp =>
{
    var jwtConfig = sp.GetRequiredService<IOptions<JwtConfig>>().Value;
    return new JwtService(jwtConfig.SecretKey);
});




builder.Services.AddDbContext<AsobdContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Cors");

app.UseCors("AllowAnyOrigin");


app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseSignOutMiddleware();

app.MapControllers();

app.Run();

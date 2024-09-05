using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using System.Text;
using WebAPI.Data;
using WebAPI.Data.Repo;
using WebAPI.Extensions;
using WebAPI.Helpers;
using WebAPI.Interfaces;
using WebAPI.Middlewares;
using WebAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<DataContext>(options => 
                                                options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddControllers().AddNewtonsoftJson();
builder.Services.AddCors();
builder.Services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

var secretkey = builder.Configuration.GetSection("AppSettings:Key").Value;
var key = new SymmetricSecurityKey(Encoding.UTF8
                                            .GetBytes(secretkey));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
        options =>
        {
            options.TokenValidationParameters =
                                        new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                                        {
                                            ValidateIssuerSigningKey = true,
                                            ValidateIssuer = false,
                                            ValidateAudience = false,
                                            IssuerSigningKey = key
                                        };
        }
    );

//builder.Services.AddScoped<IUserRepository, UserRepository>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}
//else
//{
//    app.UseExceptionHandler(
//        options =>
//            {
//                options.Run(
//                        async context =>
//                        {
//                            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
//                            var ex = context.Features.Get<IExceptionHandlerFeature>();
//                            if(ex != null)
//                            {
//                                await context.Response.WriteAsync(ex.Error.Message);
//                            }
//                        }
//                    );
//            }
//        );
//}

app.ConfigureExceptonHandler(app.Environment);

app.UseCors(m => m.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());



app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

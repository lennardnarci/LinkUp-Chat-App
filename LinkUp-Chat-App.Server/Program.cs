using LinkUp_Chat_App.Server.Data;
using LinkUp_Chat_App.Server.Data.Interfaces;
using LinkUp_Chat_App.Server.Data.Repos;
using LinkUp_Chat_App.Server.Hubs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

// JWT Secret Key
var key = Encoding.ASCII.GetBytes("JpzrGYGi!9iO@7Iwp59R&jx21MyGNcA$"); //Change this key as it's uploaded to github

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<UsersContext>(
    options => options.UseSqlServer(@"Data Source=.;Initial Catalog=LinkUpDB;Integrated Security=True;Encrypt=True;TrustServerCertificate=True;")
);

//Add SignalR

builder.Services.AddSignalR();

// Add CORS Policy to allow conntections from the front-end

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllCorsPolicy", builder =>
    {
        builder
            .WithOrigins("https://localhost:5173")     // Allow requests from this origin
            .AllowAnyMethod()       // Allow any HTTP method (GET, POST, PUT, DELETE, etc.)
            .AllowAnyHeader()       // Allow any headers
            .AllowCredentials();    // Allow credentials (cookies, etc.) 
    });
});

// Add JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false; // Set to true in production
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        // Optionally add token expiration validation
        ValidateLifetime = true
    };

    //hanterar tokens för websocket connection
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var accessToken = context.Request.Query["access_token"];
            var path = context.HttpContext.Request.Path;

            if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/chatHub"))
            {
                context.Token = accessToken; // Set the token if path matches
            }
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddTransient<IUserRepo, UserRepo>();

var app = builder.Build();

app.UseCors("AllowAllCorsPolicy");

//app.UseDefaultFiles();
//app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.MapHub<ChatHub>("/chatHub");

app.Run();

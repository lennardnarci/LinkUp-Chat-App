using LinkUp_Chat_App.Server.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSignalR();

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

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.MapHub<ChatHub>("/chatHub");

app.Run();

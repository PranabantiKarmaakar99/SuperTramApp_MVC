

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using SuperTramApp.Data.Models.Repository;
using SuperTramApp.Services.IServices;
using SuperTramApp.Services.Services;
using System.Security.Claims;
using SuperTramApp.Data.Models.Domain;
using System.Text.Json.Serialization;
using SuperTramApp.WebApi.Hubs;
using Newtonsoft.Json;




var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("SuperTramAppContext") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
//connecting to SqlServer
builder.Services.AddDbContext<SuperTramAppContext>(options =>
    options.UseSqlServer(connectionString));


builder.Services.AddControllers();
builder.Services.AddSignalR();

builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
        options.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver();
    });






// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000") // React app's address
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials();
        });
});

builder.Services.AddSingleton<IDictionary<string, UserConnection>>(opts => new Dictionary<string, UserConnection>());


//creating API endpoints
builder.Services.AddIdentityCore<User>()
    .AddEntityFrameworkStores<SuperTramAppContext>()
    .AddApiEndpoints();
//builder.Services.AddIdentity<User, IdentityRole>();

//AddAuthentication
builder.Services.AddAuthentication().AddBearerToken(IdentityConstants.BearerScheme);

builder.Services.AddAuthorizationBuilder();

//Registering Sessions
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(10);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;


});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen( c=>
//{
//    c.AddSecurityDefinition("bearerAuth", new OpenApiSecurityScheme
//    {
//        Type = SecuritySchemeType.Http,
//        Scheme = "Bearer"

//    });

//    c.AddSecurityRequirement(new OpenApiSecurityRequirement
//    {
//        {
//           new OpenApiSecurityScheme
//           {
//               Reference = new OpenApiReference{ Type = ReferenceType.SecurityScheme, Id = "bearerAuth" }
//        },[]
//    } });



//}
    
    
    
//    );

builder.Services.AddSwaggerGen();
builder.Services.AddScoped<TicketService>();
builder.Services.AddScoped<ITicketService, TicketService>();
builder.Services.AddSingleton<EmailService>();
builder.Services.AddScoped<JourneyPlanner>();
builder.Services.AddScoped<TramStopsService>();
builder.Services.AddScoped<FavouriteRoutesService>();
builder.Services.AddScoped<ITramStopsService, TramStopsService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseSession();

app.UseAuthentication();
app.UseAuthorization();



app.MapControllers();
 app.MapIdentityApi<User>();

app.UseCors("AllowAllOrigins");


app.MapGet("/test",(ClaimsPrincipal user) => $"Hello{user.Identity!.Name}").RequireAuthorization();
app.MapGet("/pingauth",(ClaimsPrincipal User) =>
{
    var email = User.FindFirstValue(ClaimTypes.Email);
    return Results.Json(new{Email=email});
}).RequireAuthorization();
app.MapGet("/user", (ClaimsPrincipal user) =>
{
    var Name = user.Identity.Name;

    //var roles = user.Claims
    //                .Where(c => c.Type == ClaimTypes.Role)
    //                .Select(c => c.Value)
    //                .ToList();


    return Results.Ok(Name);
})
    .RequireAuthorization();


app.MapHub<ChatHub>("/chatHub");

app.UseCors("AllowReactApp");

app.UseSession();


app.Run();

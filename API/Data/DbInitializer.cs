using System.Security.Cryptography;
using System.Text;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DbInitializer
{
    public static void InitDb(WebApplication app)
    {
        using var score = app.Services.CreateScope();
        var context = score.ServiceProvider.GetRequiredService<DataContext>()
            ?? throw new InvalidOperationException("Failed to get DataContext service.");

        SeedData(context);
    }

    private static void SeedData(DataContext context)
    {
        context.Database.Migrate();
        
        if (context.Users.Any())
            return;

        using var hmac = new HMACSHA512();
        
        var users = new List<AppUser>
        {
            new()
            {
                UserName = "bob",
                PasswordHash = hmac.ComputeHash(Encoding.UTF32.GetBytes("Pass123$")),
                PasswordSalt = hmac.Key
            },
            new()
            {
                UserName = "jane",
                PasswordHash = hmac.ComputeHash(Encoding.UTF32.GetBytes("Pass123$")),
                PasswordSalt = hmac.Key
            },
        };
        
        context.Users.AddRange(users);
        context.SaveChanges();
    }
}
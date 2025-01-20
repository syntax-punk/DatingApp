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

        var users = new List<AppUser>
        {
            new()
            {
                UserName = "bob"
            },
            new()
            {
                UserName = "jane"
            },
        };
        
        context.Users.AddRange(users);
        context.SaveChanges();
    }
}
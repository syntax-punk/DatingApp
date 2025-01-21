using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController(DataContext context) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<AppUser>> Register(string username, string password)
    {
        using var hmac = new HMACSHA512();
        var user = new AppUser
        {
            UserName = username,
            PasswordHash = hmac.ComputeHash(Encoding.UTF32.GetBytes(password)),
            PasswordSalt = hmac.Key
        };

        context.Users.Add(user);
        var result = await context.SaveChangesAsync() > 0;
        
        if (!result) return BadRequest("Failed to register user.");
        
        return user;
    }
}
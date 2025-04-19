using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context, ITokenService tokenService, IMapper mapper) : BaseApiController
{
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Username))
            return BadRequest("Username is taken.");
        
        using var hmac = new HMACSHA512();
        var user = mapper.Map<AppUser>(registerDto);
        
        user.UserName = registerDto.Username.ToLower();
        user.PasswordHash = hmac.ComputeHash(Encoding.UTF32.GetBytes(registerDto.Password));
        user.PasswordSalt = hmac.Key;
        
        context.Users.Add(user);
        var result = await context.SaveChangesAsync() > 0;
        
        if (!result) return BadRequest("Failed to register user.");
        
        var userDto = new UserDto
        {
            Username = registerDto.Username,
            Token = tokenService.CreateToken(user),
            KnownAs = user.KnownAs,
        };
        
        return userDto;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await context.Users
            .FirstOrDefaultAsync(u => u.UserName == loginDto.Username.ToLower());
        
        if (user == null) return Unauthorized("Invalid username.");

        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF32.GetBytes(loginDto.Password));
        
        if (computedHash.Where((t, i) => t != user.PasswordHash[i]).Any())
        {
            return Unauthorized("Invalid password.");
        }
        
        var userDto = new UserDto
        {
            Username = user.UserName,
            KnownAs = user.KnownAs,
            Token = tokenService.CreateToken(user),
            PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain)?.Url,
        };
        
        return userDto ;
    }
    
    private async Task<bool> UserExists(string username)
    {
        return await context.Users.AnyAsync(u => u.UserName.ToLower() == username.ToLower());
    }
}
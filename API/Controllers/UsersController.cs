using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class UsersController(IUserRepository userRepository, IMapper mapper) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<MemberDto>>> GetUsers()
    {
        var users = await userRepository.GetUsersAsync();
        var usersResult = mapper.Map<IEnumerable<MemberDto>>(users);
        
        return Ok(usersResult);
    }
    
        [HttpGet("{username}")]
    public async Task<ActionResult<MemberDto>> GetUser(string username)
    {
        var user = await userRepository.GetUserByUsernameAsync(username);
        if (user == null) return NotFound("We could not find the user you are looking for.");
        var userResult = mapper.Map<MemberDto>(user);
        
        return userResult;
    }
}
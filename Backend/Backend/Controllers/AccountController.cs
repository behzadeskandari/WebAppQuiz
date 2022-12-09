﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    public class Credentials
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }




        [HttpPost]
        public async Task<IActionResult> Register([FromBody] Credentials credentials)
        {

            var user = new IdentityUser
            {
                UserName = credentials.Email,
                Email = credentials.Email,
            };

            var result = await _userManager.CreateAsync(user, credentials.Password);
            if (!result.Succeeded) return BadRequest(result.Errors);

            await _signInManager.SignInAsync(user, isPersistent: false);

            var claims = new Claim[] {

                    new Claim(JwtRegisteredClaimNames.Sub,user.Id)
            };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is spimple Secret Phrase"));

            var signingCredentials = new SigningCredentials(signingKey,SecurityAlgorithms.HmacSha256);


            var jwt = new JwtSecurityToken(signingCredentials: signingCredentials,claims: claims);

            return Ok(new JwtSecurityTokenHandler().WriteToken(jwt));


        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Credentials credentials)
        {
            var result = await _signInManager.PasswordSignInAsync(credentials.Email, credentials.Password,false,false);

            if (!result.Succeeded)
            {
                return BadRequest(result);
            }

            
            var user = await _userManager.FindByEmailAsync(credentials.Email);


            return Ok(CreateToken(user));

        }


        string CreateToken(IdentityUser user)
        {
            var claims = new Claim[] {

                    new Claim(JwtRegisteredClaimNames.Sub,user.Id)
            };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is spimple Secret Phrase"));

            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);


            var jwt = new JwtSecurityToken(signingCredentials: signingCredentials, claims: claims);

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}

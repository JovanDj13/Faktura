using FAKTURA.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FAKTURA.Controllers
{
    [Produces("application/json")]
    [Route("api/token")]
    public class TokenContoller : Controller
    {
        private bool ISValidUserAndPasswordCombination(string username, string password)
        {
            return !string.IsNullOrEmpty(username) && username == password;
        }

        private string GenerateToken(string username)
        {
            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(JwtRegisteredClaimNames.Nbf, new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds().ToString()),
                new Claim(JwtRegisteredClaimNames.Exp, new DateTimeOffset(DateTime.Now.AddDays(1)).ToUnixTimeSeconds().ToString())
            };

            var token = new JwtSecurityToken(
                new JwtHeader(new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes("s_e_c_u_r_i_t_y---k_e_y")),
                    SecurityAlgorithms.HmacSha256)),
                new JwtPayload(claims));
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginViewModel loginViewModel)
        {
            if ((loginViewModel.UserName == "admin") && (loginViewModel.Password == "admin"))
            {
                return new ObjectResult((GenerateToken(loginViewModel.UserName)));
                
            }
            else
            {
                return BadRequest();
            }
        }
    }
}

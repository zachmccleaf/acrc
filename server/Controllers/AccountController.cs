using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using server.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace server.Controllers
{
  [Route("api/[controller]")]
  public class AccountController : Controller
  {
    [HttpGet("login")]
    public IActionResult Login(string returnUrl = "/")
    {
      return Challenge(new AuthenticationProperties() { RedirectUri = returnUrl });
    }

    [HttpGet("user")]
    public IActionResult GetUserAccountInfo()
    {
      if (!User.Identity.IsAuthenticated)
      {
        return NotFound();
      }
      var id   = User.FindFirst(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
      var name = User.FindFirst(c => c.Type == ClaimTypes.Name)?.Value;
      var dto  = new UserDTO(id, name);

      return Ok(dto);
    }
  }
}

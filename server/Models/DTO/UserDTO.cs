using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.DTO
{
  public class UserDTO
  {
    public string UserID;
    public string UserName;

    public UserDTO(
      string userId,
      string userName
      )
    {
      UserID   = userId;
      UserName = userName;
    }
  }
}

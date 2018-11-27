using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    public class StravaDataController : Controller
    {

        [HttpGet("[action]")]
        public IEnumerable<StravaData> WeatherForecasts(int startDateIndex)
        {
            {
                Name = "Steve",
                Age = 22,
                MilesThisWeek = 66,
            });
        }

        public class StravaData
        {
            public string Name { get; set; }
            public int Age { get; set; }
            public string MilesThisWeek { get; set; }
        }
    }
}

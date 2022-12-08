using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    //[Produces("application/json")]
    [Route("api/Questions")]
    public class QuestionsController : ControllerBase
    {
        [HttpPost]
        public void Post([FromBody]Question question)
        {


        }
    }
}

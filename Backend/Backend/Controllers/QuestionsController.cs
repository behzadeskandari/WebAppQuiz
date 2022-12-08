using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    //[Produces("application/json")]
    [Route("api/Questions")]
    public class QuestionsController : ControllerBase
    {
        private readonly QuizContext _quizContext;

        public QuestionsController(QuizContext quizContext)
        {
            _quizContext = quizContext;
        }



        [HttpGet]
        public IEnumerable<Question> Get()
        {
            //return new Question[]
            //{
            //    new Question() { Text = "Hello Behzad" },
            //    new Question() { Text = "AwesomeDay Isn't ??" },
            //};
            return  _quizContext.Questions;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Question question)
        {
            if (question != null)
            {
                _quizContext.Questions.Add(question);

                await _quizContext.SaveChangesAsync();

                return Ok(question);
            }
            
            return NotFound(question);

        }


        [HttpPut]
        public async Task<IActionResult> Put(int id,[FromBody]Question questionData)
        {
            //var question = await _quizContext.Questions.SingleOrDefaultAsync(q => q.Id == id);
            if (id != questionData.Id)
            {
                return BadRequest();
            }

            _quizContext.Entry(questionData).State = EntityState.Modified;

            await _quizContext.SaveChangesAsync();

            return Ok(questionData);
        }

    }
}

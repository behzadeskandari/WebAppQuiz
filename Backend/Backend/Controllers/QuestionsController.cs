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
    [Route("api/[controller]")]
    [ApiController]
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

        [HttpGet("{quizId}")]
        public IEnumerable<Question> Get([FromRoute] int quizId)
        {
            return _quizContext.Questions.Where(q => q.QuizId == quizId);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Question question)
        {
            var quiz = _quizContext.Quizzes.SingleOrDefault(q => q.Id == question.Id);
            
            if (quiz == null) return NotFound();


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

using Microsoft.AspNetCore.Mvc;
using System;
using BabsScoreDatabase.Models.Database;
using BabsScoreDatabase.Services;

namespace BabsScoreDatabase.Controllers
{
    [ApiController]
    [Route("/scoresets")]
    public class ScoreSetController : ControllerBase
    {
        private readonly IScoreSetService _scoreSets;

        public ScoreSetController
        (
            IScoreSetService scoreSet
        )
        {
            _scoreSets = scoreSet;
        }
        
        [HttpGet("{scoreSetId}")]
        public ActionResult<ScoreSet> GetScoreSetById([FromRoute] int scoreSetId)
        {
            try
            {
                var scoreSet = _scoreSets.GetScoreSetById(scoreSetId);
                return scoreSet;
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }
    }
}

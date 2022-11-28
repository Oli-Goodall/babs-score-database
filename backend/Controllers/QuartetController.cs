using Microsoft.AspNetCore.Mvc;
using System;
using BabsScoreDatabase.Models.Database;
using BabsScoreDatabase.Services;
using BabsScoreDatabase.Models.Response;

namespace BabsScoreDatabase.Controllers
{
    [ApiController]
    [Route("/quartets")]
    public class QuartetController : ControllerBase
    {
        private readonly IQuartetService _quartets;
        private readonly IScoreSetService _scoreSets;

        public QuartetController
        (
            IQuartetService quartets,
            IScoreSetService scoreSets
        )
        {
            _quartets = quartets;
            _scoreSets = scoreSets;
        }
        
        [HttpGet("{quartetId}")]
        public ActionResult<ListResponse<ScoreSet>> GetScoreSetsByQuartetId([FromRoute] int quartetId)
        {
            try
            {
                var scoreSet = _scoreSets.GetScoreSetsByQuartetId(quartetId);
                return new ListResponse<ScoreSet>(scoreSet);
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }
    }
}

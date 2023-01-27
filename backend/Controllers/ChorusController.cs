using Microsoft.AspNetCore.Mvc;
using System;
using BabsScoreDatabase.Models.Database;
using BabsScoreDatabase.Services;
using BabsScoreDatabase.Models.Response;

namespace BabsScoreDatabase.Controllers
{
    [ApiController]
    [Route("/choruses")]
    public class ChorusController : ControllerBase
    {
        private readonly IChorusService _choruses;
        private readonly IScoreSetService _scoreSets;

        public ChorusController
        (
            IChorusService choruses,
            IScoreSetService scoreSets
        )
        {
            _choruses = choruses;
            _scoreSets = scoreSets;
        }
        
        [HttpGet("{chorusId}")]
        public ActionResult<ListResponse<ScoreSet>> GetScoreSetsByQuartetId([FromRoute] int chorusId)
        {
            try
            {
                var scoreSet = _scoreSets.GetScoreSetsByChorusId(chorusId);
                return new ListResponse<ScoreSet>(scoreSet);
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }
        [HttpGet("search/{query}")]
        public ActionResult<ListResponse<Chorus>> GetChorusBySearchQuery([FromRoute] string query)
        {
            try
            {
                var chorus = _choruses.GetChorusBySearchQuery(query);
                return new ListResponse<Chorus>(chorus);
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }
    }
}

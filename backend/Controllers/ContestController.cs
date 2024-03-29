using Microsoft.AspNetCore.Mvc;
using System;
using BabsScoreDatabase.Models.Database;
using BabsScoreDatabase.Services;
using BabsScoreDatabase.Models.Response;

namespace BabsScoreDatabase.Controllers
{
    [ApiController]
    [Route("/contests")]
    public class ContestController : ControllerBase
    {
        private readonly IContestService _contests;
        private readonly IScoreSetService _scoreSets;

        public ContestController
        (
            IContestService contests,
            IScoreSetService scoreSets
        )
        {
            _contests = contests;
            _scoreSets = scoreSets;
        }

        [HttpGet]
        public ActionResult<ListResponse<Contest>> GetAllContests()
        {
            try
            {
                var contests = _contests.GetAllContests();
                return new ListResponse<Contest>(contests);
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }

        [HttpGet("quartets/contestList")]
        public ActionResult<ListResponse<Contest>> GetAllQuartetContests()
        {
            try
            {
                var contests = _contests.GetAllQuartetContests();
                return new ListResponse<Contest>(contests);
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }

        [HttpGet("choruses/contestList")]
        public ActionResult<ListResponse<Contest>> GetAllChorusContests()
        {
            try
            {
                var contests = _contests.GetAllChorusContests();
                return new ListResponse<Contest>(contests);
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }

        [HttpGet("{contestId}")]
        public ActionResult<ListResponse<ScoreSet>> GetScoreSetsByContestId([FromRoute] int contestId)
        {
            try
            {
                var scoreSet = _scoreSets.GetScoreSetsByContestId(contestId);
                return new ListResponse<ScoreSet>(scoreSet);
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }
                [HttpGet("search/{query}")]
        public ActionResult<ListResponse<Contest>> GetContestBySearchQuery([FromRoute] string query)
        {
            try
            {
                var contest = _contests.GetContestBySearchQuery(query);
                return new ListResponse<Contest>(contest);
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }
    }
}

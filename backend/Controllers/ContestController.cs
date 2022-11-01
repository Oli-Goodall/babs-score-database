using Microsoft.AspNetCore.Mvc;
using System;
using BabsScoreDatabase.Models.Database;
using BabsScoreDatabase.Services;

namespace BabsScoreDatabase.Controllers
{
    [ApiController]
    [Route("/contests")]
    public class ContestController : ControllerBase
    {
        private readonly IContestService _contests;

        public ContestController
        (
            IContestService contests
        )
        {
            _contests = contests;
        }
        
        [HttpGet("{contestId}")]
        public ActionResult<Contest> GetContestById([FromRoute] int contestId)
        {
            try
            {
                var contest = _contests.GetContestById(contestId);
                return contest;
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }
    }
}

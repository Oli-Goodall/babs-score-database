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

        public ContestController
        (
            IContestService contests
        )
        {
            _contests = contests;
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

        [HttpGet("{contestYear}")]
        public ActionResult<ListResponse<Contest>> GetContestsByYear([FromRoute] int contestYear)
        {
            try
            {
                var contests = _contests.GetContestsByYear(contestYear);
                return new ListResponse<Contest>(contests);
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }
    }
}

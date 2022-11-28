using Microsoft.AspNetCore.Mvc;
using System;
using BabsScoreDatabase.Models.Database;
using BabsScoreDatabase.Services;
using BabsScoreDatabase.Models.Response;

namespace BabsScoreDatabase.Controllers
{
    [ApiController]
    [Route("/songs")]
    public class SongController : ControllerBase
    {
        private readonly ISongService _songs;
        private readonly IScoreSetService _scoreSets;

        public SongController
        (
            ISongService songs,
            IScoreSetService scoreSets
        )
        {
            _songs = songs;
            _scoreSets = scoreSets;
        }
        
        [HttpGet("{songId}")]
        public ActionResult<ListResponse<ScoreSet>> GetScoreSetsBySongId([FromRoute] int songId)
        {
            try
            {
                var scoreSet = _scoreSets.GetScoreSetsBySongId(songId);
                return new ListResponse<ScoreSet>(scoreSet);
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }
    }
}

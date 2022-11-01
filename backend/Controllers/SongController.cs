using Microsoft.AspNetCore.Mvc;
using System;
using BabsScoreDatabase.Models.Database;
using BabsScoreDatabase.Services;

namespace BabsScoreDatabase.Controllers
{
    [ApiController]
    [Route("/songs")]
    public class SongController : ControllerBase
    {
        private readonly ISongService _songs;

        public SongController
        (
            ISongService songs
        )
        {
            _songs = songs;
        }
        
        [HttpGet("{songId}")]
        public ActionResult<Song> GetSongById([FromRoute] int songId)
        {
            try
            {
                var song = _songs.GetSongById(songId);
                return song;
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }
    }
}

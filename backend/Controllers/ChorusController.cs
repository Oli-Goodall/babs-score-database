using Microsoft.AspNetCore.Mvc;
using System;
using BabsScoreDatabase.Models.Database;
using BabsScoreDatabase.Services;

namespace BabsScoreDatabase.Controllers
{
    [ApiController]
    [Route("/choruses")]
    public class ChorusController : ControllerBase
    {
        private readonly IChorusService _choruses;

        public ChorusController
        (
            IChorusService choruses
        )
        {
            _choruses = choruses;
        }
        
        [HttpGet("{chorusId}")]
        public ActionResult<Chorus> GetChorusById([FromRoute] int chorusId)
        {
            try
            {
                var quartet = _choruses.GetChorusById(chorusId);
                return quartet;
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }
    }
}

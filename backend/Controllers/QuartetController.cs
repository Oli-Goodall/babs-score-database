using Microsoft.AspNetCore.Mvc;
using System;
using BabsScoreDatabase.Models.Database;
using BabsScoreDatabase.Services;

namespace BabsScoreDatabase.Controllers
{
    [ApiController]
    [Route("/quartets")]
    public class QuartetController : ControllerBase
    {
        private readonly IQuartetService _quartets;

        public QuartetController
        (
            IQuartetService quartets
        )
        {
            _quartets = quartets;
        }
        
        [HttpGet("{quartetId}")]
        public ActionResult<Quartet> GetQuartetById([FromRoute] int quartetId)
        {
            try
            {
                var quartet = _quartets.GetQuartetById(quartetId);
                return quartet;
            }
            catch (InvalidOperationException)
            {
                return NotFound();
            }
        }
    }
}

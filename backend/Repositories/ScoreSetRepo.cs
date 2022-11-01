using System.Linq;
using Microsoft.EntityFrameworkCore;
using BabsScoreDatabase.Models.Database;

namespace BabsScoreDatabase.Repositories
{
    public interface IScoreSetRepo
    {
        ScoreSet GetScoreSetById(int scoreSetId);
    }

    public class ScoreSetRepo : IScoreSetRepo
    {
        private readonly BABSScoresDbContext _context;

        public ScoreSetRepo(BABSScoresDbContext context)
        {
            _context = context;
        }

        public ScoreSet GetScoreSetById(int scoreSetId)
        {
            return _context.ScoreSet
                .Include(s => s.Mus)
                .Include(s => s.Perf)
                .Include(s => s.Sing)
                .Single(s => s.Id == scoreSetId);
        }
    }
}

using System.Linq;
using Microsoft.EntityFrameworkCore;
using BabsScoreDatabase.Models.Database;
using System.Collections.Generic;

namespace BabsScoreDatabase.Repositories
{
    public interface IScoreSetRepo
    {
        ScoreSet GetScoreSetById(int scoreSetId);
        IEnumerable<ScoreSet> GetScoreSetsByContestId(int contestId);
        IEnumerable<ScoreSet> GetScoreSetsByQuartetId(int quartetId);
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
        
        public IEnumerable<ScoreSet> GetScoreSetsByContestId(int contestId)
        {
            return _context.ScoreSet
                .Include(s => s.Song)
                .Include(s => s.Quartet)
                .Include(s => s.Chorus)
                .Include(s => s.Contest)
                .Where(s => s.Contest.Id == contestId)
                .OrderBy(s => s.Place);
        }

        public IEnumerable<ScoreSet> GetScoreSetsByQuartetId(int quartetId)
        {
            return _context.ScoreSet
                .Include(s => s.Song)
                .Include(s => s.Quartet)
                .Include(s => s.Chorus)
                .Include(s => s.Contest)
                .Where(s => s.Quartet.Id == quartetId)
                .OrderBy(s => s.Place);
        }
    }
}

using System.Linq;
using Microsoft.EntityFrameworkCore;
using BabsScoreDatabase.Models.Database;
using System.Collections.Generic;

namespace BabsScoreDatabase.Repositories
{
    public interface IContestRepo
    {
        Contest GetContestById(int contestId);
        IEnumerable<Contest> GetAllContests();
        IEnumerable<Contest> GetContestsByYear(int contestYear);
    }

    public class ContestRepo : IContestRepo
    {
        private readonly BABSScoresDbContext _context;

        public ContestRepo(BABSScoresDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Contest> GetAllContests()
        {
            return _context.Contest
                .Include(s => s.Year);
        }

        public Contest GetContestById(int contestId)
        {
            return _context.Contest
                .Single(s => s.Id == contestId);
        }

        public IEnumerable<Contest> GetContestsByYear(int contestYear)
        {
            return _context.Contest
                .Include(s => s.Name)
                .Include(s => s.ContestType)
                .Include(s => s.Id)
                .Where(s => s.Year.ContestYear == contestYear);
        }
    }
}

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
                .Include(s => s.Name);
        }

        public Contest GetContestById(int contestId)
        {
            return _context.Contest
                .Include(s => s.Name)
                .Single(s => s.Id == contestId);
        }
    }
}

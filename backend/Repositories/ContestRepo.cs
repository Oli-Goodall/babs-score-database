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
        IEnumerable<Contest> GetAllQuartetContests();
        IEnumerable<Contest> GetAllChorusContests();
        IEnumerable<Contest> GetContestBySearchQuery(string query);
        // IEnumerable<Contest> GetContestsByYear(int contestYear);
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

        public IEnumerable<Contest> GetAllQuartetContests()
        {
            return _context.Contest
                .Include(s => s.Year)
                .Where(s => s.ContestType == 1);
        }

        public IEnumerable<Contest> GetAllChorusContests()
        {
            return _context.Contest
                .Include(s => s.Year)
                .Where(s => s.ContestType == 2);
        }

        public Contest GetContestById(int contestId)
        {
            return _context.Contest
                .Single(s => s.Id == contestId);
        }

        public IEnumerable<Contest> GetContestBySearchQuery(string query)
        {
            return _context.Contest.ToList()
                .Where(s => s.Name.IndexOf(query, System.StringComparison.OrdinalIgnoreCase) > -1);
        }  

        // public IEnumerable<Contest> GetContestsByYear(int contestYear)
        // {
        //     return _context.Contest
        //         .Include(s => s.Name)
        //         .Include(s => s.ContestType)
        //         .Include(s => s.Id)
        //         .Where(s => s.Year.ContestYear == contestYear);
        // }
    }
}

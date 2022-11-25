using BabsScoreDatabase.Repositories;
using BabsScoreDatabase.Models.Database;
using System.Collections.Generic;

namespace BabsScoreDatabase.Services
{
    public interface IContestService
    {
        Contest GetContestById(int contestId);
        IEnumerable<Contest> GetAllContests();
        IEnumerable<Contest> GetAllQuartetContests();
        IEnumerable<Contest> GetAllChorusContests();
        // IEnumerable<Contest> GetContestsByYear(int contestYear);
    }

    public class ContestService : IContestService
    {
        private readonly IContestRepo _contest;

        public ContestService(IContestRepo contest)
        {
            _contest = contest;
        }

        public IEnumerable<Contest> GetAllContests()
        {
            return _contest.GetAllContests();
        }

        public IEnumerable<Contest> GetAllQuartetContests()
        {
            return _contest.GetAllQuartetContests();
        }

        public IEnumerable<Contest> GetAllChorusContests()
        {
            return _contest.GetAllChorusContests();
        }

        public Contest GetContestById(int contestId)
        {
            return _contest.GetContestById(contestId);
        }

        // public IEnumerable<Contest> GetContestsByYear(int contestYear)
        // {
        //     return _contest.GetContestsByYear(contestYear);
        // }
    }
}

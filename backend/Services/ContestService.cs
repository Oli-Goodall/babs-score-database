using BabsScoreDatabase.Repositories;
using BabsScoreDatabase.Models.Database;
using System.Collections.Generic;

namespace BabsScoreDatabase.Services
{
    public interface IContestService
    {
        Contest GetContestById(int contestId);
        IEnumerable<Contest> GetAllContests();
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

        public Contest GetContestById(int contestId)
        {
            return _contest.GetContestById(contestId);
        }
    }
}

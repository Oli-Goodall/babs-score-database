using BabsScoreDatabase.Repositories;
using BabsScoreDatabase.Models.Database;

namespace BabsScoreDatabase.Services
{
    public interface IContestService
    {
        Contest GetContestById(int contestId);
    }

    public class ContestService : IContestService
    {
        private readonly IContestRepo _contest;

        public ContestService(IContestRepo contest)
        {
            _contest = contest;
        }

        public Contest GetContestById(int contestId)
        {
            return _contest.GetContestById(contestId);
        }
    }
}

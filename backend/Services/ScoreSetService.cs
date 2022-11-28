using BabsScoreDatabase.Repositories;
using BabsScoreDatabase.Models.Database;
using System.Collections.Generic;

namespace BabsScoreDatabase.Services
{
    public interface IScoreSetService
    {
        ScoreSet GetScoreSetById(int scoreSetId);
        IEnumerable<ScoreSet> GetScoreSetsByContestId(int contestId);
        IEnumerable<ScoreSet> GetScoreSetsByQuartetId(int quartetId);
    }

    public class ScoreSetService : IScoreSetService
    {
        private readonly IScoreSetRepo _scoreSet;

        public ScoreSetService(IScoreSetRepo scoreSet)
        {
            _scoreSet = scoreSet;
        }

        public ScoreSet GetScoreSetById(int scoreSetId)
        {
            return _scoreSet.GetScoreSetById(scoreSetId);
        }

        public IEnumerable<ScoreSet> GetScoreSetsByContestId(int contestId)
        {
            return _scoreSet.GetScoreSetsByContestId(contestId);
        }
        public IEnumerable<ScoreSet> GetScoreSetsByQuartetId(int quartetId)
        {
            return _scoreSet.GetScoreSetsByQuartetId(quartetId);
        }
    }
}

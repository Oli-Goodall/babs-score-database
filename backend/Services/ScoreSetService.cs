using BabsScoreDatabase.Repositories;
using BabsScoreDatabase.Models.Database;

namespace BabsScoreDatabase.Services
{
    public interface IScoreSetService
    {
        ScoreSet GetScoreSetById(int scoreSetId);
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
    }
}

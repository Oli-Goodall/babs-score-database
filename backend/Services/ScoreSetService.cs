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
        IEnumerable<ScoreSet> GetScoreSetsByChorusId(int quartetId);
        IEnumerable<ScoreSet> GetScoreSetsBySongId(int songId);
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
        public IEnumerable<ScoreSet> GetScoreSetsByChorusId(int chorusId)
        {
            return _scoreSet.GetScoreSetsByChorusId(chorusId);
        }
        public IEnumerable<ScoreSet> GetScoreSetsBySongId(int songId)
        {
            return _scoreSet.GetScoreSetsBySongId(songId);
        }
    }
}

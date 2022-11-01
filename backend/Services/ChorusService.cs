using BabsScoreDatabase.Repositories;
using BabsScoreDatabase.Models.Database;

namespace BabsScoreDatabase.Services
{
    public interface IChorusService
    {
        Chorus GetChorusById(int chorusId);
    }

    public class ChorusService : IChorusService
    {
        private readonly IChorusRepo _chorus;

        public ChorusService(IChorusRepo chorus)
        {
            _chorus = chorus;
        }

        public Chorus GetChorusById(int chorusId)
        {
            return _chorus.GetChorusById(chorusId);
        }
    }
}

using BabsScoreDatabase.Repositories;
using BabsScoreDatabase.Models.Database;
using System.Collections.Generic;

namespace BabsScoreDatabase.Services
{
    public interface IChorusService
    {
        Chorus GetChorusById(int chorusId);
        IEnumerable<Chorus> GetChorusBySearchQuery(string query);
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
        
        public IEnumerable<Chorus> GetChorusBySearchQuery(string query)
        {
            return _chorus.GetChorusBySearchQuery(query);
        }
    }
}

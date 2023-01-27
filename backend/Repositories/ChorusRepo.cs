using System.Linq;
using Microsoft.EntityFrameworkCore;
using BabsScoreDatabase.Models.Database;
using System.Collections.Generic;

namespace BabsScoreDatabase.Repositories
{
    public interface IChorusRepo
    {
        Chorus GetChorusById(int chorusId);
        IEnumerable<Chorus> GetChorusBySearchQuery(string query);
    }

    public class ChorusRepo : IChorusRepo
    {
        private readonly BABSScoresDbContext _context;

        public ChorusRepo(BABSScoresDbContext context)
        {
            _context = context;
        }

        public Chorus GetChorusById(int chorusId)
        {
            return _context.Chorus
                .Include(s => s.Name)
                .Single(s => s.Id == chorusId);
        }
        public IEnumerable<Chorus> GetChorusBySearchQuery(string query)
        {
            return _context.Chorus.ToList()
                .Where(s => s.Name.IndexOf(query, System.StringComparison.OrdinalIgnoreCase) > -1);
        }  
    }
}

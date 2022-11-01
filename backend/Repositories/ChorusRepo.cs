using System.Linq;
using Microsoft.EntityFrameworkCore;
using BabsScoreDatabase.Models.Database;

namespace BabsScoreDatabase.Repositories
{
    public interface IChorusRepo
    {
        Chorus GetChorusById(int chorusId);
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
    }
}

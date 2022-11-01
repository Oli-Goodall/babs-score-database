using System.Linq;
using Microsoft.EntityFrameworkCore;
using BabsScoreDatabase.Models.Database;

namespace BabsScoreDatabase.Repositories
{
    public interface IQuartetRepo
    {
        Quartet GetQuartetById(int quartetId);
    }

    public class QuartetRepo : IQuartetRepo
    {
        private readonly BABSScoresDbContext _context;

        public QuartetRepo(BABSScoresDbContext context)
        {
            _context = context;
        }

        public Quartet GetQuartetById(int quartetId)
        {
            return _context.Quartet
                .Include(s => s.Name)
                .Single(s => s.Id == quartetId);
        }
    }
}

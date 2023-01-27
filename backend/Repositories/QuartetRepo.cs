using System.Linq;
using Microsoft.EntityFrameworkCore;
using BabsScoreDatabase.Models.Database;
using System.Collections.Generic;

namespace BabsScoreDatabase.Repositories
{
    public interface IQuartetRepo
    {
        Quartet GetQuartetById(int quartetId);
        IEnumerable<Quartet> GetQuartetBySearchQuery(string query);
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

        public IEnumerable<Quartet> GetQuartetBySearchQuery(string query)
        {
            return _context.Quartet.ToList()
                .Where(s => s.Name.IndexOf(query, System.StringComparison.OrdinalIgnoreCase) > -1);
        }    
    }
}

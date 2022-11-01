using System.Linq;
using Microsoft.EntityFrameworkCore;
using BabsScoreDatabase.Models.Database;

namespace BabsScoreDatabase.Repositories
{
    public interface ISongRepo
    {
        Song GetSongById(int songId);
    }

    public class SongRepo : ISongRepo
    {
        private readonly BABSScoresDbContext _context;

        public SongRepo(BABSScoresDbContext context)
        {
            _context = context;
        }

        public Song GetSongById(int songId)
        {
            return _context.Song
                .Include(s => s.Name)
                .Single(s => s.Id == songId);
        }
    }
}

using System.Linq;
using Microsoft.EntityFrameworkCore;
using BabsScoreDatabase.Models.Database;
using System.Collections.Generic;

namespace BabsScoreDatabase.Repositories
{
    public interface ISongRepo
    {
        Song GetSongById(int songId);
        IEnumerable<Song> GetSongBySearchQuery(string query);
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

        public IEnumerable<Song> GetSongBySearchQuery(string query)
        {
            return _context.Song.ToList()
                .Where(s => s.Name.IndexOf(query, System.StringComparison.OrdinalIgnoreCase) > -1);
        } 
    }
}

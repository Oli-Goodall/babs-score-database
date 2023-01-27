using BabsScoreDatabase.Repositories;
using BabsScoreDatabase.Models.Database;
using System.Collections.Generic;

namespace BabsScoreDatabase.Services
{
    public interface ISongService
    {
        Song GetSongById(int contestId);
        IEnumerable<Song> GetSongBySearchQuery(string query);
    }

    public class SongService : ISongService
    {
        private readonly ISongRepo _song;

        public SongService(ISongRepo song)
        {
            _song = song;
        }

        public Song GetSongById(int songId)
        {
            return _song.GetSongById(songId);
        }

        public IEnumerable<Song> GetSongBySearchQuery(string query)
        {
            return _song.GetSongBySearchQuery(query);
        }
    }
}

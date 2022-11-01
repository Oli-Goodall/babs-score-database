using BabsScoreDatabase.Repositories;
using BabsScoreDatabase.Models.Database;

namespace BabsScoreDatabase.Services
{
    public interface ISongService
    {
        Song GetSongById(int contestId);
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
    }
}

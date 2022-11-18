using System;

namespace BabsScoreDatabase.Models.Database
{
    public class ScoreSet
    {
        public int Id { get; set; }
        public int Mus { get; set; }
        public int Perf { get; set; }
        public int Sing { get; set; }
        public Quartet Quartet {get; set; }
        public Chorus Chorus { get; set; }
        public Song Song { get; set; }
        public Contest Contest { get; set; }
    }
}

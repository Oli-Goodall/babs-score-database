using System;

namespace BabsScoreDatabase.Models.Database
{
    public class Contest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ContestType { get; set; }
        public Year Year { get; set; }
        public int PanelSize { get; set; }
        public int TotalRounds { get; set; }
    }
}

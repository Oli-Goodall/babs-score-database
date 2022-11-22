using System;

namespace BabsScoreDatabase.Models.Database
{
    public class Contest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ContestType ContestType { get; set; }
        public Year Year { get; set; }
        public int PanelSize { get; set; }
    }
}

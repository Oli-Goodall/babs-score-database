using BabsScoreDatabase.Repositories;
using BabsScoreDatabase.Models.Database;
using System.Collections.Generic;

namespace BabsScoreDatabase.Services
{
    public interface IQuartetService
    {
        Quartet GetQuartetById(int quartetId);
        IEnumerable<Quartet> GetQuartetBySearchQuery(string query);
    }

    public class QuartetService : IQuartetService
    {
        private readonly IQuartetRepo _quartet;

        public QuartetService(IQuartetRepo quartet)
        {
            _quartet = quartet;
        }

        public Quartet GetQuartetById(int quartetId)
        {
            return _quartet.GetQuartetById(quartetId);
        }

        public IEnumerable<Quartet> GetQuartetBySearchQuery(string query)
        {
            return _quartet.GetQuartetBySearchQuery(query);
        }
    }
}

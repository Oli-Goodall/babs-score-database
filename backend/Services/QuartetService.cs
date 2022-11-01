using BabsScoreDatabase.Repositories;
using BabsScoreDatabase.Models.Database;

namespace BabsScoreDatabase.Services
{
    public interface IQuartetService
    {
        Quartet GetQuartetById(int quartetId);
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
    }
}

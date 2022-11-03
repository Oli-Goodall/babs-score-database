using System.Collections.Generic;

namespace BabsScoreDatabase.Models.Response
{
    public class ListResponse<T>
    {
        public IEnumerable<T> Items { get; }

        public ListResponse(IEnumerable<T> items)
        {
            Items = items;
        }
    }
}
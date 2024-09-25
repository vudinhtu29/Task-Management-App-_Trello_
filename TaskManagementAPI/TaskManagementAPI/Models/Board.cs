namespace TaskManagementAPI.Models
{
    public class Board
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int OwnerId { get; set; }
        public User Owner { get; set; }
        public ICollection<List> Lists { get; set; }
    }
}

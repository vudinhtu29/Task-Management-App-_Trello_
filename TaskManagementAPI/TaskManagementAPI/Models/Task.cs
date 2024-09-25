namespace TaskManagementAPI.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int ListId { get; set; }
        public List List { get; set; }
    }
}

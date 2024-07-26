namespace API.DTOs;

public class PhotoForApprovalDto
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public string? UserName { get; set; }
    public required bool IsApproved { get; set; }
}

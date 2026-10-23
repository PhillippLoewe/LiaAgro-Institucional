using Microsoft.AspNetCore.Mvc.RazorPages;
using LiaAgro.Institucional.Services;

namespace LiaAgro.Institucional.Pages;
public class IndexModel : PageModel
{
    public string Lang { get; private set; } = "pt";
    public void OnGet(string? lang) => Lang = I18n.Normalize(lang);
}

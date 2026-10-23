using System.Collections.Concurrent;
using System.Text.Json;

namespace LiaAgro.Institucional.Services;

public static class I18n
{
    public static readonly string[] Languages = ["pt", "en", "it", "es", "de", "fr"];
    private static readonly ConcurrentDictionary<string, Dictionary<string, string>> Cache = new();

    public static string Normalize(string? lang)
        => Languages.Contains(lang, StringComparer.OrdinalIgnoreCase) ? lang!.ToLowerInvariant() : "pt";

    private static Dictionary<string, string> For(string language)
    {
        language = Normalize(language);
        return Cache.GetOrAdd(language, code =>
        {
            var file = Path.Combine(AppContext.BaseDirectory, "Data", $"strings.{code}.json");
            if (!File.Exists(file)) return new Dictionary<string, string>();
            return JsonSerializer.Deserialize<Dictionary<string, string>>(File.ReadAllText(file))
                ?? new Dictionary<string, string>();
        });
    }

    public static string Text(string? language, string key)
    {
        var current = For(Normalize(language));
        if (current.TryGetValue(key, out var translation)) return translation;
        return For("pt").TryGetValue(key, out var fallback) ? fallback : key;
    }
}

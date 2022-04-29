using System;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Pharmacy.Converters
{
    public class DateConverter : JsonConverter<DateTime>
    {
        private string formatDate = "yyyy-MM-dd";

        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var s = reader.GetString();
            return DateTime.ParseExact(s, formatDate, CultureInfo.InvariantCulture);
        }

        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        {
            writer.WriteStringValue(value.ToString(formatDate));
        }
    }
}

using System.Collections.Generic;

namespace SuperTramApp.Data.Models.Domain.ExtendedClasses
{
    public class EmailRequest
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public List<Attachment> Attachments { get; set; }
    }

    public class Attachment
    {
        public byte[] Content { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }

        public string FilePath {  get; set; }

        public Attachment(byte[] content, string fileName, string contentType)
        {
            Content = content;
            FileName = fileName;
            ContentType = contentType;
        }
    }

    public class ReachableTerminus
    {
        public string TramLineName { get; set; }
        public string TramLineTerminus { get; set; }
    }
}

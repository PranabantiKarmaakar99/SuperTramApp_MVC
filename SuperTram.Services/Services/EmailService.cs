using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;
using SuperTramApp.Data.Models.Domain.ExtendedClasses;
using System.Threading.Tasks;

namespace SuperTramApp.Services.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string htmlBody, List<Attachment> attachments = null)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Your Company Name", _configuration["EmailSettings:FromEmail"]));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = subject;

            var bodyBuilder = new BodyBuilder { HtmlBody = htmlBody };

         

            message.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(_configuration["EmailSettings:SmtpServer"], int.Parse(_configuration["EmailSettings:SmtpPort"]), true);
                await client.AuthenticateAsync(_configuration["EmailSettings:SmtpUsername"], _configuration["EmailSettings:SmtpPassword"]);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }
    }

   
}

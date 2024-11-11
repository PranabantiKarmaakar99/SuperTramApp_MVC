using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Stripe;
using ZXing;
using ZXing.Common;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Threading.Tasks;
using SuperTramApp.Services.Services;
using System.Drawing.Imaging;
using System.Net.Mail;
using ZXing.QrCode;
using SuperTramApp.Data.Models.Domain.ExtendedClasses;
using Attachment = SuperTramApp.Data.Models.Domain.ExtendedClasses.Attachment;
using Microsoft.Extensions.Options;
using ZXing.Windows.Compatibility;




namespace SuperTramApp.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly EmailService _emailService;
        public EmailRequest EmailRequest;

        public PaymentsController(IConfiguration configuration, EmailService emailService)
        {
            _configuration = configuration;
            _emailService = emailService;
            StripeConfiguration.ApiKey = _configuration["Stripe:SecretKey"];
        }

    


        [HttpPost("create-payment-intent")]
        public async Task<IActionResult> CreatePaymentIntent([FromBody] CreatePaymentIntentRequest request)
        {
            try
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long)(request.Amount * 100),
                    Currency = "gbp",
                    PaymentMethodTypes = new List<string> { "card" },
                };

                var service = new PaymentIntentService();
                var paymentIntent = await service.CreateAsync(options);

                // Additional data to be sent back
                var response = new
                {
                    clientSecret = paymentIntent.ClientSecret,
                    amount = request.Amount,
                    currency = "gbp",
                    successMessage = "Payment intent created successfully"
                };

                return Ok(response);
            }
            catch (StripeException e)
            {
                return BadRequest(new { error = e.StripeError.Message });
            }
        }

        [HttpPost("complete-payment")]
        public async Task<IActionResult> CompletePayment([FromBody] CompletePaymentRequest request)
        {
            // Verify payment success (this example assumes a successful payment)
            if (request.PaymentStatus != "succeeded")
            {
                return BadRequest(new { error = "Payment not successful" });
            }

            var barcodeWriter = new BarcodeWriter<Bitmap>
            {
                Format = BarcodeFormat.CODE_128, // Set barcode format
                Options = new EncodingOptions
                {
                    Width = 300, // Width of the barcode image
                    Height = 150 // Height of the barcode image
                },
                Renderer = new BitmapRenderer()

            };

            // Generate the barcode image
            using var barcodeBitmap = barcodeWriter.Write(request.TicketCode);

            //// Save the barcode image to a MemoryStream
            using var stream = new MemoryStream();
            barcodeBitmap.Save(stream, ImageFormat.Png);
            byte[] barcodeBytes = stream.ToArray();
            Attachment attachment = new Attachment(barcodeBytes, "ticket.png", "image/png");
            // Convert bytes to Base64 string if needed for email attachment or inline image
            var barcodeBase64 = Convert.ToBase64String(barcodeBytes);

            // Prepare email data
            var emailRequest = new EmailRequest
            {
                To = request.UserEmail,
                Subject = "Your Ticket",
                Body = $"<p>Thank you for your purchase! Here is your ticket:</p><img src='data:image/png;base64,{Convert.ToBase64String(barcodeBytes)}' alt='Barcode'/>",
                Attachments = new List<Attachment> { attachment }
            };
            var htmlBody = $@"
            <p>Thank you for your purchase! Here is your ticket:</p>
            <img src='cid:ticketImage' alt='Barcode'/> ";

            // Send the email
            await _emailService.SendEmailAsync(
            request.UserEmail,
            "Your Ticket",
            htmlBody,
            new List<Attachment> { attachment });

            return Ok(new { message = "Payment completed and email sent." });
        }
    }
    }

    public class CreatePaymentIntentRequest
    {
        public decimal Amount { get; set; }
    }

    public class CompletePaymentRequest
    {
        public string PaymentStatus { get; set; }
        public string TicketCode { get; set; }
        public string TicketDetails { get; set; }
        public string UserEmail { get; set; }
    }

    



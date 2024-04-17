using System.Net.Mail;
using System.Net;

namespace AsoApi.Services
{
    public class EmailService
    {
        public void SendEmail(string subject, string body, string sender)
        {
            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("asomamecoo@gmail.com", "jusp nrgz pcgn vwdc"),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress("asomamecoo@gmail.com"),
                    Subject = subject,
                    IsBodyHtml = true,
                };

                mailMessage.Body = body;

                mailMessage.To.Add(sender);

                smtpClient.Send(mailMessage);

                
            }
            catch (SmtpException ex)
            {
               throw new SmtpException($"Error al enviar el correo electrónico: {ex.Message}");
            }
            catch (Exception ex)
            {
               throw new Exception($"Error inesperado: {ex.Message}");
            }
        }
    }
}
